"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { useTheme } from "@/context/ThemeContext";

export default function AboutPlatform() {
  const { colors } = useTheme();

  const features = [
    {
      title: "Pentru Administratori",
      description: "Gestionezi toate aspectele asociației dintr-un singur loc",
      points: [
        "Gestiunea facturilor și cheltuielilor",
        "Comunicare eficientă cu proprietarii",
        "Rapoarte financiare automate",
        "Arhivare digitală documente",
      ],
      image: "/admin_left.png",
      id: 1,
    },
    {
      title: "Pentru Proprietari",
      description: "Acces transparent la toate informațiile importante",
      points: [
        "Vizualizare facturi și restanțe",
        "Istoric plăți și cheltuieli",
        "Comunicare directă cu administratorul",
        "Notificări importante",
      ],
      image: "/adimo_right.png",
      id: 2,
    },
  ];

  return (
    <section id="platform" className="section-padding bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            O platformă concepută pentru{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              toți participanții
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ADIMO oferă soluții dedicate atât administratorilor, cât și
            proprietarilor, asigurând transparență și eficiență în gestionarea
            asociațiilor.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card
                className="p-8 h-full flex flex-col justify-center align-middle text-center"
                hover
              >
                <div className="mb-6" style={{ margin: "0 auto" }}>
                  <Image
                    src={
                      feature?.id === 1 ? "/adimo_left.png" : "/adimo_right.png"
                    }
                    alt={feature.title}
                    width={400}
                    height={250}
                    className="rounded-lg shadow-md"
                  />
                </div>
                <h3
                  className="text-2xl font-bold mb-4 transition-colors duration-500"
                  style={{ color: colors.primary[700] }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 transition-colors duration-500"
                        style={{ color: colors.primary[600] }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Accent decorativ pentru temă */}
                <div className="mt-6 flex justify-center">
                  <div
                    className="w-12 h-1 rounded-full transition-all duration-500"
                    style={{ backgroundColor: colors.primary[600] }}
                  ></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
