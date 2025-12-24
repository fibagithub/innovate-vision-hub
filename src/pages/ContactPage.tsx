import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Building, Sparkles, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Имэйл",
    details: ["contact@fiba.mn"],
    gradient: "from-primary to-[#2563eb]",
  },
  {
    icon: Phone,
    title: "Утас",
    details: ["+976 7509-2211"],
    gradient: "from-[#7c3aed] to-[#a855f7]",
  },
  {
    icon: MapPin,
    title: "Хаяг",
    details: [
      "Монгол улс, Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот",
    ],
    gradient: "from-[#059669] to-[#34d399]",
  },
  {
    icon: Clock,
    title: "Ажлын цаг",
    details: ["Даваа - Баасан: 9:00 - 18:00"],
    gradient: "from-[#f59e0b] to-[#fbbf24]",
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Мессеж илгээгдлээ!",
      description: "Бид 24 цагийн дотор хариу өгөх болно.",
    });
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-32 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10 mb-10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">Холбоо барих</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Бидэнтэй <span className="gradient-text">холбогдох</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Санхүүгийн технологийн шийдлүүдийн талаар асуух зүйл байвал бидэнтэй холбогдоорой. Бид таны хүсэлтэд хариу
              өгөхөд бэлэн.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 bg-background relative -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group relative p-6 lg:p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="relative p-8 lg:p-12 rounded-[2.5rem] bg-card border border-border/50 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#2563eb]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium text-sm">Мессеж илгээх</span>
                  </div>

                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">Бидэнд бичих</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Нэр *</label>
                        <Input
                          type="text"
                          placeholder="Таны нэр"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Имэйл *</label>
                        <Input
                          type="email"
                          placeholder="email@company.mn"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Байгууллага</label>
                        <Input
                          type="text"
                          placeholder="Байгууллагын нэр"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Утас</label>
                        <Input
                          type="tel"
                          placeholder="+976 9900-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Сэдэв *</label>
                      <Input
                        type="text"
                        placeholder="Юуны талаар асуух вэ?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Мессеж *</label>
                      <Textarea
                        placeholder="Таны мессеж..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="rounded-xl"
                      />
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      Мессеж илгээх
                      <Send className="ml-2" size={18} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Card */}
              <div className="relative h-[300px] rounded-[2rem] bg-gradient-to-br from-primary via-[#2563eb] to-primary overflow-hidden">
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
                    <div
                      className="absolute inset-0 bg-primary/20 rounded-full animate-ping"
                      style={{ animationDelay: `${index * 200}ms` }}
                    />
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

              {/* Quick Links */}
              <div className="relative p-8 rounded-[2rem] bg-card border border-border/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium text-sm">Хурдан холбоос</span>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="mailto:contact@fiba.mn"
                      className="group flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">contact@fiba.mn</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>

                    <a
                      href="tel:+97675092211"
                      className="group flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">+976 7509-2211</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>

                    <a
                      href="https://fiba.mn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">fiba.mn</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
