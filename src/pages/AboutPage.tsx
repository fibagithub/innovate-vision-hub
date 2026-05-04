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
import { usePartners, useTeamMembers } from "@/hooks/useContentData";

const AboutPage = () => {
  const { t } = useLanguage();
  const { data: partners } = usePartners();
  const { data: team } = useTeamMembers();
  const clientsTotal = (partners || [])
    .filter((p) => p.partner_type === "client")
    .reduce((sum, p) => sum + (p.count || 0), 0);
  const teamTotal = (team || []).filter((m) => m.is_active).length;

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
      <section className="pt-12 pb-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold text-sm tracking-wide">{t("aboutPage.storyBadge")}</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                {t("aboutPage.storyTitle")}{" "}
                <span className="bg-gradient-to-r from-primary via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
                  {t("aboutPage.storyHighlight")}
                </span>{" "}
                {t("aboutPage.storySuffix")}
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {/* Narrative – glass card */}
              <div className="lg:col-span-7 group relative rounded-[2.5rem] p-8 lg:p-12 bg-card/70 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-[#6366f1] to-[#ec4899]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-display text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary to-[#6366f1] bg-clip-text text-transparent">2021</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                  </div>
                  <div className="space-y-5 text-muted-foreground text-justify text-base lg:text-lg leading-relaxed">
                    <p>{t("aboutPage.storyDesc1")}</p>
                    <p>{t("aboutPage.storyDesc2")}</p>
                  </div>
                </div>
              </div>

              {/* Brand block – vertical accent */}
              <div className="lg:col-span-5 relative rounded-[2.5rem] p-8 lg:p-10 bg-gradient-to-br from-primary via-[#2563eb] to-[#1e3a8a] overflow-hidden group">
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-32 -left-32 w-72 h-72 border border-white/10 rounded-full" />

                <div className="relative h-full flex flex-col justify-between gap-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">{t("aboutPage.since")}</span>
                    </div>
                    <h3 className="font-display text-7xl font-bold text-white tracking-tight leading-none">
                      FIBA<span className="text-white/50">.</span>
                    </h3>
                    <p className="text-white/80 text-sm mt-3 max-w-xs">FinTech Innovation & Banking Architecture</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: Zap, label: t("about.value.mission") },
                      { icon: Shield, label: t("aboutPage.quality") },
                      { icon: TrendingUp, label: t("about.value.vision") },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 hover:bg-white/15 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pt-12 pb-24 bg-muted/30 relative overflow-hidden">
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
