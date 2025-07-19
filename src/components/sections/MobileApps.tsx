"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { useTheme } from "@/context/ThemeContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MobileApps() {
  const { colors } = useTheme();

  // Definim stilurile pentru background gradient
  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${colors.primary[50]}, ${colors.secondary[50]})`,
  };

  const slides = [
    {
      id: "mobile",
      title: "Aplicația mobilă",
      titleHighlight: "ADIMO",
      description:
        "Accesează toate funcționalitățile ADIMO direct de pe telefon. Disponibilă gratuit pentru Android și iOS.",
      features: [
        {
          title: "Notificări Instant",
          description:
            "Primești notificări pentru facturi noi, plăți și anunțuri importante.",
        },
        {
          title: "Plăți Rapide",
          description:
            "Plătește facturile direct din aplicație cu câteva touch-uri.",
        },
        {
          title: "Comunicare Directă",
          description:
            "Comunică cu administratorul și cu ceilalți proprietari.",
        },
        {
          title: "Offline Mode",
          description:
            "Consultă informațiile importante chiar și fără internet.",
        },
      ],
      buttons: [
        {
          text: "",
          variant: "primary" as const,
          icon: "/google-play2.svg",
          link: "https://play.google.com",
        },
        {
          text: "App Store",
          variant: "secondary" as const,
          icon: "/app-store.svg",
          link: "https://apps.apple.com",
        },
      ],
      image: {
        src: "/mobile_wrap.png",
        alt: "ADIMO Mobile App",
        width: 300,
        height: 600,
        className: "w-full h-auto max-w-sm mx-auto",
      },
    },
    {
      id: "desktop",
      title: "Platforma web",
      titleHighlight: "ADIMO",
      description:
        "Experiența completă ADIMO pe desktop. Funcționalități avansate pentru administratori și proprietari.",
      features: [
        {
          title: "Dashboard Complet",
          description:
            "Vizualizare detaliată a tuturor aspectelor asociației pe ecran mare.",
        },
        {
          title: "Rapoarte Avansate",
          description:
            "Generează și exportă rapoarte financiare complexe cu un click.",
        },
        {
          title: "Management Documente",
          description:
            "Organizează și arhivează toate documentele într-un sistem ierarhic.",
        },
        {
          title: "Multi-tasking",
          description:
            "Lucrează simultan pe mai multe funcționalități deschise în taburi.",
        },
      ],
      buttons: [
        {
          text: "Accesează platforma",
          variant: "primary" as const,
          icon: null,
          link: "https://www.google.com",
        },
        {
          text: "Programează demo",
          variant: "secondary" as const,
          icon: null,
          link: "https://www.google.com",
        },
      ],
      image: {
        src: "/desktop_wrap.png",
        alt: "ADIMO Desktop Platform",
        width: 600,
        height: 400,
        className: "w-full h-auto",
      },
    },
  ];

  return (
    <section
      id="mobile-apps"
      className="section-padding transition-all duration-500"
      style={gradientStyle}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Accesează{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              ADIMO
            </span>{" "}
            oriunde
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pe telefon sau desktop, experiența ADIMO este optimizată pentru
            fiecare dispozitiv.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
            }}
            className="apps-slider"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                      {slide.title}{" "}
                      <span
                        className="transition-colors duration-500"
                        style={{ color: colors.primary[600] }}
                      >
                        {slide.titleHighlight}
                      </span>
                    </h3>
                    <p className="text-xl text-gray-600 mb-8">
                      {slide.description}
                    </p>

                    <div className="space-y-6 mb-8">
                      {slide.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-3 mr-4 flex-shrink-0 transition-colors duration-500"
                            style={{ backgroundColor: colors.primary[600] }}
                          ></div>
                          <div>
                            <h4 className="font-semibold text-lg mb-2">
                              {feature.title}
                            </h4>
                            <p className="text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      {slide.buttons.map((button, index) => {
                        return button.icon === null ? (
                          <Button
                            key={index}
                            variant={button.variant}
                            onClick={() => window.open(button.link, "_blank")}
                            className="flex items-center justify-center"
                          >
                            {button.text}
                          </Button>
                        ) : (
                          <div
                            key={index}
                            className="transform hover:scale-105 transition-transform duration-200"
                          >
                            <Image
                              src={button.icon}
                              alt={button.text}
                              width={140}
                              height={42}
                              onClick={() => window.open(button.link, "_blank")}
                              className="cursor-pointer drop-shadow-lg hover:drop-shadow-xl transition-all duration-200"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div
                      className={`relative ${
                        slide.id === "mobile" ? "max-w-sm mx-auto" : ""
                      }`}
                    >
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        width={slide.image.width}
                        height={slide.image.height}
                        className={slide.image.className}
                      />
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation și pagination */}
          <div className="flex justify-center items-center mt-8 gap-6">
            <button
              className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{
                boxShadow: `0 4px 12px ${colors.primary[600]}20`,
              }}
            >
              <svg
                className="w-5 h-5 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="swiper-pagination-custom flex gap-2"></div>

            <button
              className="swiper-button-next-custom w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              style={{
                boxShadow: `0 4px 12px ${colors.primary[600]}20`,
              }}
            >
              <svg
                className="w-5 h-5 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </Container>

      <style jsx global>{`
        .apps-slider .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          border-radius: 50%;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .apps-slider
          .swiper-pagination-custom
          .swiper-pagination-bullet-active {
          background: ${colors.primary[600]};
          transform: scale(1.2);
        }

        .apps-slider .swiper-slide {
          padding: 20px 0;
        }
      `}</style>
    </section>
  );
}
