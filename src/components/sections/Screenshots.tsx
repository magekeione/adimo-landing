"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Container from "../ui/Container";
import { useTheme } from "@/context/ThemeContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Screenshots() {
  const { colors } = useTheme();

  const screenshots = [
    {
      id: 1,
      title: "Dashboard Principal",
      description: "Vizualizare completă a stării asociației",
      image: "/screen_1.png",
      device: "desktop",
      pill: "new feature",
    },
    {
      id: 2,
      title: "Gestionare Facturi",
      description: "Creare și gestionare facturi automate",
      image: "/screen_3.png",
      device: "desktop",
      pill: "new feature",
    },
    {
      id: 3,
      title: "Aplicație Mobilă",
      description: "Acces complet de pe telefon",
      image: "/screen_2.png",
      device: "mobile",
      pill: "improved experience",
    },
    {
      id: 4,
      title: "Rapoarte Financiare",
      description: "Analize detaliate și rapoarte",
      image: "/screen_4.png",
      device: "desktop",
      pill: "new feature",
    },
  ];

  // Funcție pentru a obține stilurile badge-urilor în funcție de tip
  const getBadgeStyles = (device: string, pill: string) => {
    if (device === "mobile") {
      return {
        backgroundColor: `${colors.secondary[600]}20`, // 20% opacity
        color: colors.secondary[600],
      };
    } else {
      return {
        backgroundColor: `${colors.primary[600]}20`, // 20% opacity
        color: colors.primary[600],
      };
    }
  };

  return (
    <section id="screenshots" className="section-padding bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Interfața{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              intuitivă
            </span>{" "}
            și{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              modernă
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorează interfața ADIMO - designed pentru ușurința în utilizare
            și eficiența maximă.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-screenshots",
              prevEl: ".swiper-button-prev-screenshots",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-screenshots",
            }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="screenshots-swiper"
          >
            {screenshots.map((screenshot) => {
              const badgeStyles = getBadgeStyles(
                screenshot.device,
                screenshot.pill
              );

              return (
                <SwiperSlide key={screenshot.id}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <Image
                        src={screenshot.image}
                        alt={screenshot.title}
                        width={screenshot.device === "mobile" ? 300 : 500}
                        height={screenshot.device === "mobile" ? 600 : 350}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs transition-all duration-500 font-semibold"
                          style={badgeStyles}
                        >
                          {screenshot.device === "mobile"
                            ? "Improved"
                            : "New Feature"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {screenshot.description}
                      </p>

                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="h-1 rounded-full transition-all duration-500"
                          style={{
                            backgroundColor: colors.primary[600],
                            width: `${75 + screenshot.id * 5}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-center items-center mt-8 gap-6">
            <button
              className="swiper-button-prev-screenshots w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
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

            <div className="swiper-pagination-screenshots flex gap-2"></div>

            <button
              className="swiper-button-next-screenshots w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
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
        .screenshots-swiper
          .swiper-pagination-screenshots
          .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 50%;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .screenshots-swiper
          .swiper-pagination-screenshots
          .swiper-pagination-bullet-active {
          background: ${colors.primary[600]};
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
