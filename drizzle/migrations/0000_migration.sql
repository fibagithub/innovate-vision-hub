UPDATE public.services SET
 features = ARRAY['Contactless','EMV Standard','EMV Chip','QR Payment','Card Payment','Terminal Integration'],
 features_mn = ARRAY['EMV чип','Зайнаас уншуулах (contactless)','QR төлбөр','Картын төлбөр','Терминал интеграц'],
 usage_metric = 'PCI DSS Standard|Transaction Time < 2s|Since 2021',
 usage_metric_mn = 'PCI DSS Стандарт|< 2s Гүйлгээ хугацаа|2021 оноос хойш'
WHERE name='SmartWare';
UPDATE public.services SET
 features_mn = ARRAY['Зээлийн түүх','Зээлийн оноо','Эрсдэлийн үнэлгээ','Зээлийн мэдээлэл','Лавлагаа']
WHERE name='SainScore';
UPDATE public.services SET
 benefits = '[{"title":"Ready integrations with Mongolbank, KHUR, E-Barimt and more","description":""},{"title":"Reduce Errors Through Automation","description":""},{"title":"Real-Time Monitoring","description":""},{"title":"Scalable Architecture","description":""}]'::jsonb,
 benefits_mn = '[{"title":"Монголбанк, ХУР, И-Баримт зэрэг системүүдтэй бэлэн холболт","description":""},{"title":"Автоматжуулалтаар алдаа багасна","description":""},{"title":"Мэдээллийг бодит цагт хянах боломж","description":""},{"title":"Өргөтгөх боломжтой архитектур","description":""}]'::jsonb,
 usage_metric = '24/7 Support|Since 2021|{clients}+ Organizations',
 usage_metric_mn = '24/7 Дэмжлэг|2021 оноос хойш|{clients}+ Байгууллага'
WHERE name='MeCore';