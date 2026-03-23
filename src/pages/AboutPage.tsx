import { Layout } from "@/components/layout/Layout";
import {
  Target,
  Eye,
  Lightbulb,
  Award,
  Users,
  Globe,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t("about.value.mission"),
      description: t("about.value.missionDesc"),
      gradient: "from-primary to-[#2563eb]",
    },
    {
      icon: Eye,
      title: t("about.value.vision"),
      description: t("about.value.visionDesc"),
      gradient: "from-[#7c3aed] to-[#a855f7]",
    },
    {
      icon: Lightbulb,
      title: t("about.value.values"),
      description: t("about.value.valuesDesc"),
      gradient: "from-[#059669] to-[#34d399]",
    },
    {
      icon: Award,
      title: t("aboutPage.quality"),
      description: t("aboutPage.qualityDesc"),
      gradient: "from-[#f59e0b] to-[#fbbf24]",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: t("aboutPage.milestone.2021"),
      description: t("aboutPage.milestone.2021Desc"),
      icon: Sparkles,
    },
    {
      year: "2022",
      title: t("aboutPage.milestone.2022"),
      description: t("aboutPage.milestone.2022Desc"),
      icon: Shield,
    },
    { year: "2023", title: t("aboutPage.milestone.2023"), description: t("aboutPage.milestone.2023Desc"), icon: Zap },
    { year: "2024", title: t("aboutPage.milestone.2024"), description: t("aboutPage.milestone.2024Desc"), icon: Globe },
    {
      year: "2025",
      title: t("aboutPage.milestone.2025"),
      description: t("aboutPage.milestone.2025Desc"),
      icon: TrendingUp,
    },
    { year: "2026", title: t("aboutPage.milestone.2026"), description: t("aboutPage.milestone.2026Desc"), icon: Award },
  ];

  const stats = [
    {
      icon: Clock,
      value: "15+",
      label: t("aboutPage.stat.experience"),
      description: t("aboutPage.stat.experienceDesc"),
    },
    { icon: Users, value: "13+", label: t("aboutPage.stat.team"), description: t("aboutPage.stat.teamDesc") },
    { icon: Globe, value: "33+", label: t("aboutPage.stat.clients"), description: t("aboutPage.stat.clientsDesc") },
    {
      icon: TrendingUp,
      value: "99.9%",
      label: t("aboutPage.stat.satisfaction"),
      description: t("aboutPage.stat.satisfactionDesc"),
    },
  ];

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
              <span className="text-primary text-sm font-semibold tracking-wide">{t("aboutPage.badge")}</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {t("aboutPage.heroTitle1")} <span className="gradient-text">{t("aboutPage.heroHighlight")}</span>
              <br />
              {t("aboutPage.heroTitle2")}
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in sm:text-justify"
              style={{ animationDelay: "0.2s" }}
            >
              {t("aboutPage.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="py-8 bg-background relative -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
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
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-card to-card border border-border/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-medium text-sm">{t("aboutPage.storyBadge")}</span>
                </div>

                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  {t("aboutPage.storyTitle")} <span className="gradient-text">{t("aboutPage.storyHighlight")}</span>{" "}
                  {t("aboutPage.storySuffix")}
                </h2>

                <div className="space-y-4 text-muted-foreground text-justify">
                  <p>{t("aboutPage.storyDesc1")}</p>
                  <p>{t("aboutPage.storyDesc2")}</p>
                </div>
              </div>
            </div>

            <div className="relative p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/10 rounded-full" />
              <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-white/5 rounded-full" />

              <div className="relative h-full flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8">
                  <span className="text-6xl font-display font-bold text-white">F</span>
                </div>
                <h3 className="font-display text-4xl font-bold text-white mb-4">FIBA LLC</h3>
                <p className="text-white/80 text-lg mb-6">{t("aboutPage.since")}</p>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-white/90 text-sm font-medium">fiba.mn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">{t("aboutPage.valuesBadge")}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {t("aboutPage.valuesTitle")} <span className="gradient-text">{t("aboutPage.valuesHighlight")}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 lg:p-10 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm tracking-wide">{t("aboutPage.timelineBadge")}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {t("aboutPage.timelineTitle")} <span className="gradient-text">{t("aboutPage.timelineHighlight")}</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="group relative p-6 lg:p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-3xl font-bold text-primary">{milestone.year}</span>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <milestone.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t("aboutPage.ctaTitle")}
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">{t("aboutPage.ctaDesc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    {t("aboutPage.ctaContact")}
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    {t("aboutPage.ctaProducts")}
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
