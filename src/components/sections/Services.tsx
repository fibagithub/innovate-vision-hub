import { Link } from 'react-router-dom';
import { ArrowRight, Database, FileText, Smartphone, CreditCard, BarChart3, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainProducts = [
  {
    id: 'mecore',
    icon: Database,
    title: 'MeCore',
    subtitle: 'Core Banking System',
    description: 'БАНК, ББСБ, Лизинг болон ХЗХ зэрэг санхүүгийн үйлчилгээг үзүүлдэг байгууллагуудад зориулагдсан өдөр тутмын үйл ажиллагаа, данс хөтлөлт, гүйлгээ боловсруулалт.',
    features: ['Данс хөтлөлт', 'Гүйлгээ боловсруулалт', 'Тайлан'],
    gradient: 'from-[#193C69] to-[#2563eb]',
  },
  {
    id: 'melp',
    icon: FileText,
    title: 'MeLP',
    subtitle: 'Loan Processing System',
    description: 'Зээл олгох үйл явцыг автоматжуулах, хянах, удирдах зориулалттай MeCore системтэй бүрэн интеграци хийгдсэн.',
    features: ['Зээлийн хүсэлт', 'Скоринг', 'Батлах урсгал'],
    gradient: 'from-[#7c3aed] to-[#c026d3]',
  },
  {
    id: 'meapp',
    icon: Smartphone,
    title: 'MeAPP',
    subtitle: 'Mobile Banking App',
    description: 'ХЗХ болон ББСБ-н гишүүд харилцагч нарыг онлайнаар үйлчилгээ авах боломжийг олгох мобайл шийдэл.',
    features: ['Шилжүүлэг', 'Зээлийн хүсэлт', 'Мэдэгдэл'],
    gradient: 'from-[#059669] to-[#10b981]',
    externalLink: 'https://me.fiba.mn/',
  },
];

const supportingProducts = [
  {
    id: 'smartware',
    icon: CreditCard,
    title: 'SmartWare',
    subtitle: 'Card Terminal System',
    description: 'EMV стандарт бүхий VISA, MASTER CARD, UnionPay, T CARD хүлээн авах терминал систем.',
  },
  {
    id: 'sainscore',
    icon: BarChart3,
    title: 'SainScore',
    subtitle: 'Credit Information System',
    description: 'ТИТАН Си Ар Эй Зээлийн мэдээллийн сан компанийн захиалгаар хөгжүүлсэн систем.',
    externalLink: 'https://sainscore.mn/',
  },
];

const consultingServices = [
  'Картын төлбөр тооцооны систем',
  'Wallet үйлчилгээний систем',
  'Системийн интеграци',
  'AI Credit Scoring',
];

export function Services() {
  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden" id="products">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Technology Solutions</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Дараа үеийн<br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              Санхүүгийн Технологи
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн шийдлүүд
          </p>
        </div>

        {/* Main Products - Innovative Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainProducts.map((product, index) => {
            const CardContent = (
              <div className="group relative h-full">
                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-2">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Number Badge */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center">
                    <span className="font-display font-bold text-muted-foreground/60">0{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <product.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <p className="text-xs font-semibold tracking-wider text-primary/70 uppercase mb-2">
                      {product.subtitle}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-primary font-semibold text-sm">
                      <span className="mr-2">Дэлгэрэнгүй</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );

            return product.externalLink ? (
              <a key={product.id} href={product.externalLink} target="_blank" rel="noopener noreferrer" className="block">
                {CardContent}
              </a>
            ) : (
              <Link key={product.id} to={`/services/${product.id}`}>
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* Supporting Products - Horizontal Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {supportingProducts.map((product) => {
            const CardContent = (
              <div className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                    <product.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-wider text-primary/60 uppercase mb-1">
                      {product.subtitle}
                    </p>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            );

            return product.externalLink ? (
              <a key={product.id} href={product.externalLink} target="_blank" rel="noopener noreferrer">
                {CardContent}
              </a>
            ) : (
              <div key={product.id}>{CardContent}</div>
            );
          })}
        </div>

        {/* Consulting Services - Modern Layout */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border/50 p-10 lg:p-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs uppercase tracking-wider">Consulting</span>
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Зөвлөх үйлчилгээ
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Банкны суурь бүртгэлийн систем, төлбөрийн картын систем, мөн банктай интеграци хийхтэй холбоотой мэргэжлийн зөвлөгөө.
              </p>
              <Link to="/services">
                <Button variant="gradient" size="lg">
                  Бүх үйлчилгээ үзэх
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {consultingServices.map((service, index) => (
                <div 
                  key={index} 
                  className="group p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <span className="font-display font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-foreground font-medium text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}