"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { testimonials } from "@/data/testimonials";
import { useTheme } from "@/context/ThemeContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const { colors } = useTheme();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 transition-colors duration-300 ${
          i < rating ? "" : "text-gray-300"
        }`}
        style={i < rating ? { color: colors.secondary[500] } : {}}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ce spun{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              utilizatorii
            </span>{" "}
            despre noi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zeci de asociații de locatari folosesc deja ADIMO pentru gestionarea
            eficientă.
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
              nextEl: ".swiper-button-next-testimonials",
              prevEl: ".swiper-button-prev-testimonials",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-testimonials",
            }}
            autoplay={{ delay: 6000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="p-8 h-full relative overflow-hidden">
                  {/* Quote decorativ în background */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg
                      className="w-12 h-12 transition-colors duration-500"
                      style={{ color: colors.primary[600] }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>

                  <div className="flex items-center mb-6">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4 border-2 transition-all duration-500"
                        style={{ borderColor: `${colors.primary[600]}30` }}
                      />
                    ) : (
                      <div
                        className="w-15 h-15 rounded-full mr-4 flex items-center justify-center transition-all duration-500"
                        style={{
                          backgroundColor: `${colors.primary[600]}20`,
                          color: colors.primary[600],
                        }}
                      >
                        <span className="font-medium text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4
                        className="font-bold text-lg transition-colors duration-500"
                        style={{ color: colors.primary[700] }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.association}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                    <span
                      className="ml-2 text-sm font-medium transition-colors duration-500"
                      style={{ color: colors.secondary[600] }}
                    >
                      {testimonial.rating}/5
                    </span>
                  </div>

                  <p className="text-gray-700 italic leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>

                  {/* Rating badge în colțul din dreapta jos */}
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="px-2 py-1 rounded-full text-xs font-medium text-white transition-all duration-500"
                      style={{ backgroundColor: colors.secondary[500] }}
                    >
                      ⭐ {testimonial.rating}
                    </div>
                  </div>

                  {/* Accent line la baza cardului */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(to right, ${colors.primary[600]}, ${colors.secondary[600]})`,
                        width: `${(testimonial.rating / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation */}
          <div className="flex justify-center items-center mt-8 gap-6">
            <button
              className="swiper-button-prev-testimonials w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
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

            <div className="swiper-pagination-testimonials flex gap-2"></div>

            <button
              className="swiper-button-next-testimonials w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
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

        {/* Statistici despre testimoniale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div
                className="text-3xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
              >
                4.8/5
              </div>
              <div className="text-gray-600">Rating Mediu</div>
            </div>
            <div>
              <div
                className="text-3xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.secondary[600] }}
              >
                200+
              </div>
              <div className="text-gray-600">Review-uri Pozitive</div>
            </div>
            <div>
              <div
                className="text-3xl font-bold mb-2 transition-colors duration-500"
                style={{ color: colors.primary[600] }}
              >
                95%
              </div>
              <div className="text-gray-600">Recomandă ADIMO</div>
            </div>
          </div>
        </motion.div>
      </Container>

      <style jsx global>{`
        .testimonials-swiper
          .swiper-pagination-testimonials
          .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          border-radius: 50%;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .testimonials-swiper
          .swiper-pagination-testimonials
          .swiper-pagination-bullet-active {
          background: ${colors.primary[600]};
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
}
