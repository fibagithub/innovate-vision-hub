import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function QuickLinks() {
  const { t, language } = useLanguage();

  const quickLinks = [
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: "contact@fiba.mn",
      href: "mailto:contact@fiba.mn",
    },
    {
      icon: Phone,
      label: t('contact.phoneLabel'),
      value: "+976-7509-2211",
      href: "tel:+97675092211",
    },
    {
      icon: ExternalLink,
      label: t('contact.website'),
      value: "www.fiba.mn",
      href: "https://www.fiba.mn",
      external: true,
    },
  ];

  return (
    <section className="py-16 bg-muted/30" id="quick-links">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('quickLinks.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#2563eb] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{link.label}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.value}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>

          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
            <div className="bg-card p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t('contact.address')}</p>
                <p className="text-sm text-muted-foreground">{t('contact.addressValue')}</p>
              </div>
            </div>
            <div className="h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5!2d106.9!3d47.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU0JzAwLjAiTiAxMDbCsDU0JzAwLjAiRQ!5e0!3m2!1sen!2smn!4v1620000000000!5m2!1sen!2smn"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FIBA LLC Location"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact">
              <Button variant="gradient" size="lg">
                {t('contact.sendMessage')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
