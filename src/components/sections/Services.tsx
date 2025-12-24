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
  Package,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices, Service } from "@/hooks/useContentData";

// Icon mapping for dynamic icons
const iconMap: Record<string, LucideIcon> = {
  Database,
  FileText,
  Smartphone,
  CreditCard,
  BarChart3,
  Users,
  Zap,
  Shield,
  Globe,
  Package,
};

// Gradient presets based on index
const gradientPresets = [
  { gradient: "from-primary to-[#2563eb]", bgGradient: "from-primary/5 via-card to-card", accentColor: "primary" },
  { gradient: "from-[#7c3aed] to-[#a855f7]", bgGradient: "from-[#7c3aed]/5 via-card to-card", accentColor: "[#7c3aed]" },
  { gradient: "from-[#059669] to-[#34d399]", bgGradient: "from-[#059669]/5 via-card to-card", accentColor: "[#059669]" },
  { gradient: "from-[#f59e0b] to-[#fbbf24]", bgGradient: "from-[#f59e0b]/5 via-card to-card", accentColor: "[#f59e0b]" },
  { gradient: "from-[#ec4899] to-[#f472b6]", bgGradient: "from-[#ec4899]/5 via-card to-card", accentColor: "[#ec4899]" },
];

// Size mapping based on index
const getSizeByIndex = (index: number, total: number) => {
  if (total <= 2) return index === 0 ? "featured" : "large";
  if (index === 0) return "featured";
  if (index === 1) return "large";
  return "medium";
};

const consultingServices = [
  { title: "Картын систем", icon: CreditCard },
  { title: "Wallet үйлчилгээ", icon: Globe },
  { title: "Системийн интеграци", icon: Zap },
  { title: "AI Credit Scoring", icon: Shield },
];

// Product Logo Component
const ProductLogo = ({ service, gradient, className = "" }: { service: Service; gradient: string; className?: string }) => {
  const IconComponent = iconMap[service.icon || "Package"] || Package;
  
  return (
    <div className={`flex items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${className}`}>
      {service.icon_url ? (
        <img src={service.icon_url} alt={service.name} className="w-1/2 h-1/2 object-contain" />
      ) : (
        <IconComponent className="w-1/2 h-1/2 text-white" />
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ service, index, total }: { service: Service; index: number; total: number }) => {
  const size = getSizeByIndex(index, total);
  const preset = gradientPresets[index % gradientPresets.length];
  const isFeatured = size === "featured";
  const isLarge = size === "large";

  const cardContent = (
    <>
      {isFeatured && (
        <div className="col-span-12 lg:col-span-7">
          <Link to={`/services/${service.id}`} className="block h-full">
            <div
              className={`group relative h-full min-h-[480px] p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br ${preset.bgGradient} border border-border/50 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20`}
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
                      service={service}
                      gradient={preset.gradient}
                      className="w-16 h-16 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    />
                    <div>
                      <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">
                        {service.category || service.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-primary">{service.usage_metric || ""}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-5xl font-black text-primary/10">0{index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">{service.description}</p>

                  {/* Features Pills */}
                  <div className="flex flex-wrap gap-2">
                    {service.features?.map((feature, i) => (
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
          </Link>
        </div>
      )}

      {isLarge && (
        <div className="col-span-12 lg:col-span-5">
          <Link to={`/services/${service.id}`} className="block h-full">
            <div
              className={`group relative h-full min-h-[480px] p-8 rounded-[2rem] bg-gradient-to-br ${preset.bgGradient} border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-${preset.accentColor}/30`}
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${preset.gradient}`} />

              {/* Decorative */}
              <div
                className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${preset.gradient} opacity-10 rounded-full blur-3xl`}
              />

              <div className="relative h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <ProductLogo
                    service={service}
                    gradient={preset.gradient}
                    className="w-14 h-14 group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`text-5xl font-black text-${preset.accentColor}/10`}>0{index + 1}</span>
                </div>

                <span className={`text-xs font-bold tracking-widest text-${preset.accentColor}/70 uppercase mb-2`}>
                  {service.category || service.name}
                </span>
                <h3
                  className={`font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-${preset.accentColor} transition-colors`}
                >
                  {service.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features?.map((feature, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full bg-${preset.accentColor}/5 border border-${preset.accentColor}/10 text-xs font-medium text-foreground/80`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-2 pt-6 border-t border-border/50`}>
                  <Sparkles className={`w-4 h-4 text-${preset.accentColor}`} />
                  <span className={`text-sm font-semibold text-${preset.accentColor}`}>{service.usage_metric || ""}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {!isFeatured && !isLarge && (
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <Link to={`/services/${service.id}`} className="block h-full">
            <div
              className={`group relative h-full min-h-[380px] p-8 rounded-[2rem] bg-gradient-to-br ${preset.bgGradient} border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-${preset.accentColor}/30`}
            >
              {/* Gradient Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${preset.gradient}`} />

              {/* Decorative Glow */}
              <div
                className={`absolute top-6 right-6 w-24 h-24 bg-gradient-to-br ${preset.gradient} opacity-15 rounded-full blur-2xl group-hover:opacity-25 transition-opacity`}
              />

              <div className="relative h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <ProductLogo
                    service={service}
                    gradient={preset.gradient}
                    className="w-14 h-14 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                  />
                </div>

                <span className="text-xs font-bold tracking-widest uppercase mb-2 text-primary/70">
                  {service.category || service.name}
                </span>
                <h3
                  className={`font-display text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-${preset.accentColor} transition-colors`}
                >
                  {service.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features?.slice(0, 4).map((feature, i) => (
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
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{service.usage_metric || ""}</span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 text-muted-foreground group-hover:text-${preset.accentColor} group-hover:translate-x-1 transition-all`}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );

  return cardContent;
};

export function Services() {
  const { data: services, isLoading } = useServices();

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {/* Bento Grid - All Products */}
        {!isLoading && services && services.length > 0 && (
          <div className="grid grid-cols-12 gap-4 lg:gap-6 mb-8">
            {services.map((service, index) => (
              <ProductCard key={service.id} service={service} index={index} total={services.length} />
            ))}
          </div>
        )}

        {/* Consulting Services - Innovative Layout */}
        <div className="relative mt-16 rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          <div className="relative p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-white/90 font-medium text-sm">Зөвлөх үйлчилгээ</span>
                </div>
                <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                  Захиалгат шийдэл хэрэгтэй юу?
                </h3>
                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                  Манай мэргэжилтнүүд таны бизнесийн онцлогт тохирсон систем боловсруулж өгнө
                </p>
                <Link to="/contact">
                  <Button size="xl" className="bg-white text-primary hover:bg-white/90 font-semibold">
                    Холбоо барих
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {consultingServices.map((item, index) => (
                  <div
                    key={index}
                    className="group p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/10 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link to="/services">
            <Button variant="outline" size="xl" className="group">
              Бүх бүтээгдэхүүн үзэх
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
