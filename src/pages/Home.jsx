import CustomCursor from "@/components/CustomCursor";
import ScrollThread from "@/components/ScrollThread";
import NavDots from "@/components/NavDots";
import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/ScheduleSection";
import MenuSection from "@/components/MenuSection";
import DressCodeSection from "@/components/DressCodeSection";
import FaqSection from "@/components/FaqSection";
import RsvpSection from "@/components/RsvpSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0B" }}>
      <CustomCursor />
      <ScrollThread />
      <NavDots />

      <HeroSection />

      {/* Hairline divider */}
      <div style={{ height: "0.5px", backgroundColor: "rgba(203,163,92,0.15)", margin: "0 40px" }} />

      <ScheduleSection />

      <div style={{ height: "0.5px", backgroundColor: "rgba(203,163,92,0.15)", margin: "0 40px" }} />

      <MenuSection />

      <div style={{ height: "0.5px", backgroundColor: "rgba(203,163,92,0.15)", margin: "0 40px" }} />

      <DressCodeSection />

      <div style={{ height: "0.5px", backgroundColor: "rgba(203,163,92,0.15)", margin: "0 40px" }} />

      <FaqSection />

      <div style={{ height: "0.5px", backgroundColor: "rgba(203,163,92,0.15)", margin: "0 40px" }} />

      <RsvpSection />

      <FooterSection />
    </div>
  );
}