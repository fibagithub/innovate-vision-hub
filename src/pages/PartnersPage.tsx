import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const partners = [
  { id: 1, name: 'Microsoft', logo: 'M', description: 'Gold Cloud Partner', tier: 'Strategic' },
  { id: 2, name: 'Google Cloud', logo: 'G', description: 'Premier Partner', tier: 'Strategic' },
  { id: 3, name: 'Amazon AWS', logo: 'A', description: 'Advanced Partner', tier: 'Strategic' },
  { id: 4, name: 'IBM', logo: 'I', description: 'Business Partner', tier: 'Technology' },
  { id: 5, name: 'Oracle', logo: 'O', description: 'Cloud Partner', tier: 'Technology' },
  { id: 6, name: 'Salesforce', logo: 'S', description: 'Implementation Partner', tier: 'Technology' },
  { id: 7, name: 'SAP', logo: 'S', description: 'Silver Partner', tier: 'Technology' },
  { id: 8, name: 'Cisco', logo: 'C', description: 'Select Partner', tier: 'Infrastructure' },
];

const clients = [
  { sector: 'Fortune 500', count: '25+', description: 'Leading global corporations trust our expertise' },
  { sector: 'Government', count: '15+', description: 'Government agencies and public sector organizations' },
  { sector: 'Healthcare', count: '30+', description: 'Hospitals, clinics, and healthcare providers' },
  { sector: 'Finance', count: '20+', description: 'Banks, insurance companies, and fintech startups' },
  { sector: 'Education', count: '40+', description: 'Universities, schools, and EdTech companies' },
  { sector: 'Retail', count: '35+', description: 'E-commerce and brick-and-mortar retailers' },
];

const testimonials = [
  {
    quote: "FIBA Tech transformed our entire digital infrastructure. Their expertise and dedication exceeded our expectations.",
    author: "John Smith",
    role: "CTO, Global Finance Corp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Working with FIBA Tech was a game-changer for our AI initiatives. They delivered beyond what we thought possible.",
    author: "Amanda Lee",
    role: "VP of Innovation, HealthTech Inc",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    quote: "Their cybersecurity solutions gave us peace of mind. Professional, thorough, and always available when we need them.",
    author: "Robert Chen",
    role: "CISO, Enterprise Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
];

const PartnersPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Partners & Clients
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-xl text-background/70 max-w-2xl mx-auto">
              We partner with the world's leading technology companies to deliver best-in-class solutions to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Technology Partners
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Strategic Alliances
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <span className="font-display text-3xl font-bold text-foreground">
                    {partner.logo}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{partner.description}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                  {partner.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Sectors */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Clients
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Serving Diverse Industries
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="p-8 rounded-2xl bg-card border border-border">
                <div className="font-display text-4xl font-bold text-primary mb-2">{client.count}</div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{client.sector}</h3>
                <p className="text-muted-foreground">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-card border border-border">
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-background mb-6">
              Become a Partner
            </h2>
            <p className="text-xl text-background/70 mb-8">
              Join our ecosystem of technology partners and unlock new opportunities for growth.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Partner With Us
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnersPage;
