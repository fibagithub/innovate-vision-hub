import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'mn' | 'en';

interface Translations {
  [key: string]: {
    mn: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { mn: 'Нүүр', en: 'Home' },
  'nav.about': { mn: 'Бидний тухай', en: 'About Us' },
  'nav.services': { mn: 'Бүтээгдэхүүн, үйлчилгээ', en: 'Products & Services' },
  'nav.team': { mn: 'Манай баг', en: 'Our Team' },
  'nav.partners': { mn: 'Харилцагчид', en: 'Partners' },
  'nav.contact': { mn: 'Холбоо барих', en: 'Contact' },
  'nav.getStarted': { mn: 'Эхлэх', en: 'Get Started' },
  
  // Hero Section
  'hero.badge': { mn: 'Санхүүгийн технологийн шийдлүүд', en: 'Financial Technology Solutions' },
  'hero.title1': { mn: 'Санхүүгийн', en: 'Financial' },
  'hero.title2': { mn: 'Технологийн', en: 'Technology' },
  'hero.title3': { mn: 'Шийдлүүд', en: 'Solutions' },
  'hero.description': { mn: 'Банк, ББСБ, ХЗХ болон бусад санхүүгийн байгууллагуудад зориулсан дэвшилтэт технологийн шийдлүүд.', en: 'Advanced technology solutions for banks, NBFIs, credit unions and other financial institutions.' },
  
  // Services Section
  'services.badge': { mn: 'Бүтээгдэхүүн & Үйлчилгээ', en: 'Products & Services' },
  'services.title': { mn: 'Манай шийдлүүд', en: 'Our Solutions' },
  'services.description': { mn: 'Санхүүгийн байгууллагуудад зориулсан цогц технологийн шийдлүүд', en: 'Comprehensive technology solutions for financial institutions' },
  'services.learnMore': { mn: 'Дэлгэрэнгүй', en: 'Learn More' },
  
  // Partners Section
  'partners.badge': { mn: 'Түншүүд & Харилцагчид', en: 'Partners & Clients' },
  'partners.title1': { mn: 'Технологийн', en: 'Technology' },
  'partners.title2': { mn: 'Түншүүд', en: 'Partners' },
  'partners.description': { mn: 'Монгол орон даяар санхүүгийн байгууллагуудтай хамтран ажиллаж байна', en: 'Working with financial institutions across Mongolia' },
  'partners.whyChoose': { mn: 'Яагаад биднийг сонгох вэ?', en: 'Why Choose Us?' },
  'partners.whyChooseDesc': { mn: 'Манай системүүд нь олон улсын стандартад нийцсэн, найдвартай, хэрэглэхэд хялбар.', en: 'Our systems meet international standards, are reliable and easy to use.' },
  'partners.moreInfo': { mn: 'Дэлгэрэнгүй мэдээлэл', en: 'More Information' },
  
  // Contact Section
  'contact.badge': { mn: 'Холбоо барих', en: 'Contact Us' },
  'contact.title': { mn: 'Бидэнтэй холбогдоорой', en: 'Get in Touch' },
  'contact.description': { mn: 'Танд туслахад бэлэн байна. Асуулт, санал хүсэлтээ бидэнд илгээнэ үү.', en: 'We are ready to help. Send us your questions and suggestions.' },
  'contact.name': { mn: 'Бүтэн нэр', en: 'Full Name' },
  'contact.namePlaceholder': { mn: 'Таны нэр', en: 'Your name' },
  'contact.email': { mn: 'Имэйл хаяг', en: 'Email Address' },
  'contact.company': { mn: 'Байгууллага', en: 'Company' },
  'contact.companyPlaceholder': { mn: 'Таны байгууллагын нэр', en: 'Your company name' },
  'contact.phone': { mn: 'Утас', en: 'Phone' },
  'contact.subject': { mn: 'Сэдэв', en: 'Subject' },
  'contact.subjectPlaceholder': { mn: 'Юуны талаар асуух вэ?', en: 'What would you like to ask about?' },
  'contact.message': { mn: 'Мессеж', en: 'Message' },
  'contact.messagePlaceholder': { mn: 'Таны асуулт, санал хүсэлт...', en: 'Your question or feedback...' },
  'contact.send': { mn: 'Илгээх', en: 'Send' },
  'contact.sendMessage': { mn: 'Мессеж илгээх', en: 'Send Message' },
  'contact.writeToUs': { mn: 'Бидэнд бичих', en: 'Write to Us' },
  'contact.quickLinks': { mn: 'Хурдан холбоос', en: 'Quick Links' },
  'contact.emailLabel': { mn: 'Имэйл', en: 'Email' },
  'contact.phoneLabel': { mn: 'Утас', en: 'Phone' },
  'contact.website': { mn: 'Вэбсайт', en: 'Website' },
  'contact.workHours': { mn: 'Ажлын цаг', en: 'Working Hours' },
  'contact.workHoursValue': { mn: 'Даваа - Баасан: 9:00 - 18:00', en: 'Monday - Friday: 9:00 - 18:00' },
  'contact.address': { mn: 'Хаяг', en: 'Address' },
  'contact.addressValue': { mn: 'Монгол улс, Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот', en: 'Building 12, Apt 1, Bogd Javzan Damba Street, 15th Khoroo, Khan-Uul District, Ulaanbaatar, Mongolia' },
  'contact.successTitle': { mn: 'Мессеж илгээгдлээ!', en: 'Message sent!' },
  'contact.successDesc': { mn: 'Бид 24 цагийн дотор хариу өгөх болно.', en: 'We will respond within 24 hours.' },
  
  // Footer
  'footer.company': { mn: 'Компани', en: 'Company' },
  'footer.products': { mn: 'Бүтээгдэхүүн', en: 'Products' },
  'footer.services': { mn: 'Үйлчилгээ', en: 'Services' },
  'footer.copyright': { mn: 'Бүх эрх хуулиар хамгаалагдсан.', en: 'All rights reserved.' },
  
  // Region names
  'region.ulaanbaatar': { mn: 'Улаанбаатар хот', en: 'Ulaanbaatar City' },
  'region.west': { mn: 'Баруун бүс', en: 'Western Region' },
  'region.north': { mn: 'Хойд бүс', en: 'Northern Region' },
  'region.khangai': { mn: 'Хангайн бүс', en: 'Khangai Region' },
  'region.central': { mn: 'Төвийн бүс', en: 'Central Region' },
  'region.gobi': { mn: 'Говийн бүс', en: 'Gobi Region' },
  'region.east': { mn: 'Зүүн бүс', en: 'Eastern Region' },
  
  // Common
  'common.viewAll': { mn: 'Бүгдийг харах', en: 'View All' },
  'common.loading': { mn: 'Уншиж байна...', en: 'Loading...' },
  'common.error': { mn: 'Алдаа гарлаа', en: 'An error occurred' },
  'common.save': { mn: 'Хадгалах', en: 'Save' },
  'common.cancel': { mn: 'Цуцлах', en: 'Cancel' },
  'common.edit': { mn: 'Засах', en: 'Edit' },
  'common.delete': { mn: 'Устгах', en: 'Delete' },
  'common.add': { mn: 'Нэмэх', en: 'Add' },
  'common.active': { mn: 'Идэвхтэй', en: 'Active' },
  'common.inactive': { mn: 'Идэвхгүй', en: 'Inactive' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'mn';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
