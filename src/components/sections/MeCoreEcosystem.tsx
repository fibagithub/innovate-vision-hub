import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  CreditCard,
  Wallet,
  Building2,
  ShoppingCart,
  Gauge,
  Network,
  Receipt,
  Shield,
  Plug,
  Brain,
  BarChart3,
  Banknote,
  Play,
  ArrowRight,
  Sparkles,
  X,
  Landmark,
  ScanLine,
  Users,
  Wallet2,
  Calculator,
  PieChart,
  Database,
  Globe2,
  Store,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type Node = {
  id: string;
  name: { mn: string; en: string };
  desc: { mn: string; en: string };
  icon: any;
  ring: 0 | 1 | 2;
  angle: number; // degrees (initial position)
  side: "left" | "right";
};

// Left-heavy (banking, payments, ERP) / Right-side (gov + scoring + gateway)
// Angles measured clockwise from 3 o'clock. Left side ~ 90°..270°, Right ~ -90°..90°.
const NODES: Node[] = [
  // LEFT — inner ring
  { id: "meapp-bank", name: { mn: "Me App цахим банк", en: "Me App Digital Bank" }, desc: { mn: "Хувийн санхүүгийн цахим банкны апп.", en: "Personal digital banking app." }, icon: Smartphone, ring: 0, angle: 150, side: "left" },
  { id: "negdi", name: { mn: "NEGDi картын систем", en: "NEGDi Card System" }, desc: { mn: "Картын процессинг ба удирдлагын систем.", en: "Card processing & management." }, icon: CreditCard, ring: 0, angle: 180, side: "left" },
  { id: "qpay", name: { mn: "QPay", en: "QPay" }, desc: { mn: "QR төлбөрийн нэгдсэн интеграц.", en: "Unified QR payment integration." }, icon: Banknote, ring: 0, angle: 210, side: "left" },

  // LEFT — middle ring
  { id: "ecom", name: { mn: "E-commerce", en: "E-commerce" }, desc: { mn: "Цахим худалдааны төлбөрийн шийдэл.", en: "E-commerce payment solutions." }, icon: ShoppingCart, ring: 1, angle: 120, side: "left" },
  { id: "melp", name: { mn: "Me LP — LOS систем", en: "Me LP — LOS System" }, desc: { mn: "Зээлийн үйл ажиллагааны цогц шийдэл.", en: "End-to-end loan origination." }, icon: Wallet, ring: 1, angle: 150, side: "left" },
  { id: "pos", name: { mn: "POS төхөөрөмж", en: "POS Terminal" }, desc: { mn: "Худалдааны цэгийн төлбөрийн шийдэл.", en: "Point-of-sale payment solution." }, icon: Store, ring: 1, angle: 180, side: "left" },
  { id: "meapp-mn", name: { mn: "Me App Mongolia", en: "Me App Mongolia" }, desc: { mn: "Хэрэглэгчдэд зориулсан супер апп.", en: "Consumer super-app." }, icon: Globe2, ring: 1, angle: 210, side: "left" },
  { id: "syncerp-app", name: { mn: "SYNC ERP App", en: "SYNC ERP App" }, desc: { mn: "ERP-ийн мобайл апп.", en: "ERP mobile companion app." }, icon: Smartphone, ring: 1, angle: 240, side: "left" },

  // LEFT — outer ring (ERP cluster)
  { id: "syncerp", name: { mn: "Sync ERP систем", en: "Sync ERP System" }, desc: { mn: "Дотоод үйл ажиллагааны цогц ERP.", en: "Internal operations ERP suite." }, icon: Building2, ring: 2, angle: 110, side: "left" },
  { id: "kpi", name: { mn: "KPI", en: "KPI" }, desc: { mn: "Гүйцэтгэлийн үзүүлэлтийн удирдлага.", en: "Performance KPI management." }, icon: BarChart3, ring: 2, angle: 135, side: "left" },
  { id: "hr", name: { mn: "Хүний нөөц", en: "Human Resource" }, desc: { mn: "Хүний нөөцийн удирдлага.", en: "HR management." }, icon: Users, ring: 2, angle: 160, side: "left" },
  { id: "payroll", name: { mn: "Цалин", en: "Payroll" }, desc: { mn: "Цалингийн системийн модуль.", en: "Payroll module." }, icon: Wallet2, ring: 2, angle: 185, side: "left" },
  { id: "budget", name: { mn: "Төсөв", en: "Budget" }, desc: { mn: "Төсөв төлөвлөлт, хяналт.", en: "Budgeting & planning." }, icon: PieChart, ring: 2, angle: 210, side: "left" },
  { id: "acc", name: { mn: "Нягтлан бодох", en: "Accounting" }, desc: { mn: "Нягтлан бодох бүртгэлийн модуль.", en: "Accounting module." }, icon: Calculator, ring: 2, angle: 235, side: "left" },

  // RIGHT
  { id: "score", name: { mn: "SainScore", en: "Sain Score" }, desc: { mn: "AI суурьт зээлийн оноо.", en: "AI-powered credit scoring." }, icon: Gauge, ring: 0, angle: 330, side: "right" },
  { id: "gateway", name: { mn: "Banking Gateway", en: "Banking Gateway" }, desc: { mn: "Олон банкны нэгдсэн гарц.", en: "Multi-bank payment gateway." }, icon: Network, ring: 0, angle: 0, side: "right" },
  { id: "mongolbank", name: { mn: "Монголбанк / EMD", en: "Mongol Bank / EMD" }, desc: { mn: "Төв банк, EMD-тэй холболт.", en: "Central bank & EMD integration." }, icon: Landmark, ring: 1, angle: 340, side: "right" },
  { id: "emongolia", name: { mn: "E-Mongolia", en: "E-Mongolia" }, desc: { mn: "Төрийн үйлчилгээний интеграц.", en: "Government services integration." }, icon: Database, ring: 1, angle: 10, side: "right" },
  { id: "ebarimt", name: { mn: "E-Barimt", en: "E-Barimt" }, desc: { mn: "Татварын цахим баримт.", en: "Electronic tax receipt." }, icon: FileText, ring: 1, angle: 30, side: "right" },
];

const RING_RADII = [24, 36, 46]; // percentage of container
const RING_DURATIONS = [80, 110, 140]; // seconds per rotation (slow, cinematic)
const RING_OSCILLATION = 6; // degrees of gentle sway instead of full rotation

export const MeCoreEcosystem = () => {
  const { language } = useLanguage();
  const [active, setActive] = useState<Node | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setParallax({ x, y });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const t = (mn: string, en: string) => (language === "mn" ? mn : en);

  return (
    <section className="relative overflow-hidden bg-[#040814] py-24 sm:py-32">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#020512_0%,#040a1c_50%,#020512_100%)] opacity-90" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-300/60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("Financial Core Ecosystem", "Financial Core Ecosystem")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-5 bg-gradient-to-b from-white via-white to-cyan-200/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
          >
            {t("Санхүүгийн цогц шийдлийн төв цөм", "The intelligent core of finance")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300/80 sm:text-lg"
          >
            {t(
              "MeCore нь банк, төлбөр тооцоо, ERP, зээлийн систем, AI анализ болон олон төрлийн санхүүгийн үйлчилгээг нэгтгэсэн дараагийн үеийн суурь платформ.",
              "MeCore unifies banking, payments, ERP, lending, AI analytics and dozens of financial services into one next-generation platform."
            )}
          </motion.p>
        </div>

        {/* Ecosystem canvas */}
        <div
          ref={containerRef}
          className="relative mx-auto aspect-square w-full max-w-[820px]"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Decorative rotating rings */}
          {RING_RADII.map((r, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0 rounded-full border border-cyan-400/10"
              style={{
                top: `${50 - r}%`,
                left: `${50 - r}%`,
                width: `${r * 2}%`,
                height: `${r * 2}%`,
              }}
              animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
              transition={{ duration: RING_DURATIONS[idx], repeat: Infinity, ease: "linear" }}
            />
          ))}

          {/* Radar pulse */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40"
              animate={{ scale: [1, 4], opacity: [0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeOut" }}
            />
          ))}

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-40 w-40 items-center justify-center rounded-full sm:h-48 sm:w-48"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#60a5fa,#1e3a8a_55%,#020617_100%)] shadow-[0_0_80px_20px_rgba(59,130,246,0.45)]" />
              <div className="absolute inset-2 rounded-full border border-cyan-300/30 backdrop-blur-sm" />
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                style={{ borderTopColor: "rgba(125,211,252,0.9)", borderRightColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
              />
              <div className="relative z-10 px-4 text-center">
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">MeCore</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
                  {t("Суурь систем", "Core System")}
                </div>
                <div className="mt-2 text-[9px] text-cyan-100/60">Financial Core Ecosystem</div>
              </div>
            </motion.div>
          </div>

          {/* Orbit groups — each node is wrapped in a rotating group so its connection
             line and node move together. Nodes oscillate gently around their base
             angle so the left/right structure of the ecosystem is preserved. */}
          {NODES.map((n, i) => {
            const r = RING_RADII[n.ring];
            const duration = 8 + (n.ring * 3) + (i % 4); // each node sways at its own pace
            const Icon = n.icon;
            const isActive = hovered === n.id || active?.id === n.id;
            const delay = (i % 7) * 0.4;
            // Endpoint in 100x100 viewBox space (within the wrapper's own un-rotated frame)
            const rad = (n.angle * Math.PI) / 180;
            const x2 = 50 + r * Math.cos(rad);
            const y2 = 50 + r * Math.sin(rad);
            return (
              <motion.div
                key={n.id}
                className="absolute inset-0"
                animate={{ rotate: [-RING_OSCILLATION, RING_OSCILLATION, -RING_OSCILLATION] }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
                style={{ transformOrigin: "50% 50%" }}
              >
                {/* Animated connection line for this node */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`grad-${n.id}`} x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`} gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(125,211,252,0.85)" />
                      <stop offset="100%" stopColor="rgba(56,189,248,0)" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="50"
                    y1="50"
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? "rgba(125,211,252,0.95)" : `url(#grad-${n.id})`}
                    strokeWidth={isActive ? 0.35 : 0.18}
                    strokeDasharray={isActive ? "0" : "0.7 0.7"}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Travelling light particle along the line */}
                  <circle r={isActive ? 0.7 : 0.5} fill="rgba(186,230,253,0.95)">
                    <animate
                      attributeName="cx"
                      from="50"
                      to={x2}
                      dur={`${3 + (i % 3)}s`}
                      begin={`${(i * 0.3) % 3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from="50"
                      to={y2}
                      dur={`${3 + (i % 3)}s`}
                      begin={`${(i * 0.3) % 3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;0"
                      dur={`${3 + (i % 3)}s`}
                      begin={`${(i * 0.3) % 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>

                {/* The node itself, positioned at the line endpoint */}
                <div
                  className="absolute"
                  style={{
                    left: `${x2}%`,
                    top: `${y2}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* Counter-rotate so labels stay upright while group sways */}
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHovered(n.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(n)}
                    animate={{ rotate: [RING_OSCILLATION, -RING_OSCILLATION, RING_OSCILLATION] }}
                    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
                    className="group relative flex flex-col items-center"
                  >
                    <div
                      className={`relative flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                        n.ring === 0 ? "h-16 w-16 sm:h-20 sm:w-20" : n.ring === 1 ? "h-14 w-14 sm:h-16 sm:w-16" : "h-12 w-12 sm:h-14 sm:w-14"
                      } ${
                        isActive
                          ? "border-cyan-300/80 bg-cyan-400/20 shadow-[0_0_30px_rgba(56,189,248,0.7)] scale-110"
                          : "border-cyan-300/20 bg-slate-900/60 hover:border-cyan-300/60 hover:bg-cyan-400/10"
                      }`}
                    >
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
                      <Icon
                        className={`relative ${n.ring === 0 ? "h-7 w-7" : n.ring === 1 ? "h-6 w-6" : "h-5 w-5"} transition-colors ${
                          isActive ? "text-cyan-200" : "text-slate-100"
                        }`}
                      />
                      {isActive && (
                        <span className="pointer-events-none absolute -inset-1 rounded-full border border-cyan-300/40" />
                      )}
                    </div>
                    <div
                      className={`pointer-events-none mt-2 max-w-[110px] whitespace-normal text-center text-[10px] font-medium leading-tight text-slate-200/90 transition-all sm:text-[11px] ${
                        isActive ? "text-cyan-200" : ""
                      }`}
                    >
                      {t(n.name.mn, n.name.en)}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400"
          >
            <Play className="mr-2 h-4 w-4" />
            {t("Демо үзэх", "Watch demo")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
          >
            {t("Системийн боломжууд", "Explore capabilities")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-[0_0_60px_rgba(56,189,248,0.25)]"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                <active.icon className="h-6 w-6 text-cyan-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {t(active.name.mn, active.name.en)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {t(active.desc.mn, active.desc.en)}
              </p>
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 p-3 text-xs text-slate-400">
                <Network className="h-3.5 w-3.5 text-cyan-300" />
                {t("MeCore-той шууд холбогдсон", "Directly connected to MeCore")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MeCoreEcosystem;