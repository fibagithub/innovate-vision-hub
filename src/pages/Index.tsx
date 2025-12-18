import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Team } from '@/components/sections/Team';
import { Partners } from '@/components/sections/Partners';
import { Contact } from '@/components/sections/Contact';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Team />
      <Partners />
      <Contact />
    </Layout>
  );
};

export default Index;
