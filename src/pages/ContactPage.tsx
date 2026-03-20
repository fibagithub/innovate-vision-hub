import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Globe, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", subject: "", message: "" });

  const contactInfo = [
    { icon: Mail, title: t("contact.emailLabel"), details: ["contact@fiba.mn"], gradient: "from-primary to-[#2563eb]" },
    {
      icon: Phone,
      title: t("contact.phoneLabel"),
      details: ["+976 7509-2211"],
      gradient: "from-[#7c3aed] to-[#a855f7]",
    },
    {
      icon: MapPin,
      title: t("contact.address"),
      details: [t("contact.addressValue")],
      gradient: "from-[#059669] to-[#34d399]",
    },
    {
      icon: Clock,
      title: t("contact.workHours"),
      details: [t("contact.workHoursValue")],
      gradient: "from-[#f59e0b] to-[#fbbf24]",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-background">
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
              <span className="text-primary text-sm font-semibold tracking-wide">{t("contact.badge")}</span>
            </div>
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              {t("contactPage.heroTitle")} <span className="gradient-text">{t("contactPage.heroHighlight")}</span>
            </h1>
            <p
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {t("contactPage.heroDesc")}
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

      {/* Form & Sidebar */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(25,60,105,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(25,60,105,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="relative p-8 lg:p-12 rounded-[2.5rem] bg-card border border-border/50 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-[#2563eb]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium text-sm">{t("contactPage.sendMsg")}</span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
                    {t("contactPage.writeToUs")}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contactPage.nameLabel")} *
                        </label>
                        <Input
                          type="text"
                          placeholder={t("contact.namePlaceholder")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contactPage.emailLabel")} *
                        </label>
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
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {t("contactPage.companyLabel")}
                        </label>
                        <Input
                          type="text"
                          placeholder={t("contactPage.companyPlaceholder")}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="h-12 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("contact.phone")}</label>
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
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("contactPage.subjectLabel")} *
                      </label>
                      <Input
                        type="text"
                        placeholder={t("contact.subjectPlaceholder")}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {t("contactPage.messageLabel")} *
                      </label>
                      <Textarea
                        placeholder={t("contactPage.messagePlaceholder")}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="rounded-xl"
                      />
                    </div>
                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      {t("contact.sendMessage")}
                      <Send className="ml-2" size={18} />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="relative p-8 rounded-[2rem] bg-card border border-border/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium text-sm">{t("contactPage.quickLinks")}</span>
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
        <div className="h-64 rounded-2xl overflow-hidden border border-border">
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
      </section>
    </Layout>
  );
};

export default ContactPage;
