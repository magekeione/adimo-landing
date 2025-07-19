"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/sections/Contact";
import { useTheme } from "@/context/ThemeContext";

export default function ContactPage() {
  const { colors } = useTheme();

  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${colors.primary[600]}, ${colors.primary[900]})`,
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero section pentru contact */}
        <section
          className="text-white py-16 transition-all duration-500"
          style={gradientStyle}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              <span
                className="transition-colors duration-500"
                style={{ color: colors.secondary[300] }}
              >
                Contactează-ne
              </span>
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto transition-colors duration-500"
              style={{ color: colors.primary[100] }}
            >
              Suntem aici să răspundem la întrebările tale și să te ajutăm să
              implementezi ADIMO în asociația ta.
            </p>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
