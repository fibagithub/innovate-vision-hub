import { Link } from 'react-router-dom';
import { Target, Eye, Lightbulb, ArrowRight, Award, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Target,
    title: 'Бидний эрхэм зорилго',
    description: 'Банк санхүүгийн байгууллагуудад дэлхийн жишигт нийцсэн, найдвартай, хэрэглэхэд хялбар технологийн шийдэл бүтээх.',
  },
  {
    icon: Eye,
    title: 'Бидний алсын хараа',
    description: 'Монголын санхүүгийн салбарын технологийн тэргүүлэгч компани болж, олон улсын зах зээлд гарах.',
  },
  {
    icon: Lightbulb,
    title: 'Бидний үнэт зүйлс',
    description: 'Мэргэжлийн ёс зүй, найдвартай байдал, тасралтгүй хөгжил, харилцагчийн сэтгэл ханамж бидний үнэт зүйлс.',
  },
];

const features = [
  {
    icon: Award,
    title: 'Туршлага',
    description: 'Тэргүүлэгч банкны олон жилийн туршлагад суурилагдан бүтээгдсэн',
  },
  {
    icon: Shield,
    title: '24/7 Найдвартай',
    description: 'Найдвартай ажиллагаа, мэдээллийн аюулгүй байдлыг хангасан',
  },
  {
    icon: Users,
    title: 'Мэргэжлийн дэмжлэг',
    description: 'Мэргэжлийн өндөр түвшний ашиглалт үйлчилгээ үзүүлдэг',
  },
];

export function About() {
  return (
    <section className="py-24 bg-muted/50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              Бидний тухай
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Таны санааг бид{' '}
              <span className="gradient-text">Бодит болгоно</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Манай компани нь 2009 онд байгуулагдсан бөгөөд, банк санхүүгийн Програм хангамж, түүний шийдэл, мэдээллийн сан зохион байгуулах, төлбөр тооцооны шийдэл боловсруулах чиглэлээр үйл ажиллагаа явуулдаг.
            </p>
            <p className="text-muted-foreground mb-8">
              Мөн банк санхүүгийн мэдээллийн систем, Програм хангамж, мэдээллийн сан болон түүний нууцлал аюулгүй байдлыг хариуцан ажиллаж байсан тухайн салбартаа олон жилийн мэдлэг туршлага хуримтлуулсан чадварлаг, бүтээлч хамт олноос бүрдэж байна.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-xl bg-card border border-border">
                  <feature.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground text-xs">{feature.description}</p>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="gradient" size="lg">
                Дэлгэрэнгүй үзэх
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 lg:p-12">
              <div className="w-full h-full rounded-2xl bg-card border border-border shadow-elevated flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-primary-foreground">F</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">FIBA LLC</h3>
                  <p className="text-muted-foreground mb-4">2009 оноос</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-primary text-sm font-medium">fiba.mn</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-soft transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
