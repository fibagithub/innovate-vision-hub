import { Link, useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Seo title={{ mn: "Хуудас олдсонгүй | Фиба ХХК", en: "Page not found | FIBA LLC" }} noindex />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t('notFound.desc')}</p>
        <Link to="/"><Button variant="gradient">{t('notFound.goHome')}</Button></Link>
      </div>
    </div>
  );
};

export default NotFound;
