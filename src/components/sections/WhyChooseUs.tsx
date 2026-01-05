import { useState } from "react";
import { Rocket, Shield, Zap, Users, Clock, Award, TrendingUp, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Rocket,
    title: "Инноваци",
    subtitle: "Дэвшилтэт технологи",
    description: "Хамгийн сүүлийн үеийн технологийг ашиглан үйлчлүүлэгчдийнхээ бизнесийг хөгжүүлнэ",
    stat: "100+",
    statLabel: "Төсөл",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    delay: 0,
  },
  {
    icon: Shield,
    title: "Аюулгүй байдал",
    subtitle: "Олон улсын стандарт",
    description: "Олон улсын аюулгүй байдлын стандартад нийцсэн системүүдийг хөгжүүлнэ",
    stat: "24/7",
    statLabel: "Хамгаалалт",
    gradient: "from-[#059669] to-[#34d399]",
    delay: 100,
  },
  {
    icon: Zap,
    title: "Хурдан хүргэлт",
    subtitle: "Цаг хугацааг хэмнэнэ",
    description: "Agile арга зүйгээр хурдан, үр дүнтэй шийдлүүдийг бүтээнэ",
    stat: "2x",
    statLabel: "Хурдан",
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    delay: 200,
  },
  {
    icon: Users,
    title: "Мэргэжлийн баг",
    subtitle: "Туршлагатай инженерүүд",
    description: "Тэргүүлэгч банкуудад ажиллаж байсан мэргэжилтнүүдийн баг",
    stat: "15+",
    statLabel: "Жилийн туршлага",
    gradient: "from-[#ec4899] to-[#f472b6]",
    delay: 300,
  },
];

const stats = [
  { value: "50+", label: "Харилцагчид", icon: Users },
  { value: "99.9%", label: "Uptime", icon: TrendingUp },
  { value: "5M+", label: "Гүйлгээ/сар", icon: Cpu },
  { value: "24/7", label: "Дэмжлэг", icon: Clock },
];

const FeatureCard = ({ reason, index }: { reason: (typeof reasons)[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${reason.delay}ms` }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${reason.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
      />

      {/* Card */}
      <div className="relative h-full p-8 rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-2">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-5`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity">
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${reason.gradient} blur-2xl animate-pulse`} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} p-0.5 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
          >
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
              <reason.icon className="w-7 h-7 text-foreground group-hover:text-white transition-colors duration-300" />
            </div>
          </div>

          {/* Text */}
          <span
            className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}
          >
            {reason.subtitle}
          </span>
          <h3 className="font-display text-2xl font-bold text-foreground mt-2 mb-3 group-hover:text-foreground transition-colors">
            {reason.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{reason.description}</p>

          {/* Stat */}
          <div className="flex items-end gap-3 pt-6 border-t border-border/50">
            <span
              className={`text-4xl font-display font-bold bg-gradient-to-r ${reason.gradient} bg-clip-text text-transparent`}
            >
              {reason.stat}
            </span>
            <span className="text-muted-foreground text-sm pb-1">{reason.statLabel}</span>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-r ${reason.gradient} opacity-10 group-hover:opacity-30 blur-2xl transition-all duration-500 group-hover:scale-150`}
        />
      </div>
    </div>
  );
};

export function WhyChooseUs() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="why-us">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
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
            Таны бизнесийг
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
                дараагийн түвшинд
              </span>
            </span>
          </h2>

          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Бид таны санааг бодит болгох, бизнесийг тэлэх инновацлаг шийдлүүдийг санал болгодог
          </p>
        </div>

        {/* Stats Bar */}
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

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <FeatureCard key={index} reason={reason} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />

          <div className="relative p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Бидэнтэй хамтран ажиллахад бэлэн үү?
              </h3>
              <p className="text-muted-foreground text-lg max-w-xl">
                Таны бизнесийн хэрэгцээнд тохирсон шийдлийг бид хамтдаа бүтээцгээе
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="gradient" size="xl" className="group">
                  Холбогдох
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  Үйлчилгээ үзэх
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
