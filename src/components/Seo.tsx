import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const BASE = "https://fiba.mn";

interface SeoProps {
  title?: { mn: string; en: string } | string;
  description?: string;
  noindex?: boolean;
}

const DEFAULT_DESC = {
  mn: "Банк санхүүгийн программ хангамж, төлбөр тооцооны систем, мэдээллийн сангийн шийдлүүд. 2021 оноос.",
  en: "Banking software, payment systems and database solutions. Since 2021.",
};

export function Seo({ title, description, noindex }: SeoProps) {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const t = typeof title === "string" ? title : title?.[language] ?? (language === "mn" ? "Фиба ХХК — Банк санхүүгийн технологийн шийдэл" : "FIBA LLC — Financial technology solutions");
  const desc = description || DEFAULT_DESC[language];
  const url = `${BASE}${pathname === "/" ? "" : pathname}`;
  return (
    <Helmet>
      <html lang={language} />
      <title>{t}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
