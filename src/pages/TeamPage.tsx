import { Layout } from "@/components/layout/Layout";
import { Linkedin, Mail, ArrowRight, Sparkles, Users, Award, Target, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useContentData";

// Fallback static data
const fallbackTeamMembers = [
  {
    id: "1",
    name: "Б. Батбаяр",
    position_mn: "Захирал",
    bio_mn: "Банк санхүүгийн салбарт 20+ жилийн туршлагатай. FIBA компанийг 2009 онд үүсгэн байгуулсан.",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "#",
    email: null,
  },
  {
    id: "2",
    name: "Д. Дорж",
    position_mn: "Технологийн захирал",
    bio_mn: "Програм хангамжийн архитектур, системийн интеграцийн чиглэлээр 15+ жилийн туршлагатай.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "#",
    email: null,
  },
  {
    id: "3",
    name: "Г. Ганбаатар",
    position_mn: "Бүтээгдэхүүний менежер",
    bio_mn: "Core Banking системийн хөгжүүлэлт, нэвтрүүлэлтийн чиглэлээр мэргэшсэн.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "#",
    email: null,
  },
  {
    id: "4",
    name: "С. Сараа",
    position_mn: "Ахлах програмист",
    bio_mn: "Full-stack хөгжүүлэгч. React, Node.js, PostgreSQL чиглэлээр мэргэшсэн.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "#",
    email: null,
  },
];

const teamStats = [
  { icon: Users, value: "12+", label: "Баг хамт олон" },
  { icon: Award, value: "15+", label: "Жилийн туршлага" },
  { icon: Target, value: "100+", label: "Амжилттай төсөл" },
];

const TeamPage = () => {
  const { data: dbTeamMembers, isLoading } = useTeamMembers();

  // Use database data if available, otherwise use fallback
  const teamMembers = dbTeamMembers && dbTeamMembers.length > 0 ? dbTeamMembers : fallbackTeamMembers;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">Манай баг</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Инновацийн <span className="gradient-text">цаадах хүмүүс</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Манай чадварлаг баг нь банк санхүүгийн технологийн чиглэлээр олон жилийн туршлага, мэдлэгээ нэгтгэн,
              шилдэг шийдлүүдийг бүтээдэг.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {teamStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
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

      {/* Team Grid - Bento Style */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group relative rounded-[2rem] bg-card border border-border/50 overflow-hidden hover:border-primary/20 hover:shadow-xl transition-all duration-500"
                >
                  {/* Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={
                        member.image_url ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                      }
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-semibold mb-3">{member.position_mn || ""}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {member.bio_mn || ""}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-2">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                        >
                          <Mail size={16} />
                        </a>
                      )}
                      {!member.linkedin_url && !member.email && (
                        <>
                          <a
                            href="#"
                            className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                          >
                            <Linkedin size={16} />
                          </a>
                          <a
                            href="mailto:contact@fiba.mn"
                            className="w-9 h-9 rounded-xl bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                          >
                            <Mail size={16} />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden p-12 lg:p-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white/90 font-medium text-sm">Нээлттэй ажлын байр</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Бидэнтэй нэгдэх үү?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Бид үргэлж технологид хайртай, бүтээлч сэтгэлгээтэй хүмүүстэй хамтран ажиллахыг хүсдэг.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  Холбоо барих
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
