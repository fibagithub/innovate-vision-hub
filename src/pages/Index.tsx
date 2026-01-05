import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { About } from '@/components/sections/About';
import { Team } from '@/components/sections/Team';
import { Partners } from '@/components/sections/Partners';
import { Contact } from '@/components/sections/Contact';
import { QuickLinks } from '@/components/sections/QuickLinks';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <WhyChooseUs />
      <About />
      <Team />
      <Partners />
      <QuickLinks />
      <Contact />
    </Layout>
  );
};

export default Index;
