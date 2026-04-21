import { Globe2, Loader2 } from "lucide-react";
import { usePartnerStats } from "@/hooks/useContentData";
import { useLanguage } from "@/contexts/LanguageContext";
import { MongoliaMap } from "./MongoliaMap";

export function Partners() {
  const { data: partnerData, isLoading } = usePartnerStats();
  const { t } = useLanguage();

  const aimagStats = partnerData?.aimagStats || {};
  const hasAimagData = Object.keys(aimagStats).length > 0;
  const totalCount = partnerData?.totalCount || 0;

  // Get partners with logos for marquee
  const partnersWithLogos = partnerData?.partners?.filter((p) => p.logo_url) || [];

  return (
    <section className="pt-12 pb-24 bg-background relative overflow-hidden" id="clients">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">{t("partners.badge")}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t("partners.title1")}
            <br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              {t("partners.title2")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("partners.description")}</p>
        </div>

        {/* Large Total Stats */}
        {totalCount > 0 && (
          <div className="text-center mb-16">
            <div className="font-display text-7xl lg:text-9xl font-bold bg-gradient-to-r from-primary to-[#2563eb] bg-clip-text text-transparent">
              {totalCount}+
            </div>
            <p className="text-xl text-muted-foreground mt-4">{t("partners.totalOrgs")}</p>
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
                      alt={partner.name || "Partner logo"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mongolia Map Section */}
        {hasAimagData && (
          <div className="relative mb-20">
            <div className="bg-card rounded-[2rem] border border-border/50 p-6 lg:p-10 overflow-hidden">
              <MongoliaMap aimagStats={aimagStats} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
