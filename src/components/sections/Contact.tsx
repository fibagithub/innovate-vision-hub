import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Мессеж илгээгдлээ!",
      description: "Бид тантай 24 цагийн дотор холбогдох болно.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section className="py-24 bg-background" id="contact">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
            Холбоо барих
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Бидэнтэй холбогдоорой
          </h2>
          <p className="text-muted-foreground text-lg">
            Танд туслахад бэлэн байна. Асуулт, санал хүсэлтээ бидэнд илгээнэ үү.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-3xl border border-border p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Бүтэн нэр
                  </label>
                  <Input
                    type="text"
                    placeholder="Таны нэр"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Имэйл хаяг
                  </label>
                  <Input
                    type="email"
                    placeholder="info@company.mn"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Байгууллага
                </label>
                <Input
                  type="text"
                  placeholder="Таны байгууллагын нэр"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Мессеж
                </label>
                <Textarea
                  placeholder="Таны асуулт, санал хүсэлт..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" variant="gradient" size="lg" className="w-full">
                Илгээх
                <Send className="ml-2" size={18} />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Имэйл</h3>
                <a href="mailto:contact@fiba.mn" className="text-muted-foreground hover:text-primary transition-colors">
                  contact@fiba.mn
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Утас</h3>
                <a href="tel:+97675092211" className="text-muted-foreground hover:text-primary transition-colors">
                  +976-7509-2211
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Вэбсайт</h3>
                <a href="https://www.fiba.mn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  www.fiba.mn
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">Ажлын цаг</h3>
                <p className="text-muted-foreground">Даваа - Баасан: 9:00 - 18:00</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">Хаяг</h3>
                  <p className="text-muted-foreground">
                    Монгол улс, Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо, Үйлдвэр, Богд жавзан дамба гудамж 12 байр, 1 тоот
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
