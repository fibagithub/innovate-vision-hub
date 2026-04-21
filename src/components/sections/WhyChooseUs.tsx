import { Shield, Clock, Award, TrendingUp, Cpu, ArrowRight, Users, CheckCircle2, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const stats = [
    { value: "33+", label: t("why.stat.clients"), icon: Users },
    { value: "99.9%", label: t("why.stat.uptime"), icon: TrendingUp },
    { value: "5M+", label: t("why.stat.transactions"), icon: Cpu },
    { value: "24/7", label: t("why.stat.support"), icon: Clock },
  ];

  return (
    <section className="pt-12 pb-24 bg-background relative overflow-hidden" id="why-us">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <div className="w-2 h-2 rounded-full bg-primary absolute" />
            </div>
            <span className="text-primary font-semibold text-sm tracking-wide"></span>
            <Award className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
            {t("why.title1")}
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
                {t("why.titleHighlight")}
              </span>
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">{t("why.description")}</p>
        </div>

        <div className="relative mb-20">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-[#6366f1] to-[#ec4899] opacity-90" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/20 p-8 lg:p-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 py-4 group cursor-default">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <FeatureCard key={index} reason={reason} index={index} />
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
          <div className="relative p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("why.cta.title")}</h3>
              <p className="text-muted-foreground text-lg max-w-xl">{t("why.cta.desc")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="gradient" size="xl" className="group">
                  {t("why.cta.contact")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  {t("why.cta.viewServices")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
