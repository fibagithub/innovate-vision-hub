import { Link } from "react-router-dom";
import { ArrowRight, Globe2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePartnerStats } from "@/hooks/useContentData";
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

export function Partners() {
  const { data: partnerData, isLoading } = usePartnerStats();
  const { t, language } = useLanguage();

  const regions = partnerData?.partners?.filter(p => p.region).map(p => ({
    name: language === 'mn' ? t(`region.${p.region}`) : t(`region.${p.region}`),
    count: p.count || 0,
    ...REGION_POSITIONS[p.region || 'ulaanbaatar']
  })) || [];

  const totalCount = partnerData?.totalCount || 0;
  
  // Get partners with logos for marquee
  const partnersWithLogos = partnerData?.partners?.filter(p => p.logo_url) || [];

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="clients">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">{t('partners.badge')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t('partners.title1')}
            <br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              {t('partners.title2')}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('partners.description')}
          </p>
        </div>

        {/* Large Total Stats */}
        {totalCount > 0 && (
          <div className="text-center mb-16">
            <div className="font-display text-7xl lg:text-9xl font-bold bg-gradient-to-r from-primary to-[#2563eb] bg-clip-text text-transparent">
              {totalCount}+
            </div>
            <p className="text-xl text-muted-foreground mt-4">
              {t('partners.totalOrgs')}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Logo Marquee */}
        {partnersWithLogos.length > 0 && (
          <div className="mb-20">
            <div className="marquee-container">
              <div className="flex animate-marquee items-center">
                {[...partnersWithLogos, ...partnersWithLogos, ...partnersWithLogos].map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 mx-10 w-28 h-16 flex items-center justify-center transition-all duration-300"
                  >
                    <img
                      src={partner.logo_url!}
                      alt={partner.name || 'Partner logo'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        {regions.length > 0 && (
          <div className="relative mb-20">
            <div className="bg-card rounded-[2rem] border border-border/50 p-8 lg:p-12 overflow-hidden">
              <div className="relative aspect-[2/1] max-w-5xl mx-auto">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M50,180 Q100,120 200,100 Q300,80 400,90 Q500,70 600,100 Q700,130 750,180 Q780,220 750,280 Q700,340 600,350 Q500,360 400,350 Q300,360 200,340 Q100,320 50,280 Q20,240 50,180 Z"
                    fill="url(#mapGradient)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                  />
                </svg>

                {regions.map((region, index) => (
                  <div
                    key={region.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: region.x, top: region.y }}
                  >
                    <div className="absolute inset-0 w-16 h-16 -translate-x-1/4 -translate-y-1/4">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: `${index * 200}ms` }} />
                    </div>
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#2563eb] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="font-display font-bold text-white text-sm">{region.count}</span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                      <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                        {region.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border/50 p-10 lg:p-16 overflow-hidden">
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {t('partners.whyChoose')}
              </h3>
              <p className="text-muted-foreground text-lg mb-8">{t('partners.whyChooseDesc')}</p>
              <Link to="/partners">
                <Button variant="gradient" size="lg">
                  {t('partners.moreInfo')}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
