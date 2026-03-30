import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import EventDetails from '../components/EventDetails';
// import MenuSection from '../components/MenuSection';
import FAQSection from '../components/FAQSection';
import RSVPSection from '../components/RSVPSection';
// import TimelineSection from '../components/TimelineSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-body bg-white">
      <Navbar />
      <Hero />
      <EventDetails />
      {/* <MenuSection /> */}
      {/* <TimelineSection /> */}
      <FAQSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}