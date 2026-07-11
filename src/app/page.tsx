
import Blogs from "@/components/Blogs";
import FAQ from "@/components/FAQ";
import Features from "@/components/Feauture";
import HeroSection from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import Services from "@/components/Servics";
import Statistics from "@/components/StatisticsSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="w-full bg-[#f4f7fa] relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />
      <HeroSection />
      <Features></Features>
      <Statistics />
      <Services />
      <Testimonials />
      <Blogs />
      <FAQ />
      <Newsletter />
    </div>
  );
}
