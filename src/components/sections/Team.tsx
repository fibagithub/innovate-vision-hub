import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    id: 1,
    name: 'Ичинноров Орхонхүү',
    role: 'Төслийн удирдлага',
    bio: 'Төлбөр тооцооны систем, Банкны систем, 20 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Цэвээндорж Цэнгэл',
    role: 'Мэдээллийн системийн мэргэжилтэн',
    bio: 'Банк санхүүгийн мэдээллийн систем, Мэдээллийн сан, Төлбөрийн карт, цахим банк 19 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Лочинжалбуу Хатанбаатар',
    role: 'Систем анализ',
    bio: 'Систем анализ, Дата төв зохион байгуулах, Төлбөрийн картын систем, 16 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Цэндсүрэн Мөнх-эрдэнэ',
    role: 'Програм хангамж хөгжүүлэлт',
    bio: 'Програм хангамж хөгжүүлэх, Асуудал шийдвэрлэх, Алгоритм загварчлал, 17-н жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Жамьянсүрэн Ичинхорлоо',
    role: 'Системийн шинжээч',
    bio: 'Төлбөр тооцооны систем, Банкны систем, 14 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Баасандорж Адъяасүрэн',
    role: 'Системийн администратор',
    bio: 'Системийн администратор, Төслийн менежер, Систем аналист 10-дах жилдээ ажиллаж байна.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 7,
    name: 'Сайнбуян Мөнхтулга',
    role: 'Програм хангамжийн инженер',
    bio: 'Банк санхүүгийн програм хангамж, Вебсайт болон Веб аппликейшн хөгжүүлэх чиглэлээр 6-дах жилдээ ажиллаж байна.',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 8,
    name: 'Отгонбаатар Ихбаяр',
    role: 'Веб хөгжүүлэгч',
    bio: 'Вебсайт, Веб аппликейшн хөгжүүлэлт болон мэдээллийн аюулгүй байдлын чиглэлээр 5-дах жилдээ ажиллаж байна.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face',
  },
];

export function Team() {
  return (
    <section className="py-24 bg-background" id="team">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Манай хамт олон
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Манай <span className="gradient-text">хамт олон</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Банк санхүүгийн салбарт олон жилийн туршлагатай мэргэжлийн багийн гишүүд
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.slice(0, 8).map((member) => (
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
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="mailto:contact@fiba.mn"
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
              Бүх багийн гишүүд
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
