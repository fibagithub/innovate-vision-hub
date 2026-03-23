import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "mn" | "en";

interface Translations {
  [key: string]: {
    mn: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { mn: "Нүүр", en: "Home" },
  "nav.about": { mn: "Бидний тухай", en: "About Us" },
  "nav.services": { mn: "Бүтээгдэхүүн, үйлчилгээ", en: "Products & Services" },
  "nav.team": { mn: "Манай баг", en: "Our Team" },
  "nav.partners": { mn: "Харилцагчид", en: "Partners" },
  "nav.contact": { mn: "Холбоо барих", en: "Contact" },
  "nav.getStarted": { mn: "Эхлэх", en: "Get Started" },

  // Hero Section
  "hero.badge": { mn: "FIBA LLC — 2021 оноос", en: "FIBA LLC — Since 2021" },
  "hero.title1": { mn: "Бид шалтгааныг ойлгоход", en: "We focus on understanding" },
  "hero.title2": { mn: "анхаардаг учраас", en: "the root cause to deliver" },
  "hero.titleHighlight": { mn: "бодит үр дүн", en: "real results" },
  "hero.titleSuffix": { mn: "гаргадаг", en: "" },
  "hero.description": {
    mn: "Банк санхүүгийн програм хангамж, төлбөр тооцооны систем, мэдээллийн сан зохион байгуулах чиглэлээр 15+ жилийн туршлагатай мэргэжлийн баг",
    en: "A professional team with 15+ years of experience in banking software, payment systems, and database management",
  },
  "hero.viewProducts": { mn: "Бүтээгдэхүүн үзэх", en: "View Products" },
  "hero.aboutUs": { mn: "Бидний тухай", en: "About Us" },
  "hero.stat.experience": { mn: "Жилийн туршлага", en: "Years of Experience" },
  "hero.stat.team": { mn: "Мэргэжлийн баг", en: "Professional Team" },
  "hero.stat.satisfaction": { mn: "Харилцагчийн сэтгэл ханамж", en: "Client Satisfaction" },

  // About Section (homepage)
  "about.badge": { mn: "Бидний тухай", en: "About Us" },
  "about.title": { mn: "Таны санааг бид", en: "We make your ideas" },
  "about.titleHighlight": { mn: "Бодит болгоно", en: "a Reality" },
  "about.desc1": {
    mn: "Манай компани нь 2021 онд байгуулагдсан бөгөөд, банк санхүүгийн Програм хангамж, түүний шийдэл, мэдээллийн сан зохион байгуулах, төлбөр тооцооны шийдэл боловсруулах чиглэлээр үйл ажиллагаа явуулдаг.",
    en: "Our company was founded in 2021 and operates in the field of banking software, solutions, database management, and payment system development.",
  },
  "about.desc2": {
    mn: "Мөн банк санхүүгийн мэдээллийн систем, Програм хангамж, мэдээллийн сан болон түүний нууцлал аюулгүй байдлыг хариуцан ажиллаж байсан тухайн салбартаа олон жилийн мэдлэг туршлага хуримтлуулсан чадварлаг, бүтээлч хамт олноос бүрдэж байна.",
    en: "Our team consists of talented and creative professionals who have accumulated years of knowledge and experience in banking information systems, software, database management, and security.",
  },
  "about.learnMore": { mn: "Дэлгэрэнгүй үзэх", en: "Learn More" },
  "about.feature.experience": { mn: "Туршлага", en: "Experience" },
  "about.feature.experienceDesc": {
    mn: "Тэргүүлэгч банкны олон жилийн туршлагад суурилагдан бүтээгдсэн",
    en: "Built on years of experience with leading banks",
  },
  "about.feature.reliable": { mn: "24/7 Найдвартай", en: "24/7 Reliable" },
  "about.feature.reliableDesc": {
    mn: "Найдвартай ажиллагаа, мэдээллийн аюулгүй байдлыг хангасан",
    en: "Reliable operations with ensured data security",
  },
  "about.feature.support": { mn: "Мэргэжлийн дэмжлэг", en: "Professional Support" },
  "about.feature.supportDesc": {
    mn: "Мэргэжлийн өндөр түвшний ашиглалт үйлчилгээ үзүүлдэг",
    en: "Providing high-level professional maintenance and service",
  },
  "about.value.mission": { mn: "Бидний эрхэм зорилго", en: "Our Mission" },
  "about.value.missionDesc": {
    mn: "Банк санхүүгийн байгууллагуудад дэлхийн жишигт нийцсэн, найдвартай, хэрэглэхэд хялбар технологийн шийдэл бүтээх.",
    en: "To create reliable, user-friendly technology solutions that meet global standards for financial institutions.",
  },
  "about.value.vision": { mn: "Бидний алсын хараа", en: "Our Vision" },
  "about.value.visionDesc": {
    mn: "Монголын санхүүгийн салбарын технологийн тэргүүлэгч компани болж, олон улсын зах зээлд гарах.",
    en: "To become the leading technology company in Mongolia's financial sector and expand to international markets.",
  },
  "about.value.values": { mn: "Бидний үнэт зүйлс", en: "Our Values" },
  "about.value.valuesDesc": {
    mn: "Мэргэжлийн ёс зүй, найдвартай байдал, тасралтгүй хөгжил, харилцагчийн сэтгэл ханамж бидний үнэт зүйлс.",
    en: "Professional ethics, reliability, continuous development, and client satisfaction are our core values.",
  },

  // WhyChooseUs Section
  "why.badge": { mn: "Яагаад биднийг сонгох вэ", en: "Why Choose Us" },
  "why.title1": { mn: "Таны бизнесийг", en: "Take your business" },
  "why.titleHighlight": { mn: "дараагийн түвшинд", en: "to the next level" },
  "why.description": {
    mn: "Бид таны санааг бодит болгох, бизнесийг тэлэх инновацлаг шийдлүүдийг санал болгодог",
    en: "We offer innovative solutions to turn your ideas into reality and grow your business",
  },
  "why.innovation": { mn: "Инноваци", en: "Innovation" },
  "why.innovationSub": { mn: "Дэвшилтэт технологи", en: "Advanced Technology" },
  "why.innovationDesc": {
    mn: "Хамгийн сүүлийн үеийн технологийг ашиглан үйлчлүүлэгчдийнхээ бизнесийг хөгжүүлнэ",
    en: "Developing our clients' business using the latest technology",
  },
  "why.innovationStat": { mn: "Төсөл", en: "Projects" },
  "why.security": { mn: "Аюулгүй байдал", en: "Security" },
  "why.securitySub": { mn: "Олон улсын стандарт", en: "International Standards" },
  "why.securityDesc": {
    mn: "Олон улсын аюулгүй байдлын стандартад нийцсэн системүүдийг хөгжүүлнэ",
    en: "Developing systems that meet international security standards",
  },
  "why.securityStat": { mn: "Хамгаалалт", en: "Protection" },
  "why.speed": { mn: "Хурдан хүргэлт", en: "Fast Delivery" },
  "why.speedSub": { mn: "Цаг хугацааг хэмнэнэ", en: "Save Time" },
  "why.speedDesc": {
    mn: "Agile арга зүйгээр хурдан, үр дүнтэй шийдлүүдийг бүтээнэ",
    en: "Building fast, effective solutions using Agile methodology",
  },
  "why.speedStat": { mn: "Хурдан", en: "Faster" },
  "why.team": { mn: "Мэргэжлийн баг", en: "Professional Team" },
  "why.teamSub": { mn: "Туршлагатай инженерүүд", en: "Experienced Engineers" },
  "why.teamDesc": {
    mn: "Тэргүүлэгч банкуудад ажиллаж байсан мэргэжилтнүүдийн баг",
    en: "A team of professionals who have worked at leading banks",
  },
  "why.teamStat": { mn: "Жилийн туршлага", en: "Years of Experience" },
  "why.stat.clients": { mn: "Харилцагчид", en: "Clients" },
  "why.stat.uptime": { mn: "Uptime", en: "Uptime" },
  "why.stat.transactions": { mn: "Гүйлгээ/сар", en: "Transactions/month" },
  "why.stat.support": { mn: "Дэмжлэг", en: "Support" },
  "why.cta.title": { mn: "Бидэнтэй хамтран ажиллахад бэлэн үү?", en: "Ready to work with us?" },
  "why.cta.desc": {
    mn: "Таны бизнесийн хэрэгцээнд тохирсон шийдлийг бид хамтдаа бүтээцгээе",
    en: "Let's build the right solution for your business needs together",
  },
  "why.cta.contact": { mn: "Холбогдох", en: "Get in Touch" },
  "why.cta.viewServices": { mn: "Үйлчилгээ үзэх", en: "View Services" },

  // Team Section
  "team.badge": { mn: "Манай баг", en: "Our Team" },
  "team.title": { mn: "Манай", en: "Our" },
  "team.titleHighlight": { mn: "хамт олон", en: "Team" },
  "team.description": {
    mn: "Банк санхүүгийн салбарт олон жилийн туршлагатай мэргэжлийн баг",
    en: "A professional team with years of experience in the banking and finance sector",
  },
  "team.viewAll": { mn: "Бүх багийн гишүүд", en: "View All Team Members" },
  "team.email": { mn: "Имэйл", en: "Email" },

  // Team Page
  "teamPage.heroTitle1": { mn: "Инновацийн", en: "The People" },
  "teamPage.heroHighlight": { mn: "цаадах хүмүүс", en: "Behind Innovation" },
  "teamPage.heroDesc": {
    mn: "Манай чадварлаг баг нь банк санхүүгийн технологийн чиглэлээр олон жилийн туршлага, мэдлэгээ нэгтгэн, шилдэг шийдлүүдийг бүтээдэг.",
    en: "Our talented team combines years of experience and knowledge in financial technology to create the best solutions.",
  },
  "teamPage.stat.team": { mn: "Баг хамт олон", en: "Team Members" },
  "teamPage.stat.experience": { mn: "Жилийн туршлага", en: "Years of Experience" },
  "teamPage.stat.projects": { mn: "Амжилттай төсөл", en: "Successful Projects" },
  "teamPage.joinTitle": { mn: "Бидэнтэй нэгдэх үү?", en: "Want to Join Us?" },
  "teamPage.joinDesc": {
    mn: "Бид үргэлж технологид хайртай, бүтээлч сэтгэлгээтэй хүмүүстэй хамтран ажиллахыг хүсдэг.",
    en: "We are always looking to work with people who love technology and have creative thinking.",
  },

  // Services Section
  "services.badge": { mn: "Бүтээгдэхүүн & Үйлчилгээ", en: "Products & Services" },
  "services.title": { mn: "Манай шийдлүүд", en: "Our Solutions" },
  "services.title2": { mn: "Санхүүгийн Технологи", en: "Financial Technology" },
  "services.subtitle": { mn: "Дараа үеийн", en: "Next Generation" },
  "services.description": {
    mn: "Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн шийдлүүд",
    en: "Reliable software solutions that meet international standards",
  },
  "services.learnMore": { mn: "Дэлгэрэнгүй үзэх", en: "Learn More" },
  "services.viewAll": { mn: "Бүх бүтээгдэхүүн үзэх", en: "View All Products" },
  "services.consulting": { mn: "Зөвлөх үйлчилгээ", en: "Consulting Services" },
  "services.consultingTitle": { mn: "Захиалгат шийдэл хэрэгтэй юу?", en: "Need a Custom Solution?" },
  "services.consultingDesc": {
    mn: "Манай байгууллага нь банкны суурь бүртгэлийн систем, төлбөрийн картын систем, мөн банктай интеграци хийхтэй холбоотой зөвлөх үйлчилгээ буюу шийдэл боловсруулдаг.",
    en: "Our company develops consulting services and solutions related to core banking systems, payment card systems, and bank integration.",
  },
  "services.contactUs": { mn: "Холбоо барих", en: "Contact Us" },
  "services.cardSystem": { mn: "Картын систем", en: "Card System" },
  "services.walletService": { mn: "Wallet үйлчилгээ", en: "Wallet Service" },
  "services.systemIntegration": { mn: "Системийн интеграци", en: "System Integration" },
  "services.aiScoring": { mn: "AI Credit Scoring", en: "AI Credit Scoring" },

  // Services Page
  "servicesPage.backToProducts": { mn: "Бүтээгдэхүүнүүд", en: "Products" },
  "servicesPage.contactUs": { mn: "Холбоо барих", en: "Contact Us" },
  "servicesPage.features": { mn: "Онцлог боломжууд", en: "Key Features" },
  "servicesPage.featuresTitle": { mn: "Бүтээгдэхүүний боломжууд", en: "Product Features" },
  "servicesPage.advantages": { mn: "Давуу талууд", en: "Advantages" },
  "servicesPage.whyProduct": { mn: "Яагаад", en: "Why" },
  "servicesPage.readyToStart": { mn: "Эхлүүлэхэд бэлэн үү?", en: "Ready to Get Started?" },
  "servicesPage.otherProducts": { mn: "Бусад бүтээгдэхүүнүүд", en: "Other Products" },
  "servicesPage.otherProductsDesc": {
    mn: "Манай бусад технологийн шийдлүүдтэй танилцана уу",
    en: "Explore our other technology solutions",
  },
  "servicesPage.innovativeDesc": {
    mn: "Таны бизнесийг дараагийн түвшинд хүргэх инновацлаг шийдэл",
    en: "An innovative solution to take your business to the next level",
  },
  "servicesPage.learnMoreAbout": { mn: "-ийн талаар дэлгэрэнгүй мэдээлэл аваарай.", en: "." },
  "servicesPage.contactTeam": { mn: "Манай багтай холбогдож", en: "Contact our team to learn more about" },

  // Partners Section
  "partners.badge": { mn: "Түншүүд & Харилцагчид", en: "Partners & Clients" },
  "partners.title1": { mn: "Технологийн", en: "Technology" },
  "partners.title2": { mn: "Түншүүд", en: "Partners" },
  "partners.description": {
    mn: "Монгол орон даяар санхүүгийн байгууллагуудтай хамтран ажиллаж байна",
    en: "Working with financial institutions across Mongolia",
  },
  "partners.whyChoose": { mn: "Яагаад биднийг сонгох вэ?", en: "Why Choose Us?" },
  "partners.whyChooseDesc": {
    mn: "Манай системүүд нь олон улсын стандартад нийцсэн, найдвартай, хэрэглэхэд хялбар.",
    en: "Our systems meet international standards, are reliable and easy to use.",
  },
  "partners.moreInfo": { mn: "Дэлгэрэнгүй мэдээлэл", en: "More Information" },
  "partners.totalOrgs": { mn: "Нийт харилцагч байгууллага", en: "Total Partner Organizations" },

  // Contact Section
  "contact.badge": { mn: "Холбоо барих", en: "Contact Us" },
  "contact.title": { mn: "Бидэнтэй холбогдоорой", en: "Get in Touch" },
  "contact.description": {
    mn: "Танд туслахад бэлэн байна. Асуулт, санал хүсэлтээ бидэнд илгээнэ үү.",
    en: "We are ready to help. Send us your questions and suggestions.",
  },
  "contact.name": { mn: "Бүтэн нэр", en: "Full Name" },
  "contact.namePlaceholder": { mn: "Таны нэр", en: "Your name" },
  "contact.email": { mn: "Имэйл хаяг", en: "Email Address" },
  "contact.company": { mn: "Байгууллага", en: "Company" },
  "contact.companyPlaceholder": { mn: "Таны байгууллагын нэр", en: "Your company name" },
  "contact.phone": { mn: "Утас", en: "Phone" },
  "contact.subject": { mn: "Сэдэв", en: "Subject" },
  "contact.subjectPlaceholder": { mn: "Юуны талаар асуух вэ?", en: "What would you like to ask about?" },
  "contact.message": { mn: "Мессеж", en: "Message" },
  "contact.messagePlaceholder": { mn: "Таны асуулт, санал хүсэлт...", en: "Your question or feedback..." },
  "contact.send": { mn: "Илгээх", en: "Send" },
  "contact.sendMessage": { mn: "Мессеж илгээх", en: "Send Message" },
  "contact.writeToUs": { mn: "Бидэнд бичих", en: "Write to Us" },
  "contact.quickLinks": { mn: "Хурдан холбоос", en: "Quick Links" },
  "contact.emailLabel": { mn: "Имэйл", en: "Email" },
  "contact.phoneLabel": { mn: "Утас", en: "Phone" },
  "contact.website": { mn: "Вэбсайт", en: "Website" },
  "contact.workHours": { mn: "Ажлын цаг", en: "Working Hours" },
  "contact.workHoursValue": { mn: "Даваа - Баасан: 9:00 - 18:00", en: "Monday - Friday: 9:00 - 18:00" },
  "contact.address": { mn: "Хаяг", en: "Address" },
  "contact.addressValue": {
    mn: "Монгол улс, Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот",
    en: "Building 12, Apt 1, Bogd Javzan Damba Street, 15th Khoroo, Khan-Uul District, Ulaanbaatar, Mongolia",
  },
  "contact.successTitle": { mn: "Мессеж илгээгдлээ!", en: "Message sent!" },
  "contact.successDesc": { mn: "Бид 24 цагийн дотор хариу өгөх болно.", en: "We will respond within 24 hours." },

  // Contact Page
  "contactPage.heroTitle": { mn: "Бидэнтэй", en: "Get in" },
  "contactPage.heroHighlight": { mn: "холбогдох", en: "Touch" },
  "contactPage.heroDesc": {
    mn: "Санхүүгийн технологийн шийдлүүдийн талаар асуух зүйл байвал бидэнтэй холбогдоорой. Бид таны хүсэлтэд хариу өгөхөд бэлэн.",
    en: "Contact us if you have questions about financial technology solutions. We are ready to respond to your requests.",
  },
  "contactPage.sendMsg": { mn: "Мессеж илгээх", en: "Send Message" },
  "contactPage.writeToUs": { mn: "Бидэнд бичих", en: "Write to Us" },
  "contactPage.quickLinks": { mn: "Хурдан холбоос", en: "Quick Links" },
  "contactPage.nameLabel": { mn: "Нэр", en: "Name" },
  "contactPage.emailLabel": { mn: "Имэйл", en: "Email" },
  "contactPage.companyLabel": { mn: "Байгууллага", en: "Company" },
  "contactPage.companyPlaceholder": { mn: "Байгууллагын нэр", en: "Company name" },
  "contactPage.subjectLabel": { mn: "Сэдэв", en: "Subject" },
  "contactPage.messageLabel": { mn: "Мессеж", en: "Message" },
  "contactPage.messagePlaceholder": { mn: "Таны мессеж...", en: "Your message..." },

  // About Page
  "aboutPage.badge": { mn: "Бидний тухай", en: "About Us" },
  "aboutPage.heroTitle1": { mn: "Технологийн", en: "Builders of a" },
  "aboutPage.heroHighlight": { mn: "шинэ эрин", en: "new era" },
  "aboutPage.heroTitle2": { mn: "бүтээгчид", en: "in technology" },
  "aboutPage.heroDesc": {
    mn: "2021 оноос хойш банк санхүүгийн салбарт технологийн шилдэг шийдлүүдийг бүтээж, Монголын санхүүгийн дэд бүтцийг хөгжүүлж байна.",
    en: "Since 2021, we have been building the best technology solutions in the banking and finance sector, developing Mongolia's financial infrastructure.",
  },
  "aboutPage.stat.experience": { mn: "Жилийн туршлага", en: "Years of Experience" },
  "aboutPage.stat.experienceDesc": { mn: "2021 оноос хойш", en: "Since 2021" },
  "aboutPage.stat.team": { mn: "Мэргэжлийн баг", en: "Professional Team" },
  "aboutPage.stat.teamDesc": { mn: "Туршлагатай инженерүүд", en: "Experienced Engineers" },
  "aboutPage.stat.clients": { mn: "Харилцагч", en: "Clients" },
  "aboutPage.stat.clientsDesc": { mn: "Банк, ББСБ, ХЗХ", en: "Banks, NBFIs, Credit Unions" },
  "aboutPage.stat.satisfaction": { mn: "Сэтгэл ханамж", en: "Satisfaction" },
  "aboutPage.stat.satisfactionDesc": { mn: "Харилцагчдын үнэлгээ", en: "Client Rating" },
  "aboutPage.storyBadge": { mn: "Бидний түүх", en: "Our Story" },
  "aboutPage.storyTitle": { mn: "Технологийн ирээдүйг", en: "Building the future" },
  "aboutPage.storyHighlight": { mn: "бид хамтдаа", en: "together" },
  "aboutPage.storySuffix": { mn: "бүтээнэ", en: "of technology" },
  "aboutPage.since": { mn: "2021 оноос хойш", en: "Since 2021" },
  "aboutPage.valuesBadge": { mn: "Бидний үнэт зүйлс", en: "Our Values" },
  "aboutPage.valuesTitle": { mn: "Бидний", en: "Our" },
  "aboutPage.valuesHighlight": { mn: "хөдөлгөгч хүч", en: "Driving Force" },
  "aboutPage.quality": { mn: "Чанарын баталгаа", en: "Quality Assurance" },
  "aboutPage.qualityDesc": {
    mn: "Бид хийсэн бүх ажилдаа дээд зэргийн стандартыг баримтална, кодын чанараас эхлээд харилцагчтай харилцах хүртэл.",
    en: "We uphold the highest standards in all our work, from code quality to client relations.",
  },
  "aboutPage.timelineBadge": { mn: "Бидний түүх", en: "Our History" },
  "aboutPage.timelineTitle": { mn: "Хөгжлийн", en: "Key" },
  "aboutPage.timelineHighlight": { mn: "чухал үе шатууд", en: "Milestones" },
  "aboutPage.milestone.2021": { mn: "Байгуулагдсан", en: "Founded" },
  "aboutPage.milestone.2021Desc": {
    mn: "ФИБА ХХК байгуулагдаж, банк санхүүгийн програм хангамжийн чиглэлээр үйл ажиллагаагаа эхэлсэн.",
    en: "FIBA LLC was founded and began operations in banking software development.",
  },
  "aboutPage.milestone.2022": { mn: "Анхны гэрээ", en: "First Contract" },
  "aboutPage.milestone.2022Desc": {
    mn: "Анхны томоохон банктай гэрээ байгуулж, Core Banking систем нэвтрүүлсэн.",
    en: "Signed the first major contract with a bank and implemented a Core Banking system.",
  },
  "aboutPage.milestone.2023": { mn: "Бүтээгдэхүүн өргөжилт", en: "Product Expansion" },
  "aboutPage.milestone.2023Desc": {
    mn: "MeLP зээлийн систем болон MeAPP мобайл аппликейшн гаргасан.",
    en: "Launched MeLP loan system and MeAPP mobile application.",
  },
  "aboutPage.milestone.2024": { mn: "SmartWare нэвтрүүлэлт", en: "SmartWare Launch" },
  "aboutPage.milestone.2024Desc": {
    mn: "POS терминалын шийдэл SmartWare-г зах зээлд нэвтрүүлсэн.",
    en: "Introduced the POS terminal solution SmartWare to the market.",
  },
  "aboutPage.milestone.2025": { mn: "SainScore хөгжүүлэлт", en: "SainScore Development" },
  "aboutPage.milestone.2025Desc": {
    mn: "Зээлийн мэдээллийн систем SainScore-г хөгжүүлж, санхүүгийн салбарт нэвтрүүлсэн.",
    en: "Developed and introduced the credit information system SainScore to the financial sector.",
  },
  "aboutPage.milestone.2026": { mn: "Салбарын тэргүүлэгч", en: "Industry Leader" },
  "aboutPage.milestone.2026Desc": {
    mn: "Монголын санхүүгийн технологийн салбарт тэргүүлэгч компани болсон.",
    en: "Became the leading company in Mongolia's financial technology sector.",
  },
  "aboutPage.ctaTitle": { mn: "Бидэнтэй хамтран ажиллахад бэлэн үү?", en: "Ready to work with us?" },
  "aboutPage.ctaDesc": {
    mn: "Санхүүгийн технологийн шийдлүүдийн талаар дэлгэрэнгүй мэдээлэл авах бол бидэнтэй холбогдоорой.",
    en: "Contact us to learn more about our financial technology solutions.",
  },
  "aboutPage.ctaContact": { mn: "Холбогдох", en: "Get in Touch" },
  "aboutPage.ctaProducts": { mn: "Бүтээгдэхүүн үзэх", en: "View Products" },
  "aboutPage.storyDesc1": {
    mn: "Манай компани нь 2021 онд байгуулагдсан бөгөөд, банк санхүүгийн Програм хангамж, түүний шийдэл, мэдээллийн сан зохион байгуулах, төлбөр тооцооны шийдэл боловсруулах чиглэлээр үйл ажиллагаа явуулдаг.",
    en: "Our company was founded in 2021 and specializes in banking software, solutions, database management, and payment system development.",
  },
  "aboutPage.storyDesc2": {
    mn: "Мөн банк санхүүгийн мэдээллийн систем, Програм хангамж, мэдээллийн сан болон түүний нууцлал аюулгүй байдлыг хариуцан ажиллаж байсан тухайн салбартаа олон жилийн мэдлэг туршлага хуримтлуулсан чадварлаг, бүтээлч хамт олноос бүрдэж байна.",
    en: "Our team consists of talented and creative professionals who have accumulated years of knowledge and experience in banking information systems, software, database management, and security.",
  },

  // Services Page
  "servicesPage.badge": { mn: "Бүтээгдэхүүн & Үйлчилгээ", en: "Products & Services" },
  "servicesPage.heroTitle1": { mn: "Санхүүгийн", en: "Financial" },
  "servicesPage.heroTitle2": { mn: "Технологийн Шийдлүүд", en: "Technology Solutions" },
  "servicesPage.heroDesc": {
    mn: "Олон улсын стандартад нийцсэн, найдвартай програм хангамжийн бүтээгдэхүүнүүд",
    en: "Reliable software products that meet international standards",
  },
  "servicesPage.noProducts": { mn: "Бүтээгдэхүүн олдсонгүй", en: "No products found" },
  "servicesPage.ctaBadge": { mn: "Зөвлөгөө авах", en: "Get Advice" },
  "servicesPage.ctaTitle": {
    mn: "Аль бүтээгдэхүүн тохирохоо мэдэхгүй байна уу?",
    en: "Not sure which product is right for you?",
  },
  "servicesPage.ctaDesc": {
    mn: "Манай мэргэжилтнүүд танд тохирох шийдлийг санал болгоход бэлэн байна.",
    en: "Our experts are ready to recommend the right solution for you.",
  },
  "servicesPage.ctaBtn": { mn: "Зөвлөгөө авах", en: "Get Advice" },
  "servicesPage.learnMore": { mn: "Дэлгэрэнгүй үзэх", en: "Learn More" },
  "servicesPage.featuresDesc": { mn: "-ийн гол онцлог, давуу талууд", en: " key features and advantages" },

  // Footer
  "footer.company": { mn: "Компани", en: "Company" },
  "footer.products": { mn: "Бүтээгдэхүүн", en: "Products" },
  "footer.services": { mn: "Үйлчилгээ", en: "Services" },
  "footer.copyright": { mn: "Бүх эрх хуулиар хамгаалагдсан.", en: "All rights reserved." },
  "footer.aboutUs": { mn: "Бидний тухай", en: "About Us" },
  "footer.ourTeam": { mn: "Манай баг", en: "Our Team" },
  "footer.partners": { mn: "Харилцагчид", en: "Partners" },
  "footer.contact": { mn: "Холбоо барих", en: "Contact" },
  "footer.consulting": { mn: "Зөвлөх үйлчилгээ", en: "Consulting" },
  "footer.integration": { mn: "Системийн интеграци", en: "System Integration" },
  "footer.techSupport": { mn: "Техникийн дэмжлэг", en: "Technical Support" },
  "footer.desc": {
    mn: "Банк санхүүгийн програм хангамж, төлбөр тооцооны систем, мэдээллийн сан зохион байгуулах чиглэлээр 2021 оноос үйл ажиллагаа явуулж байна.",
    en: "Operating since 2021 in banking software, payment systems, and database management.",
  },

  // Region names
  "region.ulaanbaatar": { mn: "Улаанбаатар хот", en: "Ulaanbaatar City" },
  "region.west": { mn: "Баруун бүс", en: "Western Region" },
  "region.north": { mn: "Хойд бүс", en: "Northern Region" },
  "region.khangai": { mn: "Хангайн бүс", en: "Khangai Region" },
  "region.central": { mn: "Төвийн бүс", en: "Central Region" },
  "region.gobi": { mn: "Говийн бүс", en: "Gobi Region" },
  "region.east": { mn: "Зүүн бүс", en: "Eastern Region" },

  // Partners Page
  "partnersPage.heroTitle": { mn: "Салбарын тэргүүлэгчдийн итгэлийг хүлээсэн", en: "Trusted by Industry Leaders" },
  "partnersPage.heroDesc": {
    mn: "Монголын банк, санхүүгийн байгууллагуудын 33+ харилцагчдад технологийн шийдэл, үйлчилгээг амжилттай хүргэж байна.",
    en: "Successfully delivering technology solutions and services to 33+ clients in Mongolian banks and financial institutions.",
  },
  "partnersPage.ourPartners": { mn: "Манай түншүүд", en: "Our Partners" },
  "partnersPage.totalClients": { mn: "Нийт харилцагч байгууллага", en: "Total Partner Organizations" },
  "partnersPage.clientTypes": { mn: "Харилцагчид", en: "Clients" },
  "partnersPage.clientTypesTitle": { mn: "Санхүүгийн бүх салбарт", en: "Across All Financial Sectors" },
  "partnersPage.clientTypesDesc": {
    mn: "Арилжааны банк, ББСБ, ХЗХ, лизингийн компаниуд зэрэг санхүүгийн бүх төрлийн байгууллагуудад үйлчилдэг.",
    en: "Serving all types of financial institutions including commercial banks, NBFIs, credit unions, and leasing companies.",
  },
  "partnersPage.regionalCoverage": { mn: "Бүс нутгийн хамрах хүрээ", en: "Regional Coverage" },
  "partnersPage.regionalTitle": { mn: "Монгол даяар 12 аймагт", en: "Across 12 Provinces in Mongolia" },
  "partnersPage.regionalDesc": {
    mn: "Улаанбаатараас эхлээд хөдөө орон нутаг хүртэл санхүүгийн байгууллагуудад үйлчилж байна.",
    en: "Serving financial institutions from Ulaanbaatar to rural areas.",
  },
  "partnersPage.testimonials": { mn: "Харилцагчдын сэтгэгдэл", en: "Client Testimonials" },
  "partnersPage.testimonialsTitle": { mn: "Харилцагчид юу хэлдэг вэ?", en: "What Our Clients Say?" },
  "partnersPage.becomePartner": { mn: "Түнш болох", en: "Become a Partner" },
  "partnersPage.becomePartnerTitle": { mn: "Бидэнтэй хамтрах уу?", en: "Want to Partner With Us?" },
  "partnersPage.becomePartnerDesc": {
    mn: "Технологийн түншлэлийн боломжуудын талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл бидэнтэй холбогдоорой.",
    en: "Contact us if you would like more information about technology partnership opportunities.",
  },

  // Client Types
  "clientType.bank": { mn: "Арилжааны банк", en: "Commercial Banks" },
  "clientType.bankDesc": { mn: "Монголын тэргүүлэгч арилжааны банкууд", en: "Leading commercial banks in Mongolia" },
  "clientType.nbfi": { mn: "ББСБ", en: "NBFIs" },
  "clientType.nbfiDesc": { mn: "Банк бус санхүүгийн байгууллагууд", en: "Non-bank financial institutions" },
  "clientType.creditUnion": { mn: "ХЗХ", en: "Credit Unions" },
  "clientType.creditUnionDesc": { mn: "Хадгаламж зээлийн хоршоод", en: "Savings and credit cooperatives" },
  "clientType.other": { mn: "Бусад", en: "Others" },
  "clientType.otherDesc": { mn: "Лизинг, даатгал болон бусад", en: "Leasing, insurance and others" },

  // Achievements
  "achievement.totalClients": { mn: "Нийт харилцагч", en: "Total Clients" },
  "achievement.experience": { mn: "Жилийн туршлага", en: "Years of Experience" },
  "achievement.provinces": { mn: "Аймаг хамрагдсан", en: "Provinces Covered" },
  "achievement.uptime": { mn: "Uptime найдвартай", en: "Uptime Reliability" },

  // Quick Links
  "quickLinks.title": { mn: "Хурдан холбоос", en: "Quick Links" },

  // 404
  "notFound.title": { mn: "Хуудас олдсонгүй", en: "Page not found" },
  "notFound.desc": {
    mn: "Уучлаарай! Таны хайсан хуудас олдсонгүй.",
    en: "Oops! The page you are looking for does not exist.",
  },
  "notFound.goHome": { mn: "Нүүр хуудас руу буцах", en: "Return to Home" },

  // Common
  "common.viewAll": { mn: "Бүгдийг харах", en: "View All" },
  "common.loading": { mn: "Уншиж байна...", en: "Loading..." },
  "common.error": { mn: "Алдаа гарлаа", en: "An error occurred" },
  "common.save": { mn: "Хадгалах", en: "Save" },
  "common.cancel": { mn: "Цуцлах", en: "Cancel" },
  "common.edit": { mn: "Засах", en: "Edit" },
  "common.delete": { mn: "Устгах", en: "Delete" },
  "common.add": { mn: "Нэмэх", en: "Add" },
  "common.active": { mn: "Идэвхтэй", en: "Active" },
  "common.inactive": { mn: "Идэвхгүй", en: "Inactive" },

  // Auth Page
  "auth.backToHome": { mn: "Нүүр хуудас", en: "Home" },
  "auth.adminLogin": { mn: "Админ нэвтрэх", en: "Admin Login" },
  "auth.adminLoginDesc": {
    mn: "Админ панел руу нэвтрэхийн тулд имэйл, нууц үгээ оруулна уу",
    en: "Enter your email and password to access the admin panel",
  },
  "auth.signIn": { mn: "Нэвтрэх", en: "Sign In" },
  "auth.signUp": { mn: "Бүртгүүлэх", en: "Sign Up" },
  "auth.email": { mn: "Имэйл", en: "Email" },
  "auth.password": { mn: "Нууц үг", en: "Password" },
  "auth.signingIn": { mn: "Нэвтэрч байна...", en: "Signing in..." },
  "auth.signingUp": { mn: "Бүртгүүлж байна...", en: "Signing up..." },
  "auth.successLogin": { mn: "Амжилттай нэвтэрлээ", en: "Successfully signed in" },
  "auth.successSignUp": {
    mn: "Бүртгэл амжилттай! Та нэвтрэх боломжтой.",
    en: "Registration successful! You can now sign in.",
  },
  "auth.invalidCredentials": { mn: "Имэйл эсвэл нууц үг буруу байна", en: "Invalid email or password" },
  "auth.userExists": { mn: "Энэ имэйл хаяг бүртгэлтэй байна", en: "This email is already registered" },
  "auth.emailValidation": { mn: "Зөв имэйл хаяг оруулна уу", en: "Please enter a valid email address" },
  "auth.passwordValidation": {
    mn: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой",
    en: "Password must be at least 6 characters",
  },
  "auth.adminOnly": { mn: "Зөвхөн админ эрхтэй хэрэглэгчид нэвтрэх боломжтой", en: "Only admin users can sign in" },

  // Admin Layout
  "admin.dashboard": { mn: "Хянах самбар", en: "Dashboard" },
  "admin.services": { mn: "Үйлчилгээ", en: "Services" },
  "admin.team": { mn: "Баг", en: "Team" },
  "admin.partners": { mn: "Хамтрагчид", en: "Partners" },
  "admin.signOut": { mn: "Гарах", en: "Sign Out" },
  "admin.signOutSuccess": { mn: "Амжилттай гарлаа", en: "Successfully signed out" },
  "admin.backToSite": { mn: "Вэбсайт руу буцах", en: "Back to Website" },

  // Partners Page inline texts
  "partnersPage.heroTitle1": { mn: "Салбарын", en: "" },
  "partnersPage.heroHighlight": { mn: "тэргүүлэгчдийн", en: "Trusted" },
  "partnersPage.heroTitle2": { mn: "итгэлийг хүлээсэн", en: "by Industry Leaders" },
  "partnersPage.financialAll": { mn: "Санхүүгийн", en: "Across All" },
  "partnersPage.financialHighlight": { mn: "бүх салбарт", en: "Financial Sectors" },
  "partnersPage.acrossProvinces": { mn: "Монгол даяар", en: "Across" },
  "partnersPage.provincesHighlight": { mn: "12 аймагт", en: "12 Provinces in Mongolia" },
  "partnersPage.clientsSay": { mn: "Харилцагчид", en: "What Our" },
  "partnersPage.clientsSayHighlight": { mn: "юу хэлдэг вэ?", en: "Clients Say?" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  if (browserLang.startsWith("mn")) return "mn";
  if (browserLang.startsWith("en")) return "en";
  return "mn"; // fallback to Mongolian
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    if (saved === "mn" || saved === "en") return saved;
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
