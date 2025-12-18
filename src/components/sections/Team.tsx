import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 20+ years in technology innovation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Expert in cloud architecture and AI systems.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'VP of Engineering',
    bio: 'Leads our world-class engineering team.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Head of Product',
    bio: 'Product strategist focused on user-centric design.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
];

export function Team() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet the Experts Behind the Innovation
          </h2>
          <p className="text-muted-foreground text-lg">
            Our talented team brings together diverse expertise and a shared passion for technology excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-2">
                  <a
                    href={member.linkedin}
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={member.twitter}
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@fibatech.com`}
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/team">
            <Button variant="gradient" size="lg">
              View Full Team
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
