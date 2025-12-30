import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight,
  Building2,
  Landmark,
  Wallet,
  Users,
  Globe,
  Shield,
  Sparkles,
  TrendingUp,
  Award,
  MapPin,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePartners, usePartnerStats } from "@/hooks/useContentData";
import { useLanguage } from "@/contexts/LanguageContext";

const REGION_POSITIONS: Record<string, { x: string; y: string }> = {
  ulaanbaatar: { x: "52%", y: "45%" },
  khangai: { x: "35%", y: "65%" },
  central: { x: "50%", y: "32%" },
  west: { x: "20%", y: "40%" },
  east: { x: "80%", y: "38%" },
  gobi: { x: "60%", y: "65%" },
  north: { x: "45%", y: "20%" },
};

const PartnersPage = () => {
  const { data: dbPartners, isLoading } = usePartners();
  const { data: partnerData } = usePartnerStats();
  const { t, language } = useLanguage();

  const clientTypes = [
    {
      icon: Landmark,
      title: t('clientType.bank'),
      count: "4+",
      description: t('clientType.bankDesc'),
      gradient: "from-primary to-[#2563eb]",
    },
    {
      icon: Building2,
      title: t('clientType.nbfi'),
      count: "20+",
      description: t('clientType.nbfiDesc'),
      gradient: "from-[#7c3aed] to-[#a855f7]",
    },
    {
      icon: Wallet,
      title: t('clientType.creditUnion'),
      count: "25+",
      description: t('clientType.creditUnionDesc'),
      gradient: "from-[#059669] to-[#34d399]",
    },
    {
      icon: Users,
      title: t('clientType.other'),
      count: "10+",
      description: t('clientType.otherDesc'),
      gradient: "from-[#f59e0b] to-[#fbbf24]",
    },
  ];

  const achievements = [
    { value: "50+", label: t('achievement.totalClients'), icon: Users },
    { value: "15+", label: t('achievement.experience'), icon: Award },
    { value: "12", label: t('achievement.provinces'), icon: MapPin },
    { value: "99.9%", label: t('achievement.uptime'), icon: Shield },
  ];

  const testimonials = [
    {
      quote: language === 'mn' 
        ? "FIBA-ийн Core Banking систем нь манай байгууллагын үйл ажиллагааг бүрэн автоматжуулж, үйлчилгээний чанарыг эрс сайжруулсан."
        : "FIBA's Core Banking system has fully automated our organization's operations and significantly improved service quality.",
      author: language === 'mn' ? "Санхүүгийн захирал" : "Financial Director",
      company: language === 'mn' ? "Тэргүүлэгч ББСБ" : "Leading NBFI",
      gradient: "from-primary to-[#2563eb]",
    },
    {
      quote: language === 'mn'
        ? "MeAPP мобайл аппликейшн нь манай гишүүдэд хаанаас ч үйлчилгээ авах боломж олгож, харилцагчийн сэтгэл ханамжийг нэмэгдүүлсэн."
        : "The MeAPP mobile application has enabled our members to access services from anywhere, increasing customer satisfaction.",
      author: language === 'mn' ? "Гүйцэтгэх захирал" : "Executive Director",
      company: language === 'mn' ? "ХЗХ" : "Credit Union",
      gradient: "from-[#7c3aed] to-[#a855f7]",
    },
    {
      quote: language === 'mn'
        ? "Мэргэжлийн өндөр түвшний дэмжлэг, 24/7 найдвартай ажиллагаа нь манай сонголтыг зөв болгосон."
        : "High-level professional support and 24/7 reliable operation made our choice the right one.",
      author: language === 'mn' ? "IT менежер" : "IT Manager",
      company: language === 'mn' ? "ББСБ" : "NBFI",
      gradient: "from-[#059669] to-[#34d399]",
    },
  ];

  // Get regions from partner data
  const regions = partnerData?.partners?.filter(p => p.region).map(p => ({
    name: t(`region.${p.region}`),
    count: p.count || 0,
    ...REGION_POSITIONS[p.region || 'ulaanbaatar']
  })) || [];

  const totalCount = partnerData?.totalCount || 0;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">{t('partners.badge')}</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {language === 'mn' ? (
                <>
                  Салбарын <span className="gradient-text">тэргүүлэгчдийн</span>
                  <br />
                  итгэлийг хүлээсэн
                </>
              ) : (
                <>
                  <span className="gradient-text">Trusted</span> by
                  <br />
                  Industry Leaders
                </>
              )}
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t('partnersPage.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Large Total Stats from Database */}
      {totalCount > 0 && (
        <section className="py-12 bg-background relative -mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="font-display text-8xl lg:text-[10rem] font-bold bg-gradient-to-r from-primary to-[#2563eb] bg-clip-text text-transparent leading-none">
                {totalCount}+
              </div>
              <p className="text-2xl text-muted-foreground mt-4">
                {t('partnersPage.totalClients')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Database Partners Display */}
      {dbPartners && dbPartners.length > 0 && (
        <section className="py-12 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">{t('partnersPage.ourPartners')}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dbPartners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-3"
                >
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="h-12 object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground text-center">{partner.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Achievement Stats */}
      <section className="py-8 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {achievements.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 lg:p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#2563eb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Coverage with Database Stats */}
      {regions.length > 0 && (
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-sm tracking-wide">{t('partnersPage.regionalCoverage')}</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                {language === 'mn' ? (
                  <>Монгол даяар <span className="gradient-text">12 аймагт</span></>
                ) : (
                  <>Across <span className="gradient-text">12 Provinces</span> in Mongolia</>
                )}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('partnersPage.regionalDesc')}
              </p>
            </div>

            {/* Regional Stats Grid with Large Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <div className="relative">
                    <div className="font-display text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-[#2563eb] bg-clip-text text-transparent mb-3">
                      {region.count}
                    </div>
                    <div className="text-foreground font-medium">{region.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Types */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">{t('partnersPage.clientTypes')}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {language === 'mn' ? (
                <>Санхүүгийн <span className="gradient-text">бүх салбарт</span></>
              ) : (
                <>Across All <span className="gradient-text">Financial Sectors</span></>
              )}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('partnersPage.clientTypesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map((client, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${client.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${client.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <client.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-display text-4xl font-bold text-foreground mb-2">{client.count}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{client.title}</h3>
                  <p className="text-muted-foreground text-sm">{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">{t('partnersPage.testimonials')}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {language === 'mn' ? (
                <>Харилцагчид <span className="gradient-text">юу хэлдэг вэ?</span></>
              ) : (
                <>What Our <span className="gradient-text">Clients Say?</span></>
              )}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-8 lg:p-10 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="text-4xl text-primary/20 font-display mb-4">"</div>
                  <p className="text-foreground mb-8 leading-relaxed">{testimonial.quote}</p>
                  <div className="pt-6 border-t border-border/50">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden p-12 lg:p-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white/90 font-medium text-sm">{t('partnersPage.becomePartner')}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t('partnersPage.becomePartnerTitle')}
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                {t('partnersPage.becomePartnerDesc')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  {t('nav.contact')}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnersPage;
