import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="container relative z-10 px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">FIBA LLC - 2009 оноос</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Бид шалтгааныг ойлгоход анхаардаг учраас{' '}
            <span className="gradient-text">бодит үр дүн</span>{' '}
            гаргадаг
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-background/70 max-w-3xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Банк санхүүгийн програм хангамж, төлбөр тооцооны систем, мэдээллийн сан зохион байгуулах чиглэлээр 15+ жилийн туршлагатай мэргэжлийн баг
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Link to="/services">
              <Button variant="hero" size="xl" className="group">
                Бүтээгдэхүүн үзэх
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="hero-outline" size="xl" className="group">
                <Play size={18} className="mr-1" />
                Бидний тухай
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-background/10 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { value: '15+', label: 'Жилийн туршлага' },
              { value: '4+', label: 'Банканд хамтран ажилласан' },
              { value: '12+', label: 'Мэргэжлийн баг' },
              { value: '100%', label: 'Харилцагчийн сэтгэл ханамж' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-background mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-background/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
