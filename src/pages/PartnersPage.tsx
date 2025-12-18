import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, Building2, Landmark, Wallet, Users, Globe, Shield, Sparkles, TrendingUp, Award, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientTypes = [
  { 
    icon: Landmark, 
    title: 'Арилжааны банк', 
    count: '4+', 
    description: 'Монголын тэргүүлэгч арилжааны банкууд',
    gradient: 'from-primary to-[#2563eb]'
  },
  { 
    icon: Building2, 
    title: 'ББСБ', 
    count: '20+', 
    description: 'Банк бус санхүүгийн байгууллагууд',
    gradient: 'from-[#7c3aed] to-[#a855f7]'
  },
  { 
    icon: Wallet, 
    title: 'ХЗХ', 
    count: '25+', 
    description: 'Хадгаламж зээлийн хоршоод',
    gradient: 'from-[#059669] to-[#34d399]'
  },
  { 
    icon: Users, 
    title: 'Бусад', 
    count: '10+', 
    description: 'Лизинг, даатгал болон бусад',
    gradient: 'from-[#f59e0b] to-[#fbbf24]'
  },
];

const regions = [
  { name: 'Улаанбаатар', count: '30+', position: 'center' },
  { name: 'Дархан', count: '5+', position: 'north' },
  { name: 'Эрдэнэт', count: '4+', position: 'northwest' },
  { name: 'Өмнөговь', count: '3+', position: 'south' },
  { name: 'Дорноговь', count: '3+', position: 'southeast' },
  { name: 'Хөвсгөл', count: '2+', position: 'north-central' },
];

const achievements = [
  { value: '50+', label: 'Нийт харилцагч', icon: Users },
  { value: '15+', label: 'Жилийн туршлага', icon: Award },
  { value: '21', label: 'Аймаг хамрагдсан', icon: MapPin },
  { value: '99%', label: 'Uptime найдвартай', icon: Shield },
];

const testimonials = [
  {
    quote: "FIBA-ийн Core Banking систем нь манай байгууллагын үйл ажиллагааг бүрэн автоматжуулж, үйлчилгээний чанарыг эрс сайжруулсан.",
    author: "Санхүүгийн захирал",
    company: "Тэргүүлэгч ББСБ",
    gradient: 'from-primary to-[#2563eb]'
  },
  {
    quote: "MeAPP мобайл аппликейшн нь манай гишүүдэд хаанаас ч үйлчилгээ авах боломж олгож, харилцагчийн сэтгэл ханамжийг нэмэгдүүлсэн.",
    author: "Гүйцэтгэх захирал",
    company: "ХЗХ",
    gradient: 'from-[#7c3aed] to-[#a855f7]'
  },
  {
    quote: "Мэргэжлийн өндөр түвшний дэмжлэг, 24/7 найдвартай ажиллагаа нь манай сонголтыг зөв болгосон.",
    author: "IT менежер",
    company: "ББСБ",
    gradient: 'from-[#059669] to-[#34d399]'
  },
];

const PartnersPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">Түншүүд & Харилцагчид</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Салбарын{' '}
              <span className="gradient-text">тэргүүлэгчдийн</span>
              <br />итгэлийг хүлээсэн
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Монголын банк, санхүүгийн байгууллагуудын 50+ харилцагчдад 
              технологийн шийдэл, үйлчилгээг амжилттай хүргэж байна.
            </p>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-8 bg-background relative -mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {achievements.map((stat, index) => (
              <div 
                key={index} 
                className="group relative p-6 lg:p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#2563eb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Types - Bento Grid */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">Харилцагчид</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Санхүүгийн{' '}
              <span className="gradient-text">бүх салбарт</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Арилжааны банк, ББСБ, ХЗХ, лизингийн компаниуд зэрэг санхүүгийн бүх төрлийн байгууллагуудад үйлчилдэг.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientTypes.map((client, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${client.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${client.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <client.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-display text-4xl font-bold text-foreground mb-2">{client.count}</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{client.title}</h3>
                  <p className="text-muted-foreground text-sm">{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Coverage - Map Style */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm tracking-wide">Бүс нутгийн хамрах хүрээ</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Монгол даяар{' '}
              <span className="gradient-text">21 аймагт</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Улаанбаатараас эхлээд хөдөө орон нутаг хүртэл санхүүгийн байгууллагуудад үйлчилж байна.
            </p>
          </div>

          {/* Regional Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regions.map((region, index) => (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                  <div className="font-display text-2xl font-bold text-foreground mb-1">{region.count}</div>
                  <div className="text-sm text-muted-foreground">{region.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">Харилцагчдын сэтгэгдэл</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Харилцагчид{' '}
              <span className="gradient-text">юу хэлдэг вэ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group relative p-8 lg:p-10 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="text-4xl text-primary/20 font-display mb-4">"</div>
                  <p className="text-foreground mb-8 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="pt-6 border-t border-border/50">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden p-12 lg:p-20">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white/90 font-medium text-sm">Түнш болох</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Бидэнтэй хамтрах уу?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Технологийн түншлэлийн боломжуудын талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                  Холбогдох
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PartnersPage;