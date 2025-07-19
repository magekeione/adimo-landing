"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { useTheme } from "@/context/ThemeContext";

export default function KeyBenefits() {
  const { colors } = useTheme();

  const benefits = [
    {
      id: 1,
      title: "Complet Gratuit",
      description:
        "Fără costuri ascunse sau abonamente. ADIMO este 100% gratuit pentru toate asociațiile.",
      icon: "/free.png",
      themeColor: "green", // Aceasta rămâne verde pentru că este despre "gratuit"
    },
    {
      id: 2,
      title: "Cloud & Securitate",
      description:
        "Datele tale sunt securizate în cloud, accesibile oricând, de oriunde.",
      icon: "/cyber-security.png",
      themeColor: "primary", // Acest card va folosi culoarea principală a temei
    },
    {
      id: 3,
      title: "Economie de Timp",
      description:
        "Automatizează procesele repetitive și economisește ore întregi lunar.",
      icon: "/real-time.png",
      themeColor: "secondary", // Acest card va folosi culoarea secundară a temei
    },
    {
      id: 4,
      title: "Suport Dedicat",
      description:
        "Echipa noastră te ajută cu implementarea și răspunde la întrebări.",
      icon: "/customer-support.png",
      themeColor: "orange", // Rămâne portocaliu pentru consistență
    },
    {
      id: 5,
      title: "Transparență Totală",
      description:
        "Proprietarii văd toate cheltuielile și facturile în timp real.",
      icon: "/transparency.png",
      themeColor: "primary", // Va folosi culoarea principală
    },
    {
      id: 6,
      title: "Fără Instalare",
      description:
        "Funcționează direct în browser, fără să instalezi software suplimentar.",
      icon: "/coder.png",
      themeColor: "secondary", // Va folosi culoarea secundară
    },
  ];

  // Funcție pentru a obține culorile în funcție de themeColor
  const getCardColors = (themeColor: string) => {
    switch (themeColor) {
      case "primary":
        return {
          background: `${colors.primary[600]}20`, // 20% opacity
          color: colors.primary[600],
        };
      case "secondary":
        return {
          background: `${colors.secondary[600]}20`, // 20% opacity
          color: colors.secondary[600],
        };
      case "green":
        return {
          background: "#dcfce7", // green-100
          color: "#16a34a", // green-600
        };
      case "orange":
        return {
          background: "#fed7aa", // orange-100
          color: "#ea580c", // orange-600
        };
      default:
        return {
          background: `${colors.primary[600]}20`,
          color: colors.primary[600],
        };
    }
  };

  return (
    <section id="benefits" className="section-padding bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            De ce să alegi{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              ADIMO
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beneficiile care fac diferența în gestionarea asociațiilor de
            locatari.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const cardColors = getCardColors(benefit.themeColor);

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full" hover>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500"
                    style={{
                      backgroundColor: cardColors.background,
                      color: cardColors.color,
                    }}
                  >
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Accent line care se colorează conform temei */}
                  <div className="flex justify-center">
                    <div
                      className="w-8 h-1 rounded-full transition-all duration-500"
                      style={{ backgroundColor: cardColors.color }}
                    ></div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
