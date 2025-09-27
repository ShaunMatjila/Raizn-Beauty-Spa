import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import FooterSection from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Navbar />
      <Services />
      <AboutUs />
      <ContactUs />
      <FooterSection />
      <WhatsAppWidget />
    </main>
  );
}
