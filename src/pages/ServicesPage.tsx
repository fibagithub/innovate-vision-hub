import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Database,
  FileText,
  Smartphone,
  CreditCard,
  BarChart3,
  Sparkles,
  Play,
  Shield,
  Zap,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Package,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices, Service, ServiceBenefit } from "@/hooks/useContentData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Icon mapping for dynamic icons
const iconMap: Record<string, LucideIcon> = {
  Database,
  FileText,
  Smartphone,
  CreditCard,
  BarChart3,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Package,
};

// Gradient presets for products
const gradientPresets = [
  { gradient: "from-primary to-[#2563eb]", bgGradient: "from-primary/10 via-primary/5 to-transparent" },
  { gradient: "from-[#7c3aed] to-[#a855f7]", bgGradient: "from-[#7c3aed]/10 via-[#7c3aed]/5 to-transparent" },
  { gradient: "from-[#059669] to-[#34d399]", bgGradient: "from-[#059669]/10 via-[#059669]/5 to-transparent" },
  { gradient: "from-[#f59e0b] to-[#fbbf24]", bgGradient: "from-[#f59e0b]/10 via-[#f59e0b]/5 to-transparent" },
  { gradient: "from-[#ec4899] to-[#f472b6]", bgGradient: "from-[#ec4899]/10 via-[#ec4899]/5 to-transparent" },
];

// External links for specific products
const externalLinks: Record<string, string> = {
  "MeAPP": "https://me.fiba.mn/",
  "SainScore": "https://sainscore.mn/",
};

// Get external link if exists
const getExternalLink = (productName: string): string | null => {
  return externalLinks[productName] || null;
};

// Parse usage metrics string to array (format: "value1|value2|value3")
const parseUsageMetrics = (value: string | null | undefined): string[] => {
  if (!value) return [];
  return value
    .split("|")
    .map((v) => v.trim())
    .filter((v) => v);
};

// Transform service to product format
const serviceToProduct = (service: Service, index: number) => {
  const presetIndex = index % gradientPresets.length;
  const preset = gradientPresets[presetIndex];
  const IconComponent = iconMap[service.icon || "Package"] || Package;

  // Parse features from array
  const features = (service.features || []).map((f) => ({
    title: f,
    desc: "",
  }));

  // Parse usage metrics to array
  const usageMetrics = parseUsageMetrics(service.usage_metric);

  return {
    id: service.id,
    icon: IconComponent,
    icon_url: service.icon_url,
    title: service.name,
    title_mn: service.name_mn,
    subtitle: service.category || "",
    subtitle_mn: service.category_mn || "",
    shortDesc: service.description || "",
    shortDesc_mn: service.description_mn || "",
    description: service.description || "",
    description_mn: service.description_mn || "",
    usage_metric: service.usage_metric,
    usage_metric_mn: service.usage_metric_mn,
    usageMetrics, // Array of usage metrics
    gradient: preset.gradient,
    bgGradient: preset.bgGradient,
    features,
    benefits: (service.benefits || []) as ServiceBenefit[],
    benefits_mn: (service.benefits_mn || []) as ServiceBenefit[],
    stats: [],
  };
};

const ServicesPage = () => {
  const { serviceId } = useParams();
  const { language, t } = useLanguage();
  const { data: services, isLoading } = useServices();

  // Transform services to products
  const products = (services || []).map((service, index) => serviceToProduct(service, index));

  const product = serviceId ? products.find((p) => p.id === serviceId) : null;

  // Helper function to get localized content
  const getLocalizedContent = (en: string | null | undefined, mn: string | null | undefined) => {
    if (language === "mn") {
      return mn || en || "";
    }
    return en || "";
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="relative pt-32 pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Skeleton className="h-12 w-96 mx-auto mb-6" />
              <Skeleton className="h-6 w-64 mx-auto" />
            </div>
            <div className="grid grid-cols-12 gap-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={
                    i === 0
                      ? "col-span-12 lg:col-span-8"
                      : i === 1
                        ? "col-span-12 lg:col-span-4"
                        : "col-span-12 md:col-span-6 lg:col-span-4"
                  }
                >
                  <Skeleton className="h-[350px] rounded-[2rem]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (product) {
    const productTitle = getLocalizedContent(product.title, product.title_mn);
    const productSubtitle = getLocalizedContent(product.subtitle, product.subtitle_mn);
    const productDescription = getLocalizedContent(product.description, product.description_mn);

    return (
      <Layout>
        {/* Hero Section - Innovative Design */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient}`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Floating Elements */}
          <div
            className={`absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br ${product.gradient} opacity-10 rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-0 left-[5%] w-[300px] h-[300px] bg-gradient-to-br ${product.gradient} opacity-5 rounded-full blur-3xl`}
          />

          <div className="container mx-auto px-4 relative">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">{t('servicesPage.backToProducts')}</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                {/* Logo */}
                <div
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-8 shadow-2xl overflow-hidden`}
                >
                  {product.icon_url ? (
                    <img src={product.icon_url} alt={productTitle} className="w-full h-full object-cover" />
                  ) : (
                    <product.icon className="w-12 h-12 text-white" />
                  )}
                </div>

                <span
                  className="text-sm font-bold tracking-widest uppercase mb-4 block"
                  style={{
                    background: `linear-gradient(to right, ${product.gradient.includes("primary") ? "hsl(var(--primary))" : product.gradient.split(" ")[0].replace("from-[", "").replace("]", "")}, ${product.gradient.split(" ")[1].replace("to-[", "").replace("]", "")})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {productSubtitle}
                </span>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
                  {productTitle}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">{productDescription}</p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                      <Button variant="gradient" size="xl" className={`bg-gradient-to-r ${product.gradient}`}>
                        {t('servicesPage.contactUs')}
                        <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Usage Metrics and Features Preview */}
              <div className="grid grid-cols-2 gap-4">
                {/* Display each usage metric separately */}
                {product.usageMetrics.map((metric, index) => (
                  <div
                    key={`metric-${index}`}
                    className={`${product.usageMetrics.length === 1 ? "col-span-2" : ""} p-6 rounded-3xl bg-card border border-border/50`}
                  >
                    <div
                      className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}
                    >
                      {metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Bento Grid */}
        {product.features.length > 0 && (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} bg-opacity-10 mb-6`}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-medium text-sm">{t('servicesPage.features')}</span>
                </div>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {t('servicesPage.featuresTitle')}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {productTitle}{t('servicesPage.featuresDesc')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    {feature.desc && <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Benefits/Advantages */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                  {t('servicesPage.advantages')}
                </span>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {t('servicesPage.whyProduct')} {productTitle}?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t('servicesPage.innovativeDesc')}
                </p>

                <div className="space-y-4">
                  {/* Show benefits from admin if available, otherwise fallback to features */}
                  {(product.benefits && product.benefits.length > 0 ? product.benefits : product.features.slice(0, 4)).map((item, index) => {
                    const title = 'title' in item ? item.title : (item as { title: string }).title;
                    const description = 'description' in item ? (item as { description?: string }).description : undefined;
                    
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-foreground font-medium">{title}</span>
                          {description && (
                            <p className="text-sm text-muted-foreground mt-1">{description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Card */}
              <div className={`relative p-10 rounded-[2.5rem] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8 overflow-hidden">
                    {product.icon_url ? (
                      <img src={product.icon_url} alt={productTitle} className="w-full h-full object-cover" />
                    ) : (
                      <product.icon className="w-10 h-10 text-white" />
                    )}
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white mb-4">{t('servicesPage.readyToStart')}</h3>
                  <p className="text-white/80 text-lg mb-8 leading-relaxed">
                    {t('servicesPage.contactTeam')} {productTitle}{t('servicesPage.learnMoreAbout')}
                  </p>

                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-foreground hover:bg-white/90 shadow-xl">
                      {t('servicesPage.contactUs')}
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Products */}
        {products.length > 1 && (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">{t('servicesPage.otherProducts')}</h2>
                <p className="text-muted-foreground">{t('servicesPage.otherProductsDesc')}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => p.id !== serviceId)
                  .map((p) => {
                    const pTitle = getLocalizedContent(p.title, p.title_mn);
                    const pShortDesc = getLocalizedContent(p.shortDesc, p.shortDesc_mn);
                    const externalLink = getExternalLink(p.title);

                    const CardContent = (
                      <>
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden`}
                        >
                          {p.icon_url ? (
                            <img src={p.icon_url} alt={pTitle} className="w-full h-full object-cover" />
                          ) : (
                            <p.icon className="w-7 h-7 text-white" />
                          )}
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {pTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">{pShortDesc}</p>
                      </>
                    );

                    if (externalLink) {
                      return (
                        <a
                          key={p.id}
                          href={externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                        >
                          {CardContent}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={p.id}
                        to={`/services/${p.id}`}
                        className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                      >
                        {CardContent}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </section>
        )}
      </Layout>
    );
  }

  // Products List Page
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Elements */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">Бүтээгдэхүүн & Үйлчилгээ</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
              Санхүүгийн
              <span className="block mt-2 bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
                Технологийн Шийдлүүд
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн бүтээгдэхүүнүүд
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - Innovative Bento Layout */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Бүтээгдэхүүн олдсонгүй</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {products.map((product, index) => {
                const productTitle = getLocalizedContent(product.title, product.title_mn);
                const productSubtitle = getLocalizedContent(product.subtitle, product.subtitle_mn);
                const productShortDesc = getLocalizedContent(product.shortDesc, product.shortDesc_mn);

                // Different sizes for visual interest
                const sizeClass =
                  index === 0
                    ? "col-span-12 lg:col-span-8"
                    : index === 1
                      ? "col-span-12 lg:col-span-4"
                      : "col-span-12 md:col-span-6 lg:col-span-4";

                const minHeight = index === 0 ? "min-h-[400px]" : "min-h-[350px]";

                return (
                  <div key={product.id} className={sizeClass}>
                    {(() => {
                      const externalLink = getExternalLink(product.title);
                      const cardContent = (
                        <div
                          className={`group relative h-full ${minHeight} p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br ${product.bgGradient} bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/20`}
                        >
                          {/* Gradient Accent */}
                          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient}`} />

                          {/* Decorative */}
                          <div
                            className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${product.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}
                          />

                          <div className="relative h-full flex flex-col">
                            <div className="flex items-start justify-between mb-6">
                              <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 overflow-hidden`}
                              >
                                {product.icon_url ? (
                                  <img src={product.icon_url} alt={productTitle} className="w-full h-full object-cover" />
                                ) : (
                                  <product.icon className="w-8 h-8 text-white" />
                                )}
                              </div>
                              <span className="text-6xl font-black text-foreground/5"></span>
                            </div>

                            <span
                              className="text-xs font-bold tracking-widest uppercase mb-2"
                              style={{
                                background: `linear-gradient(to right, ${product.gradient.includes("primary") ? "hsl(var(--primary))" : product.gradient.split(" ")[0].replace("from-[", "").replace("]", "")}, ${product.gradient.split(" ")[1].replace("to-[", "").replace("]", "")})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }}
                            >
                              {productSubtitle}
                            </span>

                            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                              {productTitle}
                            </h2>

                            <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{productShortDesc}</p>

                            {/* Features Preview */}
                            {product.features.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {product.features.slice(0, 6).map((feature, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-medium text-foreground/70"
                                  >
                                    {feature.title}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-6 border-t border-border/50">
                              <div className="flex items-center gap-2">
                                <Sparkles
                                  className="w-4 h-4"
                                  style={{
                                    color: product.gradient.includes("primary")
                                      ? "hsl(var(--primary))"
                                      : product.gradient.split(" ")[0].replace("from-[", "").replace("]", ""),
                                  }}
                                />
                              </div>
                              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      );

                      if (externalLink) {
                        return (
                          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="block h-full">
                            {cardContent}
                          </a>
                        );
                      }

                      return (
                        <Link to={`/services/${product.id}`} className="block h-full">
                          {cardContent}
                        </Link>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-[#2563eb] to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-8">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white/90 font-medium text-sm">Зөвлөгөө авах</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Аль бүтээгдэхүүн тохирохоо мэдэхгүй байна уу?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Манай мэргэжилтнүүд танд тохирох шийдлийг санал болгоход бэлэн байна.
            </p>

            <Link to="/contact">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl">
                Зөвлөгөө авах
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
