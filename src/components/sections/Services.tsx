import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  FileText,
  Smartphone,
  CreditCard,
  BarChart3,
  Users,
  Zap,
  Shield,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const allProducts = [
  {
    id: "mecore",
    icon: Database,
    title: "MeCore",
    subtitle: "Core Banking System",
    description:
      "БАНК, ББСБ, Лизинг болон ХЗХ зэрэг санхүүгийн үйлчилгээг үзүүлдэг байгууллагуудад зориулагдсан өдөр тутмын үйл ажиллагаа.",
    features: [
      "Санхүүгийн үндсэн бүртгэл",
      "Өдөр тутмын үйл ажиллагаа",
      "Олон улсын стандарт",
      "Гүйлгээ боловсруулалт",
      "Тайлан",
    ],
    gradient: "from-primary to-[#2563eb]",
    bgGradient: "from-primary/5 via-card to-card",
    accentColor: "primary",
    stats: "50+ байгууллага",
    logo: "/logos/mecore-logo.svg",
    size: "featured",
  },
  {
    id: "melp",
    icon: FileText,
    title: "MeLP",
    subtitle: "Loan Processing System",
    description: "Зээл олгох үйл явцыг автоматжуулах, хянах, удирдах зориулалттай систем.",
    features: ["Зээлийн хүсэлт", "Скоринг", "Зээлийн автоматжуулалт", "Процесс удирдлага", "Интеграц / холболт"],
    gradient: "from-[#7c3aed] to-[#a855f7]",
    bgGradient: "from-[#7c3aed]/5 via-card to-card",
    accentColor: "[#7c3aed]",
    stats: "100K+ зээл",
    logo: "/logos/melp-logo.svg",
    size: "large",
  },
  {
    id: "meapp",
    icon: Smartphone,
    title: "MeAPP",
    subtitle: "Mobile Banking App",
    description: "ХЗХ болон ББСБ-н гишүүд харилцагч нарыг онлайнаар үйлчилгээ авах боломжийг олгох.",
    features: ["Шилжүүлэг", "Зээлийн хүсэлт", "Мэдэгдэл", "Онлайн үйлчилгээ"],
    gradient: "from-[#059669] to-[#34d399]",
    bgGradient: "from-[#059669]/5 via-card to-card",
    accentColor: "[#059669]",
    stats: "10K+ хэрэглэгч",
    externalLink: "https://me.fiba.mn/",
    logo: "/logos/meapp-logo.svg",
    size: "medium",
  },
  {
    id: "smartware",
    icon: CreditCard,
    title: "SmartWare",
    subtitle: "Card Terminal Solution",
    description: "EMV стандарт бүхий VISA, MASTER CARD, UnionPay терминал. POS терминалын цогц шийдэл.",
    features: ["Картын төлбөр", "EMV чип", "Contactless", "QR төлбөр"],
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    bgGradient: "from-[#f59e0b]/5 via-card to-card",
    accentColor: "[#f59e0b]",
    stats: "1000+ терминал",
    logo: "/logos/smartware-logo.svg",
    size: "medium",
  },
  {
    id: "sainscore",
    icon: BarChart3,
    title: "SainScore",
    subtitle: "Credit Information System",
    description: "ТИТАН Си Ар Эй Зээлийн мэдээллийн систем. Иргэн, байгууллагын зээлийн түүх.",
    features: ["Зээлийн түүх", "Скоринг", "Риск үнэлгээ"],
    gradient: "from-[#ec4899] to-[#f472b6]",
    bgGradient: "from-[#ec4899]/5 via-card to-card",
    accentColor: "[#ec4899]",
    stats: "500K+ хэрэглэгч",
    externalLink: "https://sainscore.mn/",
    logo: "/logos/sainscore-logo.svg",
    size: "medium",
  },
];

const consultingServices = [
  { title: "Картын систем", icon: CreditCard },
  { title: "Wallet үйлчилгээ", icon: Globe },
  { title: "Системийн интеграци", icon: Zap },
  { title: "AI Credit Scoring", icon: Shield },
];

// Product Logo Component
const ProductLogo = ({ product, className = "" }: { product: (typeof allProducts)[0]; className?: string }) => (
  <div
    className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${product.gradient} shadow-lg ${className}`}
  >
    <product.icon className="w-1/2 h-1/2 text-white" />
  </div>
);

// Product Card Component
const ProductCard = ({ product, index }: { product: (typeof allProducts)[0]; index: number }) => {
  const isFeatured = product.size === "featured";
  const isLarge = product.size === "large";

  const CardWrapper = product.externalLink ? "a" : Link;
  const linkProps = product.externalLink
    ? { href: product.externalLink, target: "_blank", rel: "noopener noreferrer" }
    : { to: `/services/${product.id}` };

  if (isFeatured) {
    return (
      <div className="col-span-12 lg:col-span-7">
        <CardWrapper {...(linkProps as any)} className="block h-full">
          <div
            className={`group relative h-full min-h-[480px] p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br ${product.bgGradient} border border-border/50 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20`}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-primary/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-primary/5 rounded-full group-hover:scale-110 transition-transform duration-1000" />

            <div className="relative h-full flex flex-col">
              {/* Logo & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <ProductLogo
                    product={product}
                    className="w-16 h-16 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                  />
                  <div>
                    <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">
                      {product.subtitle}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-primary">{product.stats}</span>
                    </div>
                  </div>
                </div>
                <span className="text-5xl font-black text-primary/10">01</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">{product.description}</p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-foreground/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 text-primary font-semibold mt-8">
                <span>Дэлгэрэнгүй үзэх</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    );
  }

  if (isLarge) {
    return (
      <div className="col-span-12 lg:col-span-5">
        <CardWrapper {...(linkProps as any)} className="block h-full">
          <div
            className={`group relative h-full min-h-[480px] p-8 rounded-[2rem] bg-gradient-to-br ${product.bgGradient} border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-${product.accentColor}/30`}
          >
            {/* Gradient Accent */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient}`} />

            {/* Decorative */}
            <div
              className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${product.gradient} opacity-10 rounded-full blur-3xl`}
            />

            <div className="relative h-full flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <ProductLogo
                  product={product}
                  className="w-14 h-14 group-hover:scale-110 transition-transform duration-500"
                />
                <span className="text-5xl font-black text-${product.accentColor}/10">0{index + 1}</span>
              </div>

              <span className={`text-xs font-bold tracking-widest text-${product.accentColor}/70 uppercase mb-2`}>
                {product.subtitle}
              </span>
              <h3
                className={`font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-${product.accentColor} transition-colors`}
              >
                {product.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 rounded-full bg-${product.accentColor}/5 border border-${product.accentColor}/10 text-xs font-medium text-foreground/80`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className={`flex items-center gap-2 pt-6 border-t border-border/50`}>
                <Sparkles className={`w-4 h-4 text-${product.accentColor}`} />
                <span className={`text-sm font-semibold text-${product.accentColor}`}>{product.stats}</span>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    );
  }

  // Medium cards (MeAPP, SmartWare, SainScore)
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <CardWrapper {...(linkProps as any)} className="block h-full">
        <div
          className={`group relative h-full min-h-[380px] p-8 rounded-[2rem] bg-gradient-to-br ${product.bgGradient} border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-${product.accentColor}/30`}
        >
          {/* Gradient Accent Line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient}`} />

          {/* Decorative Glow */}
          <div
            className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-br ${product.gradient} opacity-15 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`}
          />

          <div className="relative h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <ProductLogo
                product={product}
                className="w-14 h-14 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
              />
              {product.externalLink && (
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>

            <span
              className={`text-xs font-bold tracking-widest uppercase mb-2`}
              style={{
                color: `var(--${product.accentColor === "primary" ? "primary" : product.accentColor.replace("[", "").replace("]", "")})`,
              }}
            >
              {product.subtitle}
            </span>
            <h3
              className={`font-display text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-${product.accentColor} transition-colors`}
            >
              {product.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{product.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-medium text-foreground/70"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Sparkles
                  className="w-4 h-4"
                  style={{
                    color: `var(--${product.accentColor === "primary" ? "primary" : product.accentColor.replace("[", "").replace("]", "")})`,
                  }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: `var(--${product.accentColor === "primary" ? "primary" : product.accentColor.replace("[", "").replace("]", "")})`,
                  }}
                >
                  {product.stats}
                </span>
              </div>
              <ArrowRight
                className={`w-5 h-5 text-muted-foreground group-hover:text-${product.accentColor} group-hover:translate-x-1 transition-all`}
              />
            </div>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
};

export function Services() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="products">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Orbs */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-gradient-radial from-accent/8 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium text-sm tracking-wide">Technology Solutions</span>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
            Дараа үеийн
            <span className="block mt-2 bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              Санхүүгийн Технологи
            </span>
          </h2>

          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн шийдлүүд
          </p>
        </div>

        {/* Bento Grid - All Products */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 mb-8">
          {/* Featured: MeCore */}
          <ProductCard product={allProducts[0]} index={0} />

          {/* Large: MeLP */}
          <ProductCard product={allProducts[1]} index={1} />

          {/* Medium cards: MeAPP, SmartWare, SainScore */}
          <ProductCard product={allProducts[2]} index={2} />
          <ProductCard product={allProducts[3]} index={3} />
          <ProductCard product={allProducts[4]} index={4} />
        </div>

        {/* Consulting Services - Innovative Layout */}
        <div className="relative mt-16 rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

          <div className="relative p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-white/90 font-medium text-sm">Consulting Services</span>
                </div>

                <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Зөвлөх
                  <br />
                  үйлчилгээ
                </h3>

                <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
                  Банкны суурь систем, төлбөрийн картын систем, интеграцитай холбоотой мэргэжлийн зөвлөгөө үйлчилгээ.
                </p>

                <Link to="/services">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    Бүх үйлчилгээ үзэх
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {consultingServices.map((service, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-semibold">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
