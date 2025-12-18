import { Layout } from '@/components/layout/Layout';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 20+ years in technology innovation. Sarah founded FIBA Tech with a mission to transform businesses through cutting-edge solutions.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'Expert in cloud architecture and AI systems. Michael leads our technical strategy and ensures we stay at the forefront of technology.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'VP of Engineering',
    bio: 'Leads our world-class engineering team. Emily brings 15 years of experience building scalable systems for Fortune 500 companies.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Head of Product',
    bio: 'Product strategist focused on user-centric design. David ensures our solutions truly meet client needs and exceed expectations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Chief Marketing Officer',
    bio: 'Strategic marketing leader with a passion for technology storytelling. Lisa drives our brand and market positioning.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Head of Data Science',
    bio: 'PhD in Machine Learning with expertise in building AI solutions that deliver real business value.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 7,
    name: 'Maria Garcia',
    role: 'Director of Client Success',
    bio: 'Dedicated to ensuring client satisfaction and long-term partnerships. Maria leads our customer success initiatives.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 8,
    name: 'Robert Taylor',
    role: 'Security Architect',
    bio: 'Cybersecurity expert with 12 years protecting enterprise systems. Robert ensures our solutions meet the highest security standards.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    linkedin: '#',
    twitter: '#',
  },
];

const TeamPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Team
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
              Meet the Experts Behind the Innovation
            </h1>
            <p className="text-xl text-background/70 max-w-2xl mx-auto">
              Our talented team brings together diverse expertise and a shared passion for technology excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
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
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
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
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join Our Team
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals who are passionate about technology and innovation.
            </p>
            <a
              href="/careers"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium transition-opacity hover:opacity-90"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
