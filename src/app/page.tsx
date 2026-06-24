import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutDoctor from "@/components/AboutDoctor";
import ConditionsServices from "@/components/ConditionsServices";
import TreatmentProcess from "@/components/TreatmentProcess";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <AboutDoctor />
      <ConditionsServices />
      <TreatmentProcess />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}