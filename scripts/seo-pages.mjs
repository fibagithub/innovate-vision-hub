// Runs after `vite build` (npm "postbuild").
//
// GitHub Pages only knows about real files, so without this every route except
// "/" is served from 404.html with an HTTP 404 status, which search engines
// don't index. For each public route this writes dist/<route>.html (GitHub
// Pages serves /about from about.html with 200) with that page's title,
// description and canonical baked in, and regenerates dist/sitemap.xml.
//
// Service pages come from the Supabase `services` table so new products are
// picked up automatically; if that fetch fails the build still succeeds with
// the static routes only.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { site, routes } = JSON.parse(readFileSync(join(root, "src/seo/routes.json"), "utf8"));

function loadEnv() {
  const env = { ...process.env };
  const file = join(root, ".env");
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  }
  return env;
}

// Must match the slug logic in src/pages/ServicesPage.tsx.
const slugify = (name) => (name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

async function fetchServiceRoutes() {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return {};
  try {
    const res = await fetch(
      `${url}/rest/v1/services?select=name,name_mn,description,description_mn,is_active&is_active=eq.true&order=display_order`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(10000) },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const out = {};
    for (const s of await res.json()) {
      const slug = slugify(s.name);
      if (!slug) continue;
      out[`/services/${slug}`] = {
        title: { mn: `${s.name_mn || s.name} | Фиба ХХК`, en: `${s.name} | FIBA LLC` },
        description: {
          mn: (s.description_mn || s.description || "").slice(0, 160),
          en: (s.description || s.description_mn || "").slice(0, 160),
        },
        priority: "0.8",
      };
    }
    return out;
  } catch (err) {
    console.warn(`[seo-pages] Could not load services, skipping service pages: ${err.message}`);
    return {};
  }
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, "s");
  // data-rh lets react-helmet-async take over (replace) these tags once the app
  // loads, instead of adding a second copy next to them.
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" data-rh="true" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function render(template, path, meta) {
  const url = `${site}${path === "/" ? "/" : path}`;
  const title = meta.title.mn;
  const desc = meta.description.mn || routes["/"].description.mn;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  // index.html spreads some meta tags over several lines; normalise them first.
  html = html.replace(/<meta\s+([a-z]+)="([^"]+)"\s+content="([^"]*)"\s*\/?>/gs, (_, a, k, v) => `<meta ${a}="${k}" content="${v}" />`);
  html = setMeta(html, "name", "description", desc);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", desc);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", desc);
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
  html = html.replace("</head>", `    <link rel="canonical" href="${url}" data-rh="true" />\n  </head>`);
  return html;
}

const template = readFileSync(join(dist, "index.html"), "utf8");
const all = { ...routes, ...(await fetchServiceRoutes()) };

for (const [path, meta] of Object.entries(all)) {
  const html = render(template, path, meta);
  const files = path === "/" ? [join(dist, "index.html")] : [join(dist, `${path.slice(1)}.html`)];
  // When a route is also a folder (/services and /services/mecore), GitHub Pages
  // may redirect /services to /services/, so give that folder an index.html too.
  if (path !== "/" && Object.keys(all).some((p) => p.startsWith(`${path}/`))) {
    files.push(join(dist, path.slice(1), "index.html"));
  }
  for (const file of files) {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.entries(all)
    .map(([path, m]) => `  <url><loc>${site}${path}</loc><lastmod>${today}</lastmod><priority>${m.priority}</priority></url>`)
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);

console.log(`[seo-pages] Wrote ${Object.keys(all).length} pages and sitemap.xml`);
