import { Layout } from '@/components/layout/Layout';
import { Target, Eye, Lightbulb, Award, Users, Globe, TrendingUp, Zap } from 'lucide-react';

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
    title: 'Innovation First',
    description: 'We constantly push boundaries, exploring emerging technologies to deliver cutting-edge solutions that keep our clients ahead of the curve.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in everything we do, from code quality to client communication, ensuring exceptional outcomes every time.',
  },
];

const milestones = [
  { year: '2014', title: 'Founded', description: 'FIBA Tech was established with a vision to transform businesses through technology.' },
  { year: '2016', title: 'First 50 Clients', description: 'Reached our first major milestone of 50 enterprise clients.' },
  { year: '2018', title: 'Global Expansion', description: 'Opened offices in Europe and Asia to serve our international clients.' },
  { year: '2020', title: 'AI Division', description: 'Launched our dedicated AI and Machine Learning division.' },
  { year: '2022', title: '200+ Projects', description: 'Successfully delivered over 200 projects across various industries.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as an industry leader in technology consulting.' },
];

const stats = [
  { icon: Users, value: '50+', label: 'Expert Team Members' },
  { icon: Globe, value: '30+', label: 'Countries Served' },
  { icon: TrendingUp, value: '200+', label: 'Projects Completed' },
  { icon: Zap, value: '99%', label: 'Client Satisfaction' },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              About FIBA Tech
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
              Pioneering Digital Excellence Since 2014
            </h1>
            <p className="text-xl text-background/70 max-w-2xl mx-auto">
              We are a technology company dedicated to transforming businesses through innovation, expertise, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border border-border text-center shadow-soft">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Building the Future of Technology
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2014, FIBA Tech began as a small team of passionate technologists with a shared vision: to help businesses harness the power of technology for growth and innovation.
                </p>
                <p>
                  Over the years, we've grown into a leading technology consultancy, serving clients across 30+ countries. Our success is built on our commitment to understanding each client's unique challenges and delivering tailored solutions that drive real results.
                </p>
                <p>
                  Today, our team of 50+ experts brings together diverse skills in cloud computing, artificial intelligence, cybersecurity, and digital transformation. We continue to push the boundaries of what's possible, helping our clients stay ahead in an ever-evolving digital landscape.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="w-full h-full rounded-2xl bg-card border border-border shadow-elevated flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                      <span className="text-5xl font-display font-bold text-primary-foreground">F</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold text-foreground mb-2">FIBA Tech</h3>
                    <p className="text-muted-foreground">Est. 2014</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Key Milestones
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                      <span className="text-primary font-display font-bold text-lg">{milestone.year}</span>
                      <h3 className="font-display font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
