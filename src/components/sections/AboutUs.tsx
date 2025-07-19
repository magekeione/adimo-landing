"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { useTheme } from "@/context/ThemeContext";

export default function AboutUs() {
  const { colors } = useTheme();

  const stats = [
    { number: "10+", label: "Asociații active", themeColor: "primary" },
    {
      number: "3000+",
      label: "Proprietari mulțumiți",
      themeColor: "secondary",
    },
    { number: "35K+", label: "Facturi procesate", themeColor: "primary" },
    { number: "99.9%", label: "Uptime garantat", themeColor: "secondary" },
  ];

  const teamValues = [
    {
      title: "Inovație",
      description:
        "Dezvoltăm constant soluții noi pentru a răspunde nevoilor în continuă schimbare.",
      icon: "🚀",
      themeColor: "primary",
    },
    {
      title: "Transparență",
      description:
        "Credem în comunicarea deschisă și procese clare pentru toți utilizatorii.",
      icon: "🔍",
      themeColor: "secondary",
    },
    {
      title: "Suport",
      description:
        "Echipa noastră este mereu disponibilă pentru a ajuta utilizatorii.",
      icon: "🤝",
      themeColor: "primary",
    },
  ];

  // Funcție pentru a obține culorile în funcție de themeColor
  const getThemeColor = (themeColor: string) => {
    return themeColor === "primary"
      ? colors.primary[600]
      : colors.secondary[600];
  };

  // Funcție pentru a obține background color cu opacity
  const getBackgroundColor = (themeColor: string) => {
    return themeColor === "primary"
      ? `${colors.primary[600]}20`
      : `${colors.secondary[600]}20`;
  };

  return (
    <section id="about" className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Despre{" "}
              <span
                className="transition-colors duration-500"
                style={{ color: colors.primary[600] }}
              >
                ADIMO
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              ADIMO a fost creată din dorința de a simplifica gestionarea
              asociațiilor de locatari din România. Fondată de o echipă de
              dezvoltatori cu experiență în domeniul imobiliar și tehnologie,
              platforma noastră răspunde nevoilor reale ale administratorilor și
              proprietarilor.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Misiunea noastră este să digitalizăm complet procesul de
              administrare, oferind transparență totală și eficiență maximă
              pentru toate părțile implicate.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 rounded-lg transition-all duration-500"
                  style={{
                    backgroundColor: getBackgroundColor(stat.themeColor),
                  }}
                >
                  <div
                    className="text-3xl font-bold mb-2 transition-colors duration-500"
                    style={{ color: getThemeColor(stat.themeColor) }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>

                  {/* Progress indicator decorativ */}
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: getThemeColor(stat.themeColor),
                        width: `${75 + index * 5}%`, // Width crescător
                      }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Image
              src="/team.png"
              alt="Echipa ADIMO"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />

            {/* Overlay decorativ cu gradient dinamic */}
            <div
              className="absolute inset-0 rounded-lg opacity-10 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.secondary[600]})`,
              }}
            ></div>

            {/* Badge floating pentru echipă */}
            <div className="absolute top-4 right-4">
              <div
                className="px-3 py-1 rounded-full text-sm font-medium text-white transition-all duration-500"
                style={{ backgroundColor: colors.primary[600] }}
              >
                💼 Echipa ADIMO
              </div>
            </div>

            {/* Stats mini în colțul din stânga jos */}
            <div className="absolute bottom-4 left-4">
              <div
                className="px-3 py-2 rounded-lg text-white font-medium transition-all duration-500"
                style={{ backgroundColor: `${colors.secondary[600]}CC` }} // CC = 80% opacity
              >
                <div className="text-lg font-bold">15+</div>
                <div className="text-xs">Membri echipă</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-center mb-12">
            Valorile noastre
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center relative overflow-hidden"
                hover
              >
                {/* Background decorativ pentru fiecare card */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 transition-all duration-500"
                  style={{
                    backgroundColor: getThemeColor(value.themeColor),
                    transform: "translate(25%, -25%)",
                  }}
                ></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4
                    className="text-xl font-bold mb-4 transition-colors duration-500"
                    style={{ color: getThemeColor(value.themeColor) }}
                  >
                    {value.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{value.description}</p>

                  {/* Accent line */}
                  <div className="flex justify-center">
                    <div
                      className="w-12 h-1 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: getThemeColor(value.themeColor),
                      }}
                    ></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
