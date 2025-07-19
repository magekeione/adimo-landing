"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUs from "@/components/sections/AboutUs";
import FAQ from "@/components/sections/FAQ";
import { useTheme } from "@/context/ThemeContext";

export default function DespreNoiPage() {
  const { colors } = useTheme();

  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${colors.primary[600]}, ${colors.primary[900]})`,
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <section
          className="text-white py-16 transition-all duration-500"
          style={gradientStyle}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Despre{" "}
              <span
                className="transition-colors duration-500"
                style={{ color: colors.secondary[300] }}
              >
                ADIMO
              </span>
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto transition-colors duration-500"
              style={{ color: colors.primary[100] }}
            >
              Cunoaște echipa din spatele platformei care revoluționează
              administrarea asociațiilor de locatari din România.
            </p>
          </div>
        </section>

        <AboutUs />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
