import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, Users, Briefcase, MapPin, Globe2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const clientTypes = [
  { icon: Landmark, label: 'Арилжааны банкууд', count: '4+' },
  { icon: Building2, label: 'ББСБ', count: '25+' },
  { icon: Users, label: 'Хадгаламж зээлийн хоршоод', count: '30+' },
  { icon: Briefcase, label: 'Лизингийн компаниуд', count: '5+' },
];

const achievements = [
  { number: '4+', label: 'Банканд систем нэвтрүүлсэн' },
  { number: '50+', label: 'ХЗХ, ББСБ-д үйлчилгээ үзүүлсэн' },
  { number: '15+', label: 'Жилийн туршлага' },
  { number: '100%', label: 'Харилцагчийн сэтгэл ханамж' },
];

// Regional partner statistics for the map
const regions = [
  { name: 'Улаанбаатар', count: 35, x: '52%', y: '45%' },
  { name: 'Дархан-Уул', count: 8, x: '48%', y: '28%' },
  { name: 'Орхон', count: 6, x: '42%', y: '32%' },
  { name: 'Баруун бүс', count: 12, x: '20%', y: '40%' },
  { name: 'Дорнод бүс', count: 5, x: '80%', y: '38%' },
  { name: 'Говь бүс', count: 4, x: '55%', y: '65%' },
];

export function Partners() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="clients">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium text-sm">Strategic Alliances</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Technology<br />
            <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Монгол орон даяар санхүүгийн байгууллагуудтай хамтран ажиллаж байна
          </p>
        </div>

        {/* Map Section */}
        <div className="relative mb-20">
          <div className="bg-card rounded-[2rem] border border-border/50 p-8 lg:p-12 overflow-hidden">
            {/* Map Container */}
            <div className="relative aspect-[2/1] max-w-5xl mx-auto">
              {/* Mongolia Map SVG Simplified */}
              <svg viewBox="0 0 800 400" className="w-full h-full">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Simplified Mongolia outline */}
                <path
                  d="M50,180 Q100,120 200,100 Q300,80 400,90 Q500,70 600,100 Q700,130 750,180 Q780,220 750,280 Q700,340 600,350 Q500,360 400,350 Q300,360 200,340 Q100,320 50,280 Q20,240 50,180 Z"
                  fill="url(#mapGradient)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                {/* Grid lines */}
                <g stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.1">
                  {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
                    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" />
                  ))}
                  {[0, 100, 200, 300, 400].map((y) => (
                    <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} />
                  ))}
                </g>
              </svg>

              {/* Region Markers */}
              {regions.map((region, index) => (
                <div
                  key={region.name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: region.x, top: region.y }}
                >
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 w-16 h-16 -translate-x-1/4 -translate-y-1/4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" style={{ animationDelay: `${index * 200}ms` }} />
                  </div>
                  
                  {/* Marker */}
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[#2563eb] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="font-display font-bold text-white text-sm">{region.count}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                      {region.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border/50">
              {clientTypes.map((client, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <client.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">{client.count}</div>
                    <div className="text-xs text-muted-foreground">{client.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="relative group p-8 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="font-display text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-[#2563eb] bg-clip-text text-transparent mb-2">
                {achievement.number}
              </div>
              <p className="text-muted-foreground font-medium">{achievement.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border/50 p-10 lg:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Яагаад биднийг сонгох вэ?
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                Манай системүүд нь олон улсын стандартад нийцсэн, найдвартай, хэрэглэхэд хялбар, тасралтгүй хөгжүүлэлт хийгддэг.
              </p>
              <Link to="/partners">
                <Button variant="gradient" size="lg">
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
                  className="p-5 rounded-xl bg-card/80 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
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