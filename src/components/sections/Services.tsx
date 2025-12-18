import { Link } from 'react-router-dom';
import { ArrowRight, Database, FileText, Smartphone, CreditCard, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainProducts = [
  {
    id: 'mecore',
    icon: Database,
    title: 'MeCore System',
    subtitle: 'Суурь бүртгэлийн систем',
    description: 'БАНК, ББСБ, Лизинг болон ХЗХ зэрэг санхүүгийн үйлчилгээг үзүүлдэг байгууллагуудад зориулагдсан өдөр тутмын үйл ажиллагаа, данс хөтлөлт, гүйлгээ боловсруулалт, бүтээгдэхүүнд суурилсан санхүүгийн бүртгэлийн цөм систем.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'melp',
    icon: FileText,
    title: 'MeLP System',
    subtitle: 'Зээлийн боловсруулалтын систем',
    description: 'Зээл олгох үйл явцыг автоматжуулах, хянах, удирдах зориулалттай MeCore системтэй бүрэн интеграци хийгдсэн зээлийн үйл ажиллагааны систем.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'meapp',
    icon: Smartphone,
    title: 'MeAPP Application',
    subtitle: 'Мобайл аппликейшн',
    description: 'ХЗХ болон ББСБ-н гишүүд харилцагч нарыг онлайнаар үйлчилгээ авах боломжийг олгож уг салбарын өрсөлдөх чадварт дэмжлэг үзүүлэх шийдэл.',
    color: 'from-green-500 to-emerald-500',
    externalLink: 'https://me.fiba.mn/',
  },
];

const supportingProducts = [
  {
    id: 'smartware',
    icon: CreditCard,
    title: 'SmartWare',
    description: 'Банкны теллерээс төлбөрийн картаараа бэлэн мөнгө авах, тушаах, ПИН код солих зэрэг үйлчилгээнд зориулагдсан EMV стандарт бүхий VISA, MASTER CARD, UnionPay, T CARD хүлээн авах терминал систем.',
  },
  {
    id: 'sainscore',
    icon: BarChart3,
    title: 'SainScore',
    description: 'ТИТАН Си Ар Эй Зээлийн мэдээллийн сан компанийн захиалгаар хөгжүүлсэн зээлийн мэдээллийн иж бүрэн систем.',
    externalLink: 'https://sainscore.mn/',
  },
];

const consultingServices = [
  'Дотоодын 3-н банканд Картын төлбөр тооцооны систем нэвтрүүлэхэд зөвлөх үйлчилгээ',
  'Wallet үйлчилгээний систем боловсруулах, нэвтрүүлэх ажилд зөвлөх үйлчилгээ',
  'Банкны үндсэн системийг төлбөр тооцооны бусад системтэй интеграци хийх ажилд зөвлөх үйлчилгээ',
  'AI Credit Scoring систем боловсруулах ажилд зөвлөх үйлчилгээ',
];

export function Services() {
  return (
    <section className="py-24 bg-background" id="products">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Бүтээгдэхүүн
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Банк Санхүүгийн Технологийн Шийдлүүд
          </h2>
          <p className="text-muted-foreground text-lg">
            Олон жилийн туршлагад суурилсан, олон улсын стандартад нийцсэн програм хангамжийн шийдлүүд
          </p>
        </div>

        {/* Main Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainProducts.map((product, index) => {
            const CardContent = (
              <div
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <product.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {product.subtitle}
                </p>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary font-medium mt-auto">
                  <span className="mr-2">Дэлгэрэнгүй</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
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

        {/* Supporting Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {supportingProducts.map((product) => {
            const CardContent = (
              <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
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

        {/* Consulting Services */}
        <div className="bg-card rounded-3xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Зөвлөх үйлчилгээ
              </h3>
              <p className="text-muted-foreground mb-6">
                Манай байгууллага нь банкны суурь бүртгэлийн систем, төлбөрийн картын систем, мөн банктай интеграци хийхтэй холбоотой зөвлөх үйлчилгээ буюу шийдэл боловсруулдаг.
              </p>
            </div>

            <div className="space-y-4">
              {consultingServices.map((service, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-primary" viewBox="0 0 512 512">
                      <path fill="currentColor" d="m433.1 67.1-231.8 231.9c-6.2 6.2-16.4 6.2-22.6 0l-99.8-99.8-78.9 78.8 150.5 150.5c10.5 10.5 24.6 16.3 39.4 16.3 14.8 0 29-5.9 39.4-16.3l282.7-282.5z" />
                    </svg>
                  </div>
                  <span className="text-foreground text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="gradient" size="lg">
              Бүх бүтээгдэхүүн үзэх
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
