import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Database,
  FileText,
  Smartphone,
  CreditCard,
  BarChart3,
  Sparkles,
  Play,
  Shield,
  Zap,
  Globe,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "mecore",
    icon: Database,
    title: "MeCore",
    subtitle: "Core Banking System",
    shortDesc: "Санхүүгийн байгууллагуудад зориулсан суурь систем",
    description:
      "Банк, ББСБ, Лизинг болон ХЗХ зэрэг санхүүгийн үйлчилгээг үзүүлдэг байгууллагуудад зориулагдсан өдөр тутмын үйл ажиллагааг автоматжуулах цогц систем.",
    gradient: "from-primary to-[#2563eb]",
    bgGradient: "from-primary/10 via-primary/5 to-transparent",
    features: [
      { title: "Данс хөтлөлт", desc: "Бүх төрлийн данс нээх, хаах, удирдах" },
      { title: "Гүйлгээ боловсруулалт", desc: "Real-time гүйлгээ хийх, баталгаажуулах" },
      { title: "Тайлан систем", desc: "Санхүүгийн болон удирдлагын тайлангууд" },
      { title: "Хүү тооцоолол", desc: "Автомат хүү тооцох, хуримтлуулах" },
      { title: "Интеграци", desc: "Гадаад системүүдтэй холбогдох API" },
      { title: "Аюулгүй байдал", desc: "Олон түвшний нэвтрэлт, хяналт" },
    ],
    stats: [
      { value: "50+", label: "Байгууллага" },
      { value: "1M+", label: "Харилцагч" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Дэмжлэг" },
    ],
    benefits: [
      "Үйл ажиллагааны зардал 40% хэмнэнэ",
      "Автоматжуулалтаар алдаа багасна",
      "Real-time мэдээлэл хянах боломж",
      "Өргөтгөх боломжтой архитектур",
    ],
  },
  {
    id: "melp",
    icon: FileText,
    title: "MeLP",
    subtitle: "Loan Processing System",
    shortDesc: "Зээлийн үйл явцыг автоматжуулах систем",
    description:
      "Зээл олгох үйл явцыг автоматжуулах, хянах, удирдах зориулалттай систем. Зээлийн хүсэлт хүлээн авахаас эхлээд олголт хүртэл бүх үе шатыг удирдана.",
    gradient: "from-[#7c3aed] to-[#a855f7]",
    bgGradient: "from-[#7c3aed]/10 via-[#7c3aed]/5 to-transparent",
    features: [
      { title: "Зээлийн хүсэлт", desc: "Онлайн болон оффлайн хүсэлт хүлээн авах" },
      { title: "Автомат скоринг", desc: "AI-д суурилсан зээлийн үнэлгээ" },
      { title: "Батлах урсгал", desc: "Олон түвшний батлах workflow" },
      { title: "Гэрээ үүсгэх", desc: "Автомат гэрээ, баримт бичиг үүсгэх" },
      { title: "Хугацаа хянах", desc: "Зээлийн хугацаа, төлөлт хянах" },
      { title: "Цуглуулалт", desc: "Автомат сануулга, цуглуулалтын удирдлага" },
    ],
    stats: [
      { value: "100K+", label: "Зээл" },
      { value: "30%", label: "Хурдан шийдвэр" },
      { value: "95%", label: "Нарийвчлал" },
      { value: "50%", label: "Хэмнэлт" },
    ],
    benefits: [
      "Зээлийн шийдвэр 30% хурдан",
      "Риск үнэлгээ сайжирна",
      "Бичиг баримтын алдаа багасна",
      "Харилцагчийн сэтгэл ханамж нэмэгдэнэ",
    ],
  },
  {
    id: "meapp",
    icon: Smartphone,
    title: "MeAPP",
    subtitle: "Mobile Banking App",
    shortDesc: "Хэрэглэгчдэд зориулсан мобайл апп",
    description:
      "ХЗХ болон ББСБ-н гишүүд харилцагч нарыг онлайнаар үйлчилгээ авах боломжийг олгох мобайл банкны аппликейшн.",
    gradient: "from-[#059669] to-[#34d399]",
    bgGradient: "from-[#059669]/10 via-[#059669]/5 to-transparent",
    externalLink: "https://me.fiba.mn/",
    features: [
      { title: "Мөнгө шилжүүлэг", desc: "Дансаас данс руу хурдан шилжүүлэг" },
      { title: "Зээлийн хүсэлт", desc: "Апп дээрээс зээлийн хүсэлт илгээх" },
      { title: "QR төлбөр", desc: "QR код уншуулж төлбөр хийх" },
      { title: "Мэдэгдэл", desc: "Push notification, SMS мэдэгдэл" },
      { title: "Биометрик", desc: "Хурууны хээ, царай таних нэвтрэлт" },
      { title: "Карт удирдлага", desc: "Виртуал болон физик карт удирдах" },
    ],
    stats: [
      { value: "10K+", label: "Хэрэглэгч" },
      { value: "4.8", label: "App Store" },
      { value: "50K+", label: "Гүйлгээ/сар" },
      { value: "< 3s", label: "Хариу хугацаа" },
    ],
    benefits: ["24/7 банкны үйлчилгээ", "Салбарт очих шаардлагагүй", "Хурдан, аюулгүй гүйлгээ", "Хялбар интерфейс"],
  },
  {
    id: "smartware",
    icon: CreditCard,
    title: "SmartWare",
    subtitle: "Card Terminal Solution",
    shortDesc: "EMV стандарт бүхий POS терминал",
    description:
      "EMV стандарт бүхий VISA, MASTER CARD, UnionPay терминал. POS терминалын цогц шийдэл, төлбөрийн карт хүлээн авах боломж.",
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    bgGradient: "from-[#f59e0b]/10 via-[#f59e0b]/5 to-transparent",
    features: [
      { title: "EMV чип", desc: "Чип бүхий картыг уншуулах" },
      { title: "Contactless", desc: "NFC холболтоор төлбөр хийх" },
      { title: "QR төлбөр", desc: "QR код уншуулж төлбөр хийх" },
      { title: "Олон валют", desc: "Олон төрлийн валютаар төлбөр хүлээн авах" },
      { title: "Offline горим", desc: "Интернэтгүй үед ажиллах боломж" },
      { title: "Тайлан", desc: "Төлбөрийн тайлан, нэгтгэл" },
    ],
    stats: [
      { value: "1000+", label: "Терминал" },
      { value: "99.99%", label: "Ажиллагаа" },
      { value: "< 2s", label: "Гүйлгээ хугацаа" },
      { value: "PCI DSS", label: "Стандарт" },
    ],
    benefits: [
      "Олон төрлийн карт хүлээн авна",
      "Аюулгүй, найдвартай гүйлгээ",
      "Хялбар суурилуулалт",
      "Техникийн дэмжлэг 24/7",
    ],
  },
  {
    id: "sainscore",
    icon: BarChart3,
    title: "SainScore",
    subtitle: "Credit Information System",
    shortDesc: "Зээлийн мэдээллийн систем",
    description:
      "ТИТАН Си Ар Эй Зээлийн мэдээллийн систем. Иргэн, байгууллагын зээлийн түүх, скоринг, риск үнэлгээний цогц шийдэл.",
    gradient: "from-[#ec4899] to-[#f472b6]",
    bgGradient: "from-[#ec4899]/10 via-[#ec4899]/5 to-transparent",
    externalLink: "https://sainscore.mn/",
    features: [
      { title: "Зээлийн түүх", desc: "Иргэн, байгууллагын зээлийн түүх" },
      { title: "Credit Score", desc: "AI-д суурилсан зээлийн оноо" },
      { title: "Риск үнэлгээ", desc: "Автомат риск үнэлгээ хийх" },
      { title: "Тайлан", desc: "Зээлийн дэлгэрэнгүй тайлан" },
      { title: "API холболт", desc: "Бусад системтэй холбогдох" },
      { title: "Real-time", desc: "Шууд мэдээлэл авах боломж" },
    ],
    stats: [
      { value: "500K+", label: "Хэрэглэгч" },
      { value: "20+", label: "Банк, ББСБ" },
      { value: "1M+", label: "Лавлагаа/жил" },
      { value: "< 1s", label: "Хариу хугацаа" },
    ],
    benefits: ["Зээлийн шийдвэр хурдан гаргана", "Риск бууруулна", "Найдвартай мэдээлэл", "Хуулийн дагуу ажиллана"],
  },
];

const ServicesPage = () => {
  const { serviceId } = useParams();
  const product = serviceId ? products.find((p) => p.id === serviceId) : null;

  if (product) {
    return (
      <Layout>
        {/* Hero Section - Innovative Design */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${product.bgGradient}`} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Floating Elements */}
          <div
            className={`absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br ${product.gradient} opacity-10 rounded-full blur-3xl`}
          />
          <div
            className={`absolute bottom-0 left-[5%] w-[300px] h-[300px] bg-gradient-to-br ${product.gradient} opacity-5 rounded-full blur-3xl`}
          />

          <div className="container mx-auto px-4 relative">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="font-medium">Бүтээгдэхүүнүүд</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                {/* Logo */}
                <div
                  className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-8 shadow-2xl`}
                >
                  <product.icon className="w-12 h-12 text-white" />
                </div>

                <span
                  className="text-sm font-bold tracking-widest uppercase mb-4 block"
                  style={{
                    background: `linear-gradient(to right, ${product.gradient.includes("primary") ? "hsl(var(--primary))" : product.gradient.split(" ")[0].replace("from-[", "").replace("]", "")}, ${product.gradient.split(" ")[1].replace("to-[", "").replace("]", "")})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {product.subtitle}
                </span>

                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
                  {product.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">{product.description}</p>

                <div className="flex flex-wrap gap-4">
                  {product.externalLink ? (
                    <a href={product.externalLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="gradient" size="xl" className={`bg-gradient-to-r ${product.gradient}`}>
                        Вэбсайт үзэх
                        <ArrowRight className="ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Link to="/contact">
                      <Button variant="gradient" size="xl" className={`bg-gradient-to-r ${product.gradient}`}>
                        Холбоо барих
                        <ArrowRight className="ml-2" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="xl" className="gap-2">
                    <Play className="w-4 h-4" />
                    Демо үзэх
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {product.stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-8 rounded-3xl bg-card border border-border/50 hover:border-border transition-colors ${index === 0 ? "col-span-2" : ""}`}
                  >
                    <div
                      className={`text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Bento Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} bg-opacity-10 mb-6`}
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">Онцлог боломжууд</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Бүтээгдэхүүний боломжууд
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {product.title}-ийн гол онцлог, давуу талууд
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 ${index === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                  Давуу талууд
                </span>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Яагаад {product.title}?
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Таны бизнесийг дараагийн түвшинд хүргэх инновацлаг шийдэл
                </p>

                <div className="space-y-4">
                  {product.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shrink-0`}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Card */}
              <div className={`relative p-10 rounded-[2.5rem] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-8">
                    <product.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="font-display text-3xl font-bold text-white mb-4">Эхлүүлэхэд бэлэн үү?</h3>
                  <p className="text-white/80 text-lg mb-8 leading-relaxed">
                    Манай багтай холбогдож {product.title}-ийн талаар дэлгэрэнгүй мэдээлэл аваарай.
                  </p>

                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-foreground hover:bg-white/90 shadow-xl">
                      Холбоо барих
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Products */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Бусад бүтээгдэхүүнүүд</h2>
              <p className="text-muted-foreground">Манай бусад технологийн шийдлүүдтэй танилцана уу</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.id !== serviceId)
                .map((p) => {
                  const CardWrapper = p.externalLink ? "a" : Link;
                  const linkProps = p.externalLink
                    ? { href: p.externalLink, target: "_blank", rel: "noopener noreferrer" }
                    : { to: `/services/${p.id}` };

                  return (
                    <CardWrapper
                      key={p.id}
                      {...(linkProps as any)}
                      className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <p.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{p.shortDesc}</p>
                    </CardWrapper>
                  );
                })}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Products List Page
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating Elements */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-sm tracking-wide">Бүтээгдэхүүн & Үйлчилгээ</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
              Санхүүгийн
              <span className="block mt-2 bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent">
                Технологийн Шийдлүүд
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн бүтээгдэхүүнүүд
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - Innovative Bento Layout */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            {products.map((product, index) => {
              const CardWrapper = product.externalLink ? "a" : Link;
              const linkProps = product.externalLink
                ? { href: product.externalLink, target: "_blank", rel: "noopener noreferrer" }
                : { to: `/services/${product.id}` };

              // Different sizes for visual interest
              const sizeClass =
                index === 0
                  ? "col-span-12 lg:col-span-8"
                  : index === 1
                    ? "col-span-12 lg:col-span-4"
                    : "col-span-12 md:col-span-6 lg:col-span-4";

              const minHeight = index === 0 ? "min-h-[400px]" : "min-h-[350px]";

              return (
                <div key={product.id} className={sizeClass}>
                  <CardWrapper {...(linkProps as any)} className="block h-full">
                    <div
                      className={`group relative h-full ${minHeight} p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br ${product.bgGradient} bg-card border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/20`}
                    >
                      {/* Gradient Accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.gradient}`} />

                      {/* Decorative */}
                      <div
                        className={`absolute top-10 right-10 w-32 h-32 bg-gradient-to-br ${product.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`}
                      />

                      <div className="relative h-full flex flex-col">
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                          >
                            <product.icon className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-6xl font-black text-foreground/5"></span>
                        </div>

                        <span
                          className="text-xs font-bold tracking-widest uppercase mb-2"
                          style={{
                            background: `linear-gradient(to right, ${product.gradient.includes("primary") ? "hsl(var(--primary))" : product.gradient.split(" ")[0].replace("from-[", "").replace("]", "")}, ${product.gradient.split(" ")[1].replace("to-[", "").replace("]", "")})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {product.subtitle}
                        </span>

                        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {product.title}
                        </h2>

                        <p className="text-muted-foreground leading-relaxed flex-1 mb-6">{product.shortDesc}</p>

                        {/* Features Preview */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {product.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50 text-xs font-medium text-foreground/70"
                            >
                              {feature.title}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <Sparkles
                              className="w-4 h-4"
                              style={{
                                color: product.gradient.includes("primary")
                                  ? "hsl(var(--primary))"
                                  : product.gradient.split(" ")[0].replace("from-[", "").replace("]", ""),
                              }}
                            />
                            <span
                              className="text-sm font-semibold"
                              style={{
                                color: product.gradient.includes("primary")
                                  ? "hsl(var(--primary))"
                                  : product.gradient.split(" ")[0].replace("from-[", "").replace("]", ""),
                              }}
                            ></span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </CardWrapper>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-[#2563eb] to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-8">
              <Users className="w-4 h-4 text-white" />
              <span className="text-white/90 font-medium text-sm">Зөвлөгөө авах</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
              Аль бүтээгдэхүүн тохирохоо мэдэхгүй байна уу?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Манай мэргэжилтнүүд танд тохирох шийдлийг санал болгоход бэлэн байна.
            </p>

            <Link to="/contact">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl">
                Зөвлөгөө авах
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
