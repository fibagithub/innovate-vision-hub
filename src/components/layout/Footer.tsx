import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import fibaLogoWhite from "@/assets/fiba-logo-white.png";

const footerLinks = {
  company: [
    { label: "Бидний тухай", href: "/about" },
    { label: "Манай баг", href: "/team" },
    { label: "Харилцагчид", href: "/partners" },
    { label: "Холбоо барих", href: "/contact" },
  ],
  products: [
    { label: "MeCore System", href: "/services/mecore" },
    { label: "MeLP System", href: "/services/melp" },
    { label: "MeAPP Application", href: "https://me.fiba.mn/", external: true },
    { label: "SmartWare", href: "/services/smartware" },
    { label: "SainScore", href: "https://sainscore.mn/", external: true },
  ],
  services: [
    { label: "Зөвлөх үйлчилгээ", href: "/services/consulting" },
    { label: "Системийн интеграци", href: "/services/integration" },
    { label: "Техникийн дэмжлэг", href: "/services/support" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={fibaLogoWhite} alt="FIBA" className="h-14 w-auto" />
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Банк санхүүгийн програм хангамж, төлбөр тооцооны систем, мэдээллийн сан зохион байгуулах чиглэлээр 2021
              оноос үйл ажиллагаа явуулж байна.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/fiba.mn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Компани</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Бүтээгдэхүүн</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Холбоо барих</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@fiba.mn"
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Mail size={16} />
                  <span>contact@fiba.mn</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+97675092211"
                  className="flex items-center gap-2 text-background/70 hover:text-background transition-colors"
                >
                  <Phone size={16} />
                  <span>+976-7509-2211</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} FIBA LLC. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="https://www.fiba.mn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
            >
              www.fiba.mn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
