"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { colors } = useTheme();

  // Definim stilurile inline pentru gradient
  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${colors.primary[600]}, ${colors.primary[900]})`,
  };

  const overlayStyle = {
    background: `linear-gradient(to top, ${colors.primary[900]}33, transparent)`,
  };

  return (
    <section
      id="hero"
      className="text-white section-padding pt-32 transition-all duration-500"
      style={gradientStyle}
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Administrarea asociațiilor de locatari,{" "}
              <span
                className="transition-colors duration-500"
                style={{ color: colors.secondary[300] }}
              >
                simplificată digital
              </span>
            </h1>
            <p
              className="text-xl mb-8 leading-relaxed transition-colors duration-500"
              style={{ color: colors.primary[100] }}
            >
              ADIMO este soluția gratuită care transformă gestionarea
              asociațiilor de locatari. Facturi, cheltuieli, comunicare - totul
              într-un singur loc, accesibil și eficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.open("https://www.google.com", "_blank")}
              >
                Accesează aplicația
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("platform")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-white text-white hover:bg-white transition-colors duration-200"
                style={
                  {
                    "--hover-text-color": colors.primary[600],
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "white";
                }}
              >
                Află mai multe
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Imaginea principală */}
            <div className="relative mb-6">
              <Image
                src="/adimo_hero_image.png"
                alt="ADIMO Dashboard Preview"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div
                className="absolute inset-0 rounded-lg transition-all duration-500"
                style={overlayStyle}
              />
            </div>

            {/* Badge-urile Google Play și App Store */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="transform hover:scale-105 transition-transform duration-200">
                <Image
                  src="/google-play2.svg"
                  alt="Google Play"
                  width={140}
                  height={42}
                  onClick={() =>
                    window.open("https://play.google.com", "_blank")
                  }
                  className="cursor-pointer drop-shadow-lg hover:drop-shadow-xl transition-all duration-200"
                />
              </div>

              <div className="transform hover:scale-105 transition-transform duration-200">
                <Image
                  src="/app-store.svg"
                  alt="App Store"
                  width={140}
                  height={42}
                  onClick={() =>
                    window.open("https://www.apple.com/app-store/", "_blank")
                  }
                  className="cursor-pointer drop-shadow-lg hover:drop-shadow-xl transition-all duration-200"
                />
              </div>
            </motion.div>

            {/* Indicator pentru tema curentă */}
            <div className="absolute top-4 left-4 opacity-20">
              <div
                className="w-3 h-3 rounded-full animate-pulse transition-colors duration-500"
                style={{ backgroundColor: colors.secondary[300] }}
              ></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
