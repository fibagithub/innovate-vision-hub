import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Brain, Shield, Smartphone, Database, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services to modernize your business operations.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent automation and predictive analytics to drive data-driven decisions.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets and data.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Engineering',
    description: 'Data pipeline development, warehousing, and business intelligence solutions.',
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 'consulting',
    icon: Settings,
    title: 'IT Consulting',
    description: 'Strategic technology consulting to align IT with your business goals.',
    color: 'from-indigo-500 to-violet-500',
  },
];

export function Services() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From cloud infrastructure to AI-powered solutions, we deliver end-to-end technology services that drive innovation and growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center text-primary font-medium">
                <span className="mr-2">Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="gradient" size="lg">
              View All Services
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
