import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const partners = [
  { id: 1, name: 'Microsoft', logo: 'M' },
  { id: 2, name: 'Google Cloud', logo: 'G' },
  { id: 3, name: 'Amazon AWS', logo: 'A' },
  { id: 4, name: 'IBM', logo: 'I' },
  { id: 5, name: 'Oracle', logo: 'O' },
  { id: 6, name: 'Salesforce', logo: 'S' },
  { id: 7, name: 'SAP', logo: 'S' },
  { id: 8, name: 'Cisco', logo: 'C' },
];

const clients = [
  'Fortune 500 Companies',
  'Government Agencies',
  'Healthcare Organizations',
  'Financial Institutions',
  'Educational Institutions',
  'Retail Enterprises',
];

export function Partners() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Partners & Clients
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            We partner with the world's leading technology companies to deliver best-in-class solutions to our clients.
          </p>
        </div>

        {/* Partners Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="aspect-square rounded-2xl bg-card border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-soft transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <span className="font-display text-2xl font-bold text-foreground">
                  {partner.logo}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Types */}
        <div className="bg-card rounded-3xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Serving Diverse Industries
              </h3>
              <p className="text-muted-foreground mb-6">
                Our solutions have helped organizations across various sectors achieve their digital transformation goals.
              </p>
              <Link to="/partners">
                <Button variant="gradient">
                  View All Partners
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                  <span className="text-foreground font-medium">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
