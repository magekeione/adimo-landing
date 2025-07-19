import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Screenshots from "@/components/sections/Screenshots";
import Testimonials from "@/components/sections/Testimonials";
import KeyFeatures from "@/components/sections/KeyFeatures";
import News from "@/components/sections/News";
import HeroClient from "@/components/sections/HeroClient";

export const metadata = {
  title: "Platforma ADIMO - Funcționalități și Capturi de Ecran",
  description:
    "Descoperă funcționalitățile complete ale platformei ADIMO prin capturi de ecran și testimoniale de la utilizatori.",
};

export default function PlatformaPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <HeroClient />
        <Screenshots />
        <KeyFeatures />
        <Testimonials />
        <News />
      </main>
      <Footer />
    </>
  );
}
