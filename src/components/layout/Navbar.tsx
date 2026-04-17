import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fibaLogo from "@/assets/fiba-logo.png";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.services'), href: "/services" },
    { label: t('nav.team'), href: "/team" },
    { label: t('nav.partners'), href: "/partners" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when navigating
  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== href) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-lg shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <img src={fibaLogo} alt="FIBA" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="gradient" size="sm" onClick={() => handleNavClick('/contact')}>
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="gradient" className="w-full" onClick={() => handleNavClick('/contact')}>
              {t('nav.getStarted')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
