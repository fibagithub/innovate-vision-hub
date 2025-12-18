import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientTypes = [
  { icon: Landmark, label: 'Арилжааны банкууд' },
  { icon: Building2, label: 'ББСБ' },
  { icon: Users, label: 'Хадгаламж зээлийн хоршоод' },
  { icon: Briefcase, label: 'Лизингийн компаниуд' },
];

const achievements = [
  {
    number: '4+',
    label: 'Банканд систем нэвтрүүлсэн',
  },
  {
    number: '50+',
    label: 'ХЗХ, ББСБ-д үйлчилгээ үзүүлсэн',
  },
  {
    number: '15+',
    label: 'Жилийн туршлага',
  },
  {
    number: '100%',
    label: 'Харилцагчийн сэтгэл ханамж',
  },
];

export function Partners() {
  return (
    <section className="py-24 bg-muted/50" id="clients">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Харилцагчид
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Харилцагчийн сэтгэл ханамж <span className="gradient-text">бодит үр дүн</span> бидний нэрийн хуудас
          </h2>
          <p className="text-muted-foreground text-lg">
            Харилцагч нартаа хамгийн чанартай бүтээгдэхүүн үйлчилгээ үзүүлэхийг бид хичээн ажиллаж байна.
          </p>
        </div>

        {/* Client Types Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {clientTypes.map((client, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <client.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="font-display font-semibold text-foreground">
                {client.label}
              </span>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-3xl border border-border p-8 lg:p-12 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {achievement.number}
                </div>
                <p className="text-muted-foreground">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Яагаад биднийг сонгох вэ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Манай системүүд нь олон улсын стандартад нийцсэн, найдвартай, хэрэглэхэд хялбар, тасралтгүй хөгжүүлэлт хийгддэг давуу талтай.
              </p>
              <Link to="/partners">
                <Button variant="gradient">
                  Дэлгэрэнгүй мэдээлэл
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                'Олон улсын жишигт нийцсэн',
                '24/7 Техникийн дэмжлэг',
                'Тасралтгүй хөгжүүлэлт',
                'Мэргэжлийн баг',
                'Найдвартай аюулгүй',
                'Хялбар интеграци',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
