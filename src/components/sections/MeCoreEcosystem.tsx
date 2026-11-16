import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  CreditCard,
  ShieldCheck,
  BellRing,
  Boxes,
  Building2,
  Cloud,
  Smartphone,
  KeyRound,
  BrainCircuit,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = { mn: string; en: string };
type HubId = "mecore" | "melp" | "meapp";

type System = {
  name: Lang;
  // A system that is itself a hub: clicking it switches the diagram to that hub.
  hub?: HubId;
};

type Group = {
  id: string;
  title: Lang;
  icon: LucideIcon;
  side: "left" | "right";
  systems: System[];
};

type Hub = {
  id: HubId;
  name: string;
  subtitle: Lang;
  groups: Group[];
};

const s = (mn: string, en = mn, hub?: HubId): System => ({ name: { mn, en }, hub });

// Source: integration lists provided by Fiba (MeCore integration codes; Me LP connections).
const HUBS: Hub[] = [
  {
    id: "mecore",
    name: "MeCore",
    subtitle: { mn: "Үндсэн систем", en: "Core system" },
    groups: [
      {
        id: "banks",
        side: "left",
        icon: Landmark,
        title: { mn: "Банк хоорондын холболт", en: "Interbank connections" },
        systems: [
          s("ХХБ", "TDB"),
          s("Хаан банк", "Khan Bank"),
          s("Голомт банк", "Golomt Bank"),
          s("Капитрон банк", "Capitron Bank"),
          s("Хас банк", "XacBank"),
          s("Төрийн банк", "State Bank"),
          s("М банк", "M Bank"),
        ],
      },
      {
        id: "payments",
        side: "left",
        icon: CreditCard,
        title: { mn: "Төлбөр ба карт", en: "Payments & cards" },
        systems: [s("QPay"), s("Negdi — карт, e-commerce", "Negdi — cards, e-commerce"), s("Bonum карт", "Bonum cards")],
      },
      {
        id: "credit",
        side: "right",
        icon: ShieldCheck,
        title: { mn: "Зээлийн мэдээлэл ба татвар", en: "Credit data & tax" },
        systems: [s("ЗМС (зээлийн мэдээллийн сан)", "Credit bureau (ZMS)"), s("SainScore"), s("Бүрэн скор", "BurenScore"), s("E-Barimt")],
      },
      {
        id: "notify",
        side: "right",
        icon: BellRing,
        title: { mn: "Харилцагчийн суваг", en: "Customer channels" },
        systems: [s("Me App", "Me App", "meapp"), s("SMS / CallPro")],
      },
      {
        id: "sub",
        side: "right",
        icon: Boxes,
        title: { mn: "Зээлийн процессийн систем", en: "Loan process system" },
        systems: [s("Me LP", "Me LP", "melp")],
      },
    ],
  },
  {
    id: "melp",
    name: "Me LP",
    subtitle: { mn: "Зээлийн систем (LOS)", en: "Loan origination system" },
    groups: [
      {
        id: "core",
        side: "left",
        icon: Boxes,
        title: { mn: "Үндсэн систем", en: "Core system" },
        systems: [s("MeCore", "MeCore", "mecore")],
      },
      {
        id: "payments",
        side: "left",
        icon: CreditCard,
        title: { mn: "Төлбөр", en: "Payments" },
        systems: [s("QPay"), s("Negdi"), s("Paylink")],
      },
      {
        id: "checks",
        side: "right",
        icon: ShieldCheck,
        title: { mn: "Төрийн мэдээлэл ба шалгалт", en: "Government data & checks" },
        systems: [s("ХУР", "KHUR"), s("Monpep")],
      },
      {
        id: "ai",
        side: "right",
        icon: BrainCircuit,
        title: { mn: "AI ба шийдвэр гаргалт", en: "AI & decisioning" },
        systems: [
          s("AI хуулга цэвэршүүлэлт", "AI statement cleansing"),
          s("LoanPrediction — шийдвэр гаргах систем", "LoanPrediction — decision engine"),
        ],
      },
      {
        id: "enterprise",
        side: "left",
        icon: Building2,
        title: { mn: "Байгууллагын систем", en: "Enterprise systems" },
        systems: [s("ERP"), s("Office 365")],
      },
      {
        id: "cloud",
        side: "right",
        icon: Cloud,
        title: { mn: "Үүлэн дэд бүтэц", en: "Cloud infrastructure" },
        systems: [s("AWS")],
      },
    ],
  },
  {
    id: "meapp",
    name: "Me App",
    subtitle: { mn: "Цахим банкны апп", en: "Mobile banking app" },
    groups: [
      {
        id: "core",
        side: "left",
        icon: Boxes,
        title: { mn: "Үндсэн систем", en: "Core system" },
        systems: [s("MeCore", "MeCore", "mecore")],
      },
      {
        id: "payments",
        side: "left",
        icon: CreditCard,
        title: { mn: "Төлбөр", en: "Payments" },
        systems: [s("QPay")],
      },
      {
        id: "notify",
        side: "right",
        icon: Smartphone,
        title: { mn: "Мэдэгдэл", en: "Notifications" },
        systems: [s("FCM push")],
      },
      {
        id: "auth",
        side: "right",
        icon: KeyRound,
        title: { mn: "Иргэний баталгаажуулалт", en: "Citizen authentication" },
        systems: [s("ДАН", "DAN")],
      },
    ],
  },
];

const CYCLE_MS = 3500;

type Line = { id: string; d: string };

export const MeCoreEcosystem = () => {
  const { language } = useLanguage();
  const t = (l: Lang) => (language === "mn" ? l.mn : l.en);

  const [hubId, setHubId] = useState<HubId>("mecore");
  const hub = HUBS.find((h) => h.id === hubId)!;
  const total = hub.groups.reduce((n, g) => n + g.systems.length, 0);
  const left = hub.groups.filter((g) => g.side === "left");
  const right = hub.groups.filter((g) => g.side === "right");

  const [cycleIdx, setCycleIdx] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const activeGroup = hovered ?? hub.groups[cycleIdx % hub.groups.length].id;

  // Light up one integration group at a time unless the visitor is hovering.
  useEffect(() => {
    if (hovered) return;
    const id = window.setInterval(() => setCycleIdx((i) => i + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [hovered]);

  const switchHub = (id: HubId) => {
    setHubId(id);
    setCycleIdx(0);
    setHovered(null);
  };

  // --- Connection lines measured from real DOM positions (desktop only) ---
  const canvasRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    const hubEl = hubRef.current;
    if (!canvas || !hubEl || canvas.offsetParent === null) return;
    const c = canvas.getBoundingClientRect();
    const h = hubEl.getBoundingClientRect();
    const hubY = h.top + h.height / 2 - c.top;
    const next: Line[] = [];
    for (const g of hub.groups) {
      const el = groupRefs.current[g.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const y = r.top + r.height / 2 - c.top;
      const hy = hubY + (y - hubY) * 0.35;
      if (g.side === "left") {
        const x1 = r.right - c.left;
        const x2 = h.left - c.left;
        const mx = (x1 + x2) / 2;
        next.push({ id: g.id, d: `M ${x1} ${y} C ${mx} ${y}, ${mx} ${hy}, ${x2} ${hy}` });
      } else {
        const x1 = h.right - c.left;
        const x2 = r.left - c.left;
        const mx = (x1 + x2) / 2;
        next.push({ id: g.id, d: `M ${x1} ${hy} C ${mx} ${hy}, ${mx} ${y}, ${x2} ${y}` });
      }
    }
    setSize({ w: c.width, h: c.height });
    setLines(next);
  }, [hub]);

  useLayoutEffect(() => {
    measure();
    // Re-measure whenever the canvas, hub or any group card changes size
    // (fonts loading, hub switch, language switch).
    const ro = new ResizeObserver(measure);
    if (canvasRef.current) ro.observe(canvasRef.current);
    if (hubRef.current) ro.observe(hubRef.current);
    for (const g of hub.groups) {
      const el = groupRefs.current[g.id];
      if (el) ro.observe(el);
    }
    // Catch late layout shifts (enter animations, web fonts) that don't resize anything.
    const timers = [150, 500].map((ms) => window.setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", measure);
    };
  }, [measure, language, hub]);

  const systemChip = (sys: System, lit: boolean) =>
    sys.hub ? (
      <button
        key={sys.name.en}
        type="button"
        onClick={() => switchHub(sys.hub!)}
        className="flex items-center gap-1.5 rounded-md border border-cyan-300/50 bg-cyan-400/15 px-2 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
      >
        {t(sys.name)}
        <span className="text-cyan-300/80">→</span>
      </button>
    ) : (
      <span
        key={sys.name.en}
        className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors duration-500 ${
          lit ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-50" : "border-white/[0.08] bg-white/[0.03] text-slate-300"
        }`}
      >
        {t(sys.name)}
      </span>
    );

  // `track` registers the card as a line endpoint; only the desktop copy may do
  // this, otherwise the hidden mobile copy overwrites the ref with a 0×0 box.
  const groupCard = (g: Group, align: "left" | "right", track = true) => {
    const Icon = g.icon;
    const lit = activeGroup === g.id;
    return (
      <div
        key={g.id}
        ref={track ? (el) => (groupRefs.current[g.id] = el) : undefined}
        onMouseEnter={() => setHovered(g.id)}
        onMouseLeave={() => setHovered(null)}
        className={`rounded-2xl border p-4 backdrop-blur-md transition-all duration-500 ${
          lit
            ? "border-cyan-300/50 bg-cyan-400/[0.07] shadow-[0_0_30px_rgba(56,189,248,0.25)]"
            : "border-white/[0.07] bg-slate-900/50"
        }`}
      >
        <div className={`mb-3 flex items-center gap-2.5 ${align === "right" ? "flex-row-reverse" : ""}`}>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-500 ${
              lit ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-200" : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <Icon className="h-4 w-4" />
          </span>
          <span className={`text-sm font-semibold ${lit ? "text-white" : "text-slate-200"}`}>{t(g.title)}</span>
          <span className={`text-xs text-slate-500 ${align === "right" ? "mr-auto" : "ml-auto"}`}>{g.systems.length}</span>
        </div>
        <div className={`flex flex-wrap gap-1.5 ${align === "right" ? "justify-end" : ""}`}>
          {g.systems.map((sys) => systemChip(sys, lit))}
        </div>
      </div>
    );
  };

  const hubTabs = (
    <div className="mx-auto mb-12 flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
      {HUBS.map((h) => (
        <button
          key={h.id}
          type="button"
          onClick={() => switchHub(h.id)}
          className={`relative rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
            hubId === h.id ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {hubId === h.id && (
            <motion.span
              layoutId="mecore-hub-tab"
              className="absolute inset-0 rounded-full border border-cyan-300/40 bg-cyan-400/15"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{h.name}</span>
        </button>
      ))}
    </div>
  );

  // Only the desktop copy is a line endpoint (see groupCard).
  const hubCore = (track: boolean) => (
    <div className="flex flex-col items-center">
      <div ref={track ? hubRef : undefined} className="relative flex h-28 w-28 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-cyan-400/40"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
          />
        ))}
        <AnimatePresence mode="wait">
          <motion.div
            key={hub.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#60a5fa,#1e3a8a_55%,#020617_100%)] shadow-[0_0_60px_15px_rgba(59,130,246,0.45)]"
          >
            <span className="font-display text-xl font-bold text-white">{hub.name}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/80">{t(hub.subtitle)}</div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-bold text-white">{total}</span>
        <span className="text-xs text-slate-400">{t({ mn: "системтэй холбогдсон", en: "connected systems" })}</span>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#040814] py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.16),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t({ mn: "Санхүүгийн нэгдсэн экосистем", en: "Financial Core Ecosystem" })}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-5 bg-gradient-to-b from-white via-white to-cyan-200/70 bg-clip-text pb-2 text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl"
          >
            {t({ mn: "Нэг платформ — санхүүгийн бүх үйлчилгээ", en: "One platform for every financial service" })}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300/80 sm:text-lg"
          >
            {t({
              mn: "MeCore нь банк, төлбөр тооцоо, ERP, зээлийн систем, AI анализ болон олон төрлийн санхүүгийн үйлчилгээг нэгтгэсэн дараагийн үеийн суурь платформ.",
              en: "MeCore unifies banking, payments, ERP, lending, AI analytics and dozens of financial services into one next-generation platform.",
            })}
          </motion.p>
        </div>

        {hubTabs}

        {/* ---------- Desktop: groups | hub | groups ---------- */}
        <div
          ref={canvasRef}
          className="relative mx-auto hidden min-h-[440px] max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)] items-center gap-x-24 lg:grid"
        >
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            aria-hidden
          >
            <defs>
              <linearGradient id="mecore-line-lit" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(103,232,249,0.9)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.9)" />
              </linearGradient>
            </defs>
            {lines.map((l) => {
              const lit = activeGroup === l.id;
              const pathId = `mecore-path-${hub.id}-${l.id}`;
              return (
                <g key={pathId}>
                  <path id={pathId} d={l.d} fill="none" stroke="rgba(148,163,184,0.24)" strokeWidth={1} />
                  {/* Every connection carries a slow, faint packet; the active one is bright. */}
                  <circle r={2} fill="rgba(186,230,253,0.5)">
                    <animateMotion dur="3.2s" repeatCount="indefinite">
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                  {lit && (
                    <>
                      <path
                        d={l.d}
                        fill="none"
                        stroke="url(#mecore-line-lit)"
                        strokeWidth={1.75}
                        strokeDasharray="6 8"
                        className="mecore-dash"
                        style={{ filter: "drop-shadow(0 0 4px rgba(56,189,248,0.8))" }}
                      />
                      {[0, 1].map((k) => (
                        <circle key={k} r={3.5} fill="#e0f2fe" style={{ filter: "drop-shadow(0 0 6px #38bdf8)" }}>
                          <animateMotion dur="1.6s" begin={`${k * 0.8}s`} repeatCount="indefinite">
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>
                      ))}
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={`l-${hub.id}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              onAnimationComplete={measure}
              className="relative space-y-3"
            >
              {left.map((g) => groupCard(g, "left"))}
            </motion.div>
          </AnimatePresence>

          <div className="relative py-6">{hubCore(true)}</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`r-${hub.id}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              onAnimationComplete={measure}
              className="relative space-y-3"
            >
              {right.map((g) => groupCard(g, "right"))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- Mobile / tablet: hub then groups ---------- */}
        <div className="mx-auto max-w-md lg:hidden">
          {hubCore(false)}
          <div className="relative mx-auto my-4 h-10 w-px overflow-hidden bg-cyan-400/15">
            <motion.span
              className="absolute left-0 h-3 w-px bg-cyan-200 shadow-[0_0_6px_#38bdf8]"
              animate={{ top: ["-20%", "110%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="space-y-3">{hub.groups.map((g) => groupCard(g, "left", false))}</div>
        </div>
      </div>

      <style>{`
        .mecore-dash { animation: mecore-dash 1.2s linear infinite; }
        @keyframes mecore-dash { to { stroke-dashoffset: -28; } }
        @media (prefers-reduced-motion: reduce) { .mecore-dash { animation: none; } }
      `}</style>
    </section>
  );
};

export default MeCoreEcosystem;
