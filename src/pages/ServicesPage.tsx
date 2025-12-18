import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, Cloud, Brain, Shield, Smartphone, Database, Settings, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Solutions',
    shortDesc: 'Scalable cloud infrastructure and migration services.',
    description: 'Transform your IT infrastructure with our comprehensive cloud solutions. We help businesses migrate, optimize, and manage their cloud environments for maximum efficiency and scalability.',
    features: [
      'Cloud Migration & Strategy',
      'Multi-cloud Architecture',
      'Serverless Computing',
      'Cloud Cost Optimization',
      'DevOps & CI/CD Pipelines',
      '24/7 Cloud Monitoring',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Machine Learning',
    shortDesc: 'Intelligent automation and predictive analytics.',
    description: 'Harness the power of artificial intelligence to transform your business operations. Our AI solutions help you automate processes, gain insights, and make data-driven decisions.',
    features: [
      'Custom AI Model Development',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'Predictive Analytics',
      'AI Chatbots & Virtual Assistants',
      'Machine Learning Operations (MLOps)',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Cybersecurity',
    shortDesc: 'Comprehensive security solutions for your digital assets.',
    description: 'Protect your organization with our enterprise-grade cybersecurity solutions. We provide end-to-end security services to safeguard your data, systems, and reputation.',
    features: [
      'Security Assessments & Audits',
      'Threat Detection & Response',
      'Identity & Access Management',
      'Data Encryption & Protection',
      'Security Compliance (SOC2, GDPR)',
      'Security Awareness Training',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Development',
    shortDesc: 'Native and cross-platform mobile applications.',
    description: 'Create engaging mobile experiences that your users will love. We build high-performance mobile applications for iOS and Android using the latest technologies.',
    features: [
      'Native iOS & Android Apps',
      'Cross-Platform Development',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Mobile Backend Development',
      'App Maintenance & Support',
    ],
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Engineering',
    shortDesc: 'Data pipeline development and business intelligence.',
    description: 'Turn your data into a strategic asset. Our data engineering services help you build robust data infrastructure and derive actionable insights from your data.',
    features: [
      'Data Pipeline Architecture',
      'Data Warehouse Solutions',
      'Real-time Data Processing',
      'Business Intelligence & Reporting',
      'Data Quality Management',
      'Big Data Solutions',
    ],
    color: 'from-red-500 to-rose-500',
  },
  {
    id: 'consulting',
    icon: Settings,
    title: 'IT Consulting',
    shortDesc: 'Strategic technology consulting for business growth.',
    description: 'Navigate digital transformation with expert guidance. Our consultants help you align technology with business objectives and develop winning digital strategies.',
    features: [
      'Digital Transformation Strategy',
      'Technology Assessment',
      'IT Roadmap Development',
      'Vendor Selection & Management',
      'Process Optimization',
      'Change Management',
    ],
    color: 'from-indigo-500 to-violet-500',
  },
];

const ServicesPage = () => {
  const { serviceId } = useParams();
  const service = serviceId ? services.find(s => s.id === serviceId) : null;

  if (service) {
    return (
      <Layout>
        {/* Service Detail Header */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
          <div className="container mx-auto px-4">
            <Link to="/services" className="inline-flex items-center text-background/60 hover:text-background mb-8 transition-colors">
              <ArrowLeft className="mr-2" size={18} />
              Back to Services
            </Link>
            <div className="max-w-4xl">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8`}>
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-background/70 max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  What We Offer
                </h2>
                <div className="space-y-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-3xl border border-border p-8 lg:p-12">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-8">
                  Contact our team to discuss how our {service.title.toLowerCase()} can help transform your business.
                </p>
                <Link to="/contact">
                  <Button variant="gradient" size="lg" className="w-full">
                    Contact Us
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
              Explore Other Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(s => s.id !== serviceId).slice(0, 3).map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.shortDesc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Services List Page
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6">
              Comprehensive Technology Solutions
            </h1>
            <p className="text-xl text-background/70 max-w-2xl mx-auto">
              From cloud infrastructure to AI-powered solutions, we deliver end-to-end technology services that drive innovation and growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.shortDesc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-primary font-medium">
                  <span className="mr-2">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our experts are here to help you identify the right solutions for your business challenges.
            </p>
            <Link to="/contact">
              <Button variant="gradient" size="lg">
                Schedule a Consultation
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
