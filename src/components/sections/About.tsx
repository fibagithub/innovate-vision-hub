import { Link } from "react-router-dom";
import { Target, Eye, Lightbulb, ArrowRight, Award, Shield, Users, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: t('about.value.mission'), description: t('about.value.missionDesc') },
    { icon: Eye, title: t('about.value.vision'), description: t('about.value.visionDesc') },
    { icon: Lightbulb, title: t('about.value.values'), description: t('about.value.valuesDesc') },
  ];

  const features = [
    { icon: Award, title: t('about.feature.experience'), description: t('about.feature.experienceDesc') },
    { icon: Shield, title: t('about.feature.reliable'), description: t('about.feature.reliableDesc') },
    { icon: Users, title: t('about.feature.support'), description: t('about.feature.supportDesc') },
  ];

  return (
    <section className="pt-12 pb-24 bg-muted/50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">{t('about.badge')}</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('about.title')} <span className="gradient-text">{t('about.titleHighlight')}</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">{t('about.desc1')}</p>
            <p className="text-muted-foreground mb-8">{t('about.desc2')}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-xl bg-card border border-border">
                  <feature.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="gradient" size="lg">
                {t('about.learnMore')}
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="space-y-5">
              {[
                {
                  v: "15+",
                  l: t('hero.stat.experience'),
                  icon: Award,
                  gradient: "from-primary to-[#2563eb]",
                  glow: "bg-primary/20",
                },
                {
                  v: "33+",
                  l: t('achievement.totalClients'),
                  icon: TrendingUp,
                  gradient: "from-[#7c3aed] to-[#a855f7]",
                  glow: "bg-[#7c3aed]/20",
                },
                {
                  v: "13+",
                  l: t('hero.stat.team'),
                  icon: Users,
                  gradient: "from-[#059669] to-[#34d399]",
                  glow: "bg-[#059669]/20",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl p-6 lg:p-7 bg-card border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
                  style={{
                    marginLeft: `${i * 24}px`,
                    marginRight: `${(2 - i) * 24}px`,
                  }}
                >
                  <div className={`absolute -top-16 -right-16 w-40 h-40 ${s.glow} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />

                  <div className="relative flex items-center gap-5">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <s.icon className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className={`font-display text-4xl lg:text-5xl font-bold bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}>
                          {s.v}
                        </span>
                        <Sparkles className="w-4 h-4 text-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm lg:text-base text-muted-foreground font-medium mt-1 uppercase tracking-wider">
                        {s.l}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {values.map((value, index) => (
            <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
