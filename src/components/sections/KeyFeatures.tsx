"use client";
import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  FolderOpenIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { useTheme } from "@/context/ThemeContext";

export default function KeyFeatures() {
  const { colors } = useTheme();

  const features = [
    {
      id: 1,
      title: "Gestionare Facturi",
      description:
        "Creare automată și distribuire facturi către proprietari cu tracking complet al plăților.",
      icon: DocumentTextIcon,
      themeColor: "primary", // Va folosi culoarea principală a temei
    },
    {
      id: 2,
      title: "Rapoarte Financiare",
      description:
        "Analize detaliate și rapoarte financiare automate cu grafice și statistici.",
      icon: ChartBarIcon,
      themeColor: "secondary", // Va folosi culoarea secundară a temei
    },
    {
      id: 3,
      title: "Comunicare Eficientă",
      description:
        "Sistem de mesagerie și notificări pentru comunicarea cu toți membrii asociației.",
      icon: ChatBubbleLeftRightIcon,
      themeColor: "primary", // Va folosi culoarea principală a temei
    },
    {
      id: 4,
      title: "Arhivă Digitală",
      description:
        "Stocare securizată a tuturor documentelor importante cu sistem de căutare.",
      icon: FolderOpenIcon,
      themeColor: "orange", // Rămâne portocaliu pentru consistență
    },
    {
      id: 5,
      title: "Monitorizare Plăți",
      description:
        "Tracking în timp real al plăților și restanțelor cu alerte automate.",
      icon: CreditCardIcon,
      themeColor: "secondary", // Va folosi culoarea secundară a temei
    },
    {
      id: 6,
      title: "Întreținere Preventivă",
      description:
        "Planificare și monitorizare lucrări de întreținere cu calendar integrat.",
      icon: WrenchScrewdriverIcon,
      themeColor: "primary", // Va folosi culoarea principală a temei
    },
  ];

  // Funcție pentru a obține culorile în funcție de themeColor
  const getFeatureColors = (themeColor: string) => {
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

  // Stilurile pentru butonul CTA
  const ctaButtonStyle = {
    backgroundColor: colors.primary[600],
    color: "white",
  };

  return (
    <section id="features" className="section-padding bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Funcționalități{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              complete
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Toate instrumentele necesare pentru administrarea eficientă a
            asociației tale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const featureColors = getFeatureColors(feature.themeColor);

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full text-center" hover>
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500"
                    style={{
                      backgroundColor: featureColors.background,
                      color: featureColors.color,
                    }}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Progress indicator pentru feature */}
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((dot, dotIndex) => (
                        <div
                          key={dotIndex}
                          className="w-2 h-2 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor:
                              dotIndex < 4 ? featureColors.color : "#e5e7eb",
                            opacity: dotIndex < 4 ? 1 : 0.3,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Și multe altele... Descoperă toate funcționalitățile în aplicație!
          </p>
          <button
            onClick={() => window.open("https://www.google.com", "_blank")}
            className="font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={ctaButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[700];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
            }}
          >
            Explorează toate funcționalitățile
          </button>

          {/* Statistici quick sub CTA */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
              >
                50+
              </div>
              <div className="text-gray-600">Funcționalități Available</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.secondary[600] }}
              >
                24/7
              </div>
              <div className="text-gray-600">Suport Tehnic</div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
              >
                100%
              </div>
              <div className="text-gray-600">Cloud Based</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
