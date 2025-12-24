import { Link } from "react-router-dom";
import { Linkedin, Mail, ArrowRight, Users2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeamMembers, TeamMember } from "@/hooks/useContentData";

// Fallback static data
const fallbackTeamMembers = [
  {
    id: "1",
    name: "Ичинноров Орхонхүү",
    position_mn: "Төслийн удирдлага",
    bio_mn: "Төлбөр тооцооны систем, Банкны систем, 20 жилийн туршлагатай.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Цэвээндорж Цэнгэл",
    position_mn: "Мэдээллийн системийн мэргэжилтэн",
    bio_mn: "Банк санхүүгийн мэдээллийн систем, 19 жилийн туршлагатай.",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Лочинжалбуу Хатанбаатар",
    position_mn: "Систем анализ",
    bio_mn: "Систем анализ, Дата төв, 16 жилийн туршлагатай.",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Цэндсүрэн Мөнх-эрдэнэ",
    position_mn: "Програм хангамж хөгжүүлэлт",
    bio_mn: "Програм хангамж, Алгоритм, 17-н жилийн туршлагатай.",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  },
];

const TeamMemberCard = ({ member, index }: { member: TeamMember | (typeof fallbackTeamMembers)[0]; index: number }) => (
  <div
    className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    {/* Image */}
    <div className="aspect-square overflow-hidden relative">
      <img
        src={
          member.image_url ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        }
        alt={member.name}
        className="w-full h-full object-cover group-hover:scale-310 transition-transform duration-700"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-display text-base font-semibold text-foreground mb-0.5 truncate">{member.name}</h3>
      <p className="text-primary text-xs font-medium mb-2">
        {member.position_mn || ("position" in member ? member.position : "")}
      </p>
      <p className="text-muted-foreground text-xs line-clamp-2">
        {member.bio_mn || ("bio" in member ? member.bio : "")}
      </p>
    </div>
    {/* Social Links - appear on hover */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
      {"linkedin_url" in member && member.linkedin_url && (
        <a
          href={member.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <Linkedin size={16} className="text-white" />
        </a>
      )}
      {"email" in member && member.email && (
        <a
          href={`mailto:${member.email}`}
          className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <Mail size={16} className="text-white" />
        </a>
      )}
      {!("linkedin_url" in member) && (
        <>
          <a href="#" className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Linkedin size={16} className="text-white" />
          </a>
          <a
            href="mailto:contact@fiba.mn"
            className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Mail size={16} className="text-white" />
          </a>
        </>
      )}
    </div>
  </div>
);

export function Team() {
  const { data: dbTeamMembers, isLoading } = useTeamMembers();

  // Use database data if available, otherwise use fallback
  const teamMembers = dbTeamMembers && dbTeamMembers.length > 0 ? dbTeamMembers : fallbackTeamMembers;

  return (
    <section className="py-32 bg-muted/30 relative overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Our Team</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Манай
            <br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              хамт олон
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Банк санхүүгийн салбарт олон жилийн туршлагатай мэргэжлийн баг
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Team Grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link to="/team">
            <Button variant="gradient" size="lg">
              Бүх багийн гишүүд
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
