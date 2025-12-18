import { Link } from 'react-router-dom';
import { Target, Eye, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage in the digital era.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be the leading technology partner for businesses worldwide, recognized for excellence in innovation, quality, and client success.',
  },
  {
    icon: Lightbulb,
    title: 'Our Values',
    description: 'Innovation, integrity, collaboration, and excellence guide everything we do. We believe in building lasting partnerships with our clients.',
  },
];

export function About() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pioneering Digital Excellence Since 2014
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              FIBA Tech is a leading technology company specializing in delivering cutting-edge solutions that transform businesses. With over a decade of experience, we've helped hundreds of organizations navigate their digital transformation journey.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of experts combines deep technical expertise with industry knowledge to create solutions that not only meet today's challenges but anticipate tomorrow's opportunities.
            </p>
            <Link to="/about">
              <Button variant="gradient" size="lg">
                Learn More About Us
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 lg:p-12">
              <div className="w-full h-full rounded-2xl bg-card border border-border shadow-elevated flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                    <span className="text-4xl font-display font-bold text-primary-foreground">F</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">FIBA Tech</h3>
                  <p className="text-muted-foreground">Technology Excellence</p>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
