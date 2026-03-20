import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Mail, ArrowRight, Users2, Loader2, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeamMembers, TeamMember } from "@/hooks/useContentData";
import { useLanguage } from "@/contexts/LanguageContext";

const fallbackTeamMembers = [
  { id: "1", name: "Ичинноров Орхонхүү", position_mn: "Төслийн удирдлага", position: "Project Manager", bio_mn: "Төлбөр тооцооны систем, Банкны систем, 20 жилийн туршлагатай.", bio: "Payment systems, Banking systems, 20 years of experience.", image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", linkedin_url: null, email: null },
  { id: "2", name: "Цэвээндорж Цэнгэл", position_mn: "Мэдээллийн системийн мэргэжилтэн", position: "Information Systems Specialist", bio_mn: "Банк санхүүгийн мэдээллийн систем, 19 жилийн туршлагатай.", bio: "Banking information systems, 19 years of experience.", image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", linkedin_url: null, email: null },
  { id: "3", name: "Лочинжалбуу Хатанбаатар", position_mn: "Систем анализ", position: "System Analyst", bio_mn: "Систем анализ, Дата төв, 16 жилийн туршлагатай.", bio: "System analysis, Data center, 16 years of experience.", image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face", linkedin_url: null, email: null },
  { id: "4", name: "Цэндсүрэн Мөнх-эрдэнэ", position_mn: "Програм хангамж хөгжүүлэлт", position: "Software Development", bio_mn: "Програм хангамж, Алгоритм, 17-н жилийн туршлагатай.", bio: "Software, Algorithms, 17 years of experience.", image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face", linkedin_url: null, email: null },
];

type AnyMember = TeamMember | (typeof fallbackTeamMembers)[0];

const TeamMemberCard = ({ member, index, onExpand, language }: { member: AnyMember; index: number; onExpand: (m: AnyMember) => void; language: 'mn' | 'en' }) => {
  const linkedinUrl = "linkedin_url" in member ? member.linkedin_url : null;
  const email = "email" in member ? member.email : null;
  const memberName = language === 'mn' ? (("name_mn" in member ? member.name_mn : null) || member.name) : (member.name || ("name_mn" in member ? member.name_mn : null));
  const position = language === 'mn' ? (member.position_mn || ("position" in member ? member.position : "")) : (("position" in member ? member.position : "") || member.position_mn);
  const bio = language === 'mn' ? (member.bio_mn || ("bio" in member ? member.bio : "")) : (("bio" in member ? member.bio : "") || member.bio_mn);

  return (
    <div className="group relative rounded-[20px] bg-card border border-border/40 overflow-hidden cursor-pointer" style={{ animationDelay: `${index * 80}ms`, boxShadow: "var(--shadow-sm)", transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)" }} onClick={() => onExpand(member)}
      onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width - 0.5; const y = (e.clientY - rect.top) / rect.height - 0.5; e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`; e.currentTarget.style.boxShadow = "var(--shadow-xl)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}>
      <div className="aspect-square overflow-hidden relative">
        <img src={member.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
          {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"><Linkedin className="w-4 h-4" /></a>}
          {email && <a href={`mailto:${email}`} onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"><Mail className="w-4 h-4" /></a>}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-[15px] font-bold text-foreground tracking-tight leading-tight mb-1">{memberName}</h3>
        <p className="text-primary text-xs font-semibold mb-2">{position}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{bio}</p>
      </div>
    </div>
  );
};

const ProfileModal = ({ member, onClose, language, t }: { member: AnyMember; onClose: () => void; language: 'mn' | 'en'; t: (k: string) => string }) => {
  const linkedinUrl = "linkedin_url" in member ? member.linkedin_url : null;
  const email = "email" in member ? member.email : null;
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 hidden sm:block" />
          </div>
          <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 w-fit">{position}</div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">{member.name}</h2>
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

export function Team() {
  const { data: dbTeamMembers, isLoading } = useTeamMembers();
  const [expandedMember, setExpandedMember] = useState<AnyMember | null>(null);
  const { t, language } = useLanguage();
  const teamMembers = dbTeamMembers && dbTeamMembers.length > 0 ? dbTeamMembers : fallbackTeamMembers;

  return (
    <section className="py-32 relative overflow-hidden" id="team">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/[0.04] rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <Users2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-wide">{t('team.badge')}</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            {t('team.title')}{" "}
            <span className="bg-gradient-to-r from-primary via-[hsl(214,62%,35%)] to-primary bg-clip-text text-transparent">{t('team.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">{t('team.description')}</p>
        </div>
        {isLoading && <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {teamMembers.map((member, index) => <TeamMemberCard key={member.id} member={member} index={index} onExpand={setExpandedMember} language={language} />)}
          </div>
        )}
        <div className="text-center">
          <Link to="/team"><Button variant="gradient" size="lg" className="rounded-2xl px-8">{t('team.viewAll')}<ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
        </div>
      </div>
      {expandedMember && <ProfileModal member={expandedMember} onClose={() => setExpandedMember(null)} language={language} t={t} />}
    </section>
  );
}
