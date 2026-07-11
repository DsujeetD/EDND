import { Header } from "../components/site/Header";
import { Ticker } from "../components/site/Ticker";
import { Hero } from "../components/site/Hero";
import { FeaturedGrid } from "../components/site/FeaturedGrid";
import { Stats } from "../components/site/Stats";
import { Marquee } from "../components/site/Marquee";
import { DeployList } from "../components/site/DeployList";
import { Presence } from "../components/site/Presence";
import { Process, ClientsMarquee } from "../components/site/Process";
import { CTABlock, ContactSection } from "../components/site/Contact";
import { Footer } from "../components/site/Footer";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Header />
      <Ticker />
      <Hero />
      <FeaturedGrid />
      <Stats />
      <Marquee />
      <DeployList />
      <Presence />
      <Process />
      <ClientsMarquee />
      <CTABlock />
      <ContactSection />
      <Footer />
    </div>
  );
}
