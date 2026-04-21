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
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 lg:p-12">
              <div className="w-full h-full rounded-2xl bg-card border border-border shadow-elevated flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-primary-foreground">F</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">FIBA LLC</h3>
                  <p className="text-muted-foreground mb-4">{t('aboutPage.since')}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-primary text-sm font-medium">fiba.mn</span>
                  </div>
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
