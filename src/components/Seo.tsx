import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import seoRoutes from "@/seo/routes.json";

// Shared with scripts/seo-pages.mjs, which bakes the same tags into static HTML
// so crawlers that don't run JavaScript see per-page titles and descriptions.
const BASE = seoRoutes.site;
type Lang = { mn: string; en: string };
const ROUTES = seoRoutes.routes as Record<string, { title: Lang; description: Lang }>;

interface SeoProps {
  title?: Lang | string;
  description?: string;
  noindex?: boolean;
}

export function Seo({ title, description, noindex }: SeoProps) {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const route = ROUTES[pathname] ?? ROUTES["/"];
  const t = typeof title === "string" ? title : (title ?? route.title)[language];
  const desc = description || route.description[language];
  const url = `${BASE}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
  return (
    <Helmet>
      <html lang={language} />
      <title>{t}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
