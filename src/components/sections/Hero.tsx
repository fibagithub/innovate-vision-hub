import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Gradient orbs - very subtle */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="container relative z-10 px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">FIBA LLC — 2021 оноос</span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Бид шалтгааныг ойлгоход
            <br />
            анхаардаг учраас <span className="gradient-text">бодит үр дүн</span> гаргадаг
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Банк санхүүгийн програм хангамж, төлбөр тооцооны систем, мэдээллийн сан зохион байгуулах чиглэлээр 15+
            жилийн туршлагатай мэргэжлийн баг
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/services">
              <Button size="xl" className="group shadow-soft hover:shadow-glow transition-all duration-300">
                Бүтээгдэхүүн үзэх
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl" className="group">
                Бидний тухай
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-24 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "15+", label: "Жилийн туршлага" },
              { value: "13+", label: "Мэргэжлийн баг" },
              { value: "99.9%", label: "Харилцагчийн сэтгэл ханамж" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-md transition-all duration-300"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
