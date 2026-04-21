import { Link } from "react-router-dom";
import { Target, Eye, Lightbulb, ArrowRight, Award, Shield, Users } from "lucide-react";
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
            <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary p-1 shadow-elevated overflow-hidden">
              <div className="w-full h-full rounded-[2.25rem] bg-card relative overflow-hidden p-8 lg:p-10 flex flex-col justify-between">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-xs font-semibold tracking-wider uppercase">{t('aboutPage.since')}</span>
                  </div>
                  <h3 className="font-display text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-none">
                    FIBA<span className="text-primary">.</span>
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-xs">{t('about.desc1')}</p>
                </div>

                <div className="relative grid grid-cols-3 gap-4 mt-8">
                  {[
                    { v: "15+", l: t('hero.stat.experience') },
                    { v: "33+", l: t('achievement.totalClients') },
                    { v: "13+", l: t('hero.stat.team') },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="font-display text-2xl lg:text-3xl font-bold text-foreground">{s.v}</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground mt-1 uppercase tracking-wide">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="relative flex items-center justify-between pt-6 border-t border-border/60">
                  <a href="https://www.fiba.mn" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline">
                    fiba.mn
                  </a>
                  <span className="text-xs text-muted-foreground font-medium">FIBA LLC</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
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
