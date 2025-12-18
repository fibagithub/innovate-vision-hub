import { Link } from 'react-router-dom';
import { ArrowRight, Database, FileText, Smartphone, CreditCard, BarChart3, Users, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainProducts = [
  {
    id: 'mecore',
    icon: Database,
    title: 'MeCore',
    subtitle: 'Core Banking System',
    description: 'БАНК, ББСБ, Лизинг болон ХЗХ зэрэг санхүүгийн үйлчилгээг үзүүлдэг байгууллагуудад зориулагдсан өдөр тутмын үйл ажиллагаа.',
    features: ['Данс хөтлөлт', 'Гүйлгээ боловсруулалт', 'Тайлан'],
    gradient: 'from-primary to-[#2563eb]',
    stats: '50+ байгууллага',
  },
  {
    id: 'melp',
    icon: FileText,
    title: 'MeLP',
    subtitle: 'Loan Processing System',
    description: 'Зээл олгох үйл явцыг автоматжуулах, хянах, удирдах зориулалттай систем.',
    features: ['Зээлийн хүсэлт', 'Скоринг', 'Батлах урсгал'],
    gradient: 'from-[#7c3aed] to-[#a855f7]',
    stats: '100K+ зээл',
  },
  {
    id: 'meapp',
    icon: Smartphone,
    title: 'MeAPP',
    subtitle: 'Mobile Banking App',
    description: 'ХЗХ болон ББСБ-н гишүүд харилцагч нарыг онлайнаар үйлчилгээ авах боломжийг олгох.',
    features: ['Шилжүүлэг', 'Зээлийн хүсэлт', 'Мэдэгдэл'],
    gradient: 'from-[#059669] to-[#34d399]',
    stats: '10K+ хэрэглэгч',
    externalLink: 'https://me.fiba.mn/',
  },
];

const supportingProducts = [
  {
    id: 'smartware',
    icon: CreditCard,
    title: 'SmartWare',
    subtitle: 'Card Terminal',
    description: 'EMV стандарт бүхий VISA, MASTER CARD, UnionPay терминал.',
  },
  {
    id: 'sainscore',
    icon: BarChart3,
    title: 'SainScore',
    subtitle: 'Credit Information',
    description: 'ТИТАН Си Ар Эй Зээлийн мэдээллийн систем.',
    externalLink: 'https://sainscore.mn/',
  },
];

const consultingServices = [
  { title: 'Картын систем', icon: CreditCard },
  { title: 'Wallet үйлчилгээ', icon: Globe },
  { title: 'Системийн интеграци', icon: Zap },
  { title: 'AI Credit Scoring', icon: Shield },
];

export function Services() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="products">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-radial from-primary/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-gradient-radial from-accent/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-medium text-sm tracking-wide">Technology Solutions</span>
          </div>
          
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
            Дараа үеийн
            <span className="block mt-2 bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              Санхүүгийн Технологи
            </span>
          </h2>
          
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн шийдлүүд
          </p>
        </div>

        {/* Bento Grid - Main Products */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 mb-8">
          {/* Featured Product - MeCore */}
          <div className="col-span-12 lg:col-span-7">
            <Link to={`/services/${mainProducts[0].id}`} className="block h-full">
              <div className="group relative h-full min-h-[420px] p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br from-primary/5 via-card to-card border border-border/50 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 border border-primary/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 border border-primary/5 rounded-full group-hover:scale-110 transition-transform duration-1000" />
                
                <div className="relative h-full flex flex-col">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mainProducts[0].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Database className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-primary/60 uppercase">{mainProducts[0].subtitle}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-primary">{mainProducts[0].stats}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {mainProducts[0].title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
                      {mainProducts[0].description}
                    </p>
                    
                    {/* Features Pills */}
                    <div className="flex flex-wrap gap-2">
                      {mainProducts[0].features.map((feature, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-foreground/80">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-3 text-primary font-semibold mt-8">
                    <span>Дэлгэрэнгүй үзэх</span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* MeLP */}
          <div className="col-span-12 lg:col-span-5">
            <Link to={`/services/${mainProducts[1].id}`} className="block h-full">
              <div className="group relative h-full min-h-[420px] p-8 rounded-[2rem] bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/20">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mainProducts[1].gradient}`} />
                
                <div className="relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mainProducts[1].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-muted-foreground/60">02</span>
                  </div>
                  
                  <span className="text-xs font-bold tracking-widest text-[#7c3aed]/70 uppercase mb-2">{mainProducts[1].subtitle}</span>
                  <h3 className="font-display text-3xl font-bold text-foreground mb-3 group-hover:text-[#7c3aed] transition-colors">
                    {mainProducts[1].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {mainProducts[1].description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/50">
                    <Sparkles className="w-4 h-4 text-[#7c3aed]" />
                    <span className="text-sm font-semibold text-[#7c3aed]">{mainProducts[1].stats}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* MeAPP */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <a href={mainProducts[2].externalLink} target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="group relative h-full min-h-[300px] p-8 rounded-[2rem] bg-gradient-to-br from-[#059669]/10 via-card to-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-[#059669]/30">
                <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-[#059669]/20 to-transparent rounded-full blur-2xl" />
                
                <div className="relative h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mainProducts[2].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#059669]/70 uppercase">{mainProducts[2].subtitle}</span>
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-[#059669] transition-colors">
                        {mainProducts[2].title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {mainProducts[2].description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#059669]" />
                      <span className="text-sm font-semibold text-[#059669]">{mainProducts[2].stats}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#059669] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          {/* Supporting Products */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-4">
            {supportingProducts.map((product) => {
              const CardContent = (
                <div className="group relative h-full min-h-[140px] p-6 rounded-2xl bg-card border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                      <product.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold tracking-widest text-primary/50 uppercase">{product.subtitle}</span>
                      <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {product.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              );

              return product.externalLink ? (
                <a key={product.id} href={product.externalLink} target="_blank" rel="noopener noreferrer" className="block">
                  {CardContent}
                </a>
              ) : (
                <div key={product.id}>{CardContent}</div>
              );
            })}
          </div>
        </div>

        {/* Consulting Services - Innovative Layout */}
        <div className="relative mt-16 rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

          <div className="relative p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-white/90 font-medium text-sm">Consulting Services</span>
                </div>
                
                <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Зөвлөх<br />үйлчилгээ
                </h3>
                
                <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
                  Банкны суурь систем, төлбөрийн картын систем, интеграцитай холбоотой мэргэжлийн зөвлөгөө үйлчилгээ.
                </p>
                
                <Link to="/services">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    Бүх үйлчилгээ үзэх
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {consultingServices.map((service, index) => (
                  <div 
                    key={index} 
                    className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-semibold">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
