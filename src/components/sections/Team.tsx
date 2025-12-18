import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowRight, Users2 } from 'lucide-react';
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
    bio: 'Банк санхүүгийн мэдээллийн систем, 19 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Лочинжалбуу Хатанбаатар',
    role: 'Систем анализ',
    bio: 'Систем анализ, Дата төв, 16 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Цэндсүрэн Мөнх-эрдэнэ',
    role: 'Програм хангамж хөгжүүлэлт',
    bio: 'Програм хангамж, Алгоритм, 17-н жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Жамьянсүрэн Ичинхорлоо',
    role: 'Системийн шинжээч',
    bio: 'Төлбөр тооцооны систем, 14 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Баасандорж Адъяасүрэн',
    role: 'Системийн администратор',
    bio: 'Системийн администратор, 10 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 7,
    name: 'Сайнбуян Мөнхтулга',
    role: 'Програм хангамжийн инженер',
    bio: 'Вебсайт болон Веб аппликейшн, 6 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 8,
    name: 'Отгонбаатар Ихбаяр',
    role: 'Веб хөгжүүлэгч',
    bio: 'Веб аппликейшн, Аюулгүй байдал, 5 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 9,
    name: 'Батболд Ганбаатар',
    role: 'Backend хөгжүүлэгч',
    bio: 'Backend систем, API хөгжүүлэлт, 8 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 10,
    name: 'Энхжаргал Түвшинбаяр',
    role: 'QA инженер',
    bio: 'Чанарын баталгаажуулалт, Тестийн автоматжуулалт, 7 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 11,
    name: 'Мөнхбаяр Ганзориг',
    role: 'DevOps инженер',
    bio: 'Дэд бүтэц, Cloud системүүд, 6 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 12,
    name: 'Оюунчимэг Батсайхан',
    role: 'UI/UX дизайнер',
    bio: 'Хэрэглэгчийн интерфэйс дизайн, 5 жилийн туршлагатай.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
  },
];

export function Team() {
  return (
    <section className="py-32 bg-muted/30 relative overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Our Team</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Манай<br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              хамт олон
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Банк санхүүгийн салбарт олон жилийн туршлагатай мэргэжлийн баг
          </p>
        </div>

        {/* Team Grid - 12 members, 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative rounded-2xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Social Links - appear on hover */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <a
                    href="#"
                    className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <Linkedin size={16} className="text-white" />
                  </a>
                  <a
                    href="mailto:contact@fiba.mn"
                    className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                  >
                    <Mail size={16} className="text-white" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-foreground mb-0.5 truncate">
                  {member.name}
                </h3>
                <p className="text-primary text-xs font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs line-clamp-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
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