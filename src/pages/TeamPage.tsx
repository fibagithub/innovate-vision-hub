import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Linkedin, Mail, ArrowRight, Sparkles, Users, Award, Target, Loader2, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTeamMembers, TeamMember } from "@/hooks/useContentData";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackTeamMembers = [
  { id: "1", name: "Б. Батбаяр", position_mn: "Захирал", position: "Director", bio_mn: "Банк санхүүгийн салбарт 20+ жилийн туршлагатай. FIBA компанийг 2009 онд үүсгэн байгуулсан.", bio: "20+ years of experience in banking and finance. Founded FIBA in 2009.", image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face", linkedin_url: "#", email: null },
  { id: "2", name: "Д. Дорж", position_mn: "Технологийн захирал", position: "CTO", bio_mn: "Програм хангамжийн архитектур, системийн интеграцийн чиглэлээр 15+ жилийн туршлагатай.", bio: "15+ years of experience in software architecture and system integration.", image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face", linkedin_url: "#", email: null },
  { id: "3", name: "Г. Ганбаатар", position_mn: "Бүтээгдэхүүний менежер", position: "Product Manager", bio_mn: "Core Banking системийн хөгжүүлэлт, нэвтрүүлэлтийн чиглэлээр мэргэшсэн.", bio: "Specialized in Core Banking system development and implementation.", image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face", linkedin_url: "#", email: null },
  { id: "4", name: "С. Сараа", position_mn: "Ахлах програмист", position: "Senior Developer", bio_mn: "Full-stack хөгжүүлэгч. React, Node.js, PostgreSQL чиглэлээр мэргэшсэн.", bio: "Full-stack developer. Specialized in React, Node.js, PostgreSQL.", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face", linkedin_url: "#", email: null },
];

type AnyMember = TeamMember | (typeof fallbackTeamMembers)[0];

const ProfileModal = ({ member, onClose, language, t }: { member: AnyMember; onClose: () => void; language: 'mn' | 'en'; t: (k: string) => string }) => {
  const linkedinUrl = "linkedin_url" in member ? member.linkedin_url : null;
  const email = "email" in member ? member.email : null;
  const memberName = language === 'mn' ? (("name_mn" in member ? member.name_mn : null) || member.name) : (member.name || ("name_mn" in member ? member.name_mn : null));
  const position = language === 'mn' ? (member.position_mn || ("position" in member ? member.position : "")) : (("position" in member ? member.position : "") || member.position_mn);
  const bio = language === 'mn' ? (member.bio_mn || ("bio" in member ? member.bio : "")) : (("bio" in member ? member.bio : "") || member.bio_mn);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in" />
      <div className="relative w-full max-w-2xl bg-card rounded-[24px] overflow-hidden animate-scale-in" style={{ boxShadow: "var(--shadow-xl)" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors duration-200"><X className="w-5 h-5" /></button>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto relative flex-shrink-0">
            <img src={member.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face"} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 w-fit">{position}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">{memberName}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{bio}</p>
            <div className="flex gap-3">
              {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors duration-200"><Linkedin className="w-4 h-4" />LinkedIn<ExternalLink className="w-3 h-3" /></a>}
              {email && <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors duration-200"><Mail className="w-4 h-4" />{t('team.email')}</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamPage = () => {
  const { data: dbTeamMembers, isLoading } = useTeamMembers();
  const [expandedMember, setExpandedMember] = useState<AnyMember | null>(null);
  const { t, language } = useLanguage();
  const teamMembers = dbTeamMembers && dbTeamMembers.length > 0 ? dbTeamMembers : fallbackTeamMembers;

  const teamStats = [
    { icon: Users, value: "13+", label: t('teamPage.stat.team') },
    { icon: Award, value: "15+", label: t('teamPage.stat.experience') },
    { icon: Target, value: "40+", label: t('teamPage.stat.projects') },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="container relative z-10 mx-auto px-4 pt-32 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">{t('team.badge')}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              {t('teamPage.heroTitle1')}{" "}
              <span className="bg-gradient-to-r from-primary via-[hsl(214,62%,35%)] to-primary bg-clip-text text-transparent">{t('teamPage.heroHighlight')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>{t('teamPage.heroDesc')}</p>
            <div className="flex flex-wrap justify-center gap-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {teamStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-card border border-border/50" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
                  <div className="text-left">
                    <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="container mx-auto px-4 relative">
          {isLoading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => {
                const memberName = language === 'mn' ? (("name_mn" in member ? (member as any).name_mn : null) || member.name) : (member.name || ("name_mn" in member ? (member as any).name_mn : null));
                const position = language === 'mn' ? (member.position_mn || ("position" in member ? member.position : "")) : (("position" in member ? member.position : "") || member.position_mn);
                const bio = language === 'mn' ? (member.bio_mn || ("bio" in member ? member.bio : "")) : (("bio" in member ? member.bio : "") || member.bio_mn);
                return (
                  <div key={member.id} className="group relative rounded-[20px] bg-card border border-border/40 overflow-hidden cursor-pointer" style={{ boxShadow: "var(--shadow-sm)", transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => setExpandedMember(member)}
                    onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`; e.currentTarget.style.boxShadow = "var(--shadow-xl)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
                    <div className="aspect-square overflow-hidden relative">
                      <img src={member.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"><Linkedin className="w-4 h-4" /></a>}
                        {member.email && <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"><Mail className="w-4 h-4" /></a>}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-bold text-foreground tracking-tight leading-tight mb-1">{memberName}</h3>
                      <p className="text-primary text-xs font-semibold mb-2">{position}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{bio}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2rem] bg-gradient-to-br from-primary via-[hsl(214,62%,35%)] to-primary overflow-hidden p-12 lg:p-20">
            <div className="absolute inset-0 opacity-10"><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" /></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"><Users className="w-4 h-4 text-white" /></div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">{t('teamPage.joinTitle')}</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">{t('teamPage.joinDesc')}</p>
              <Link to="/contact"><Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl rounded-2xl px-8">{t('nav.contact')}<ArrowRight className="ml-2" /></Button></Link>
            </div>
          </div>
        </div>
      </section>

      {expandedMember && <ProfileModal member={expandedMember} onClose={() => setExpandedMember(null)} language={language} t={t} />}
    </Layout>
  );
};

export default TeamPage;
