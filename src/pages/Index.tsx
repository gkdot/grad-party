import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DetailsSection from "@/components/DetailsSection";
import DressCodeSection from "@/components/DressCodeSection";
import MenuSection from "@/components/MenuSection";
import FAQSection from "@/components/FAQSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="section-divider" />
      <DetailsSection />
      <DressCodeSection />
      <div className="section-divider" />
      <MenuSection />
      <FAQSection />
      <div className="section-divider" />
      <RSVPSection />
      <Footer />
    </div>
  );
};

export default Index;
