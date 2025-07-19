import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutPlatform from "@/components/sections/AboutPlatform";
import MobileApps from "@/components/sections/MobileApps";
import KeyBenefits from "@/components/sections/KeyBenefits";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutPlatform />
        <MobileApps />
        <KeyBenefits />
      </main>
      <Footer />
    </>
  );
}
