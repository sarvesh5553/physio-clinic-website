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
      
      {/* 
        Tip: Make sure inside your components/Hero.tsx file, 
        your main heading (H1) and introductory paragraphs include terms like:
        - "Best Physiotherapy in Pune"
        - "Physiotherapist in Pune"
        - "Dr. Bhagyashree Salunke"
      */}
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