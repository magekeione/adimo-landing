"use client";
import { motion } from "framer-motion";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Container from "../ui/Container";
import { faqData } from "@/data/faq";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function FAQ() {
  const { colors } = useTheme();

  // Funcție pentru a obține culorile pentru fiecare FAQ în funcție de index
  const getFaqColors = (index: number) => {
    const isEven = index % 2 === 0;
    return {
      accentColor: isEven ? colors.primary[600] : colors.secondary[600],
      accentBackground: isEven
        ? `${colors.primary[600]}10`
        : `${colors.secondary[600]}10`,
      focusRing: isEven ? colors.primary[500] : colors.secondary[500],
    };
  };

  // Stilurile pentru butonul CTA
  const ctaButtonStyle = {
    backgroundColor: colors.primary[600],
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <section id="faq" className="section-padding bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Întrebări{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              frecvente
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Răspunsuri la cele mai comune întrebări despre ADIMO.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const faqColors = getFaqColors(index);

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Disclosure
                    as="div"
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-lg font-medium text-gray-900 hover:bg-gray-50 focus:outline-none transition-all duration-300 relative">
                          {/* Accent line pe marginea stângă */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                            style={{
                              backgroundColor: open
                                ? faqColors.accentColor
                                : "transparent",
                            }}
                          ></div>

                          {/* FAQ number badge */}
                          <div className="flex items-center">
                            <span
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-4 transition-all duration-500"
                              style={{ backgroundColor: faqColors.accentColor }}
                            >
                              {index + 1}
                            </span>
                            <span>{faq.question}</span>
                          </div>

                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 transition-all duration-300 flex-shrink-0`}
                            style={{ color: faqColors.accentColor }}
                          />
                        </Disclosure.Button>

                        <Disclosure.Panel
                          className="px-6 pb-4 text-gray-600 transition-all duration-300"
                          style={{
                            backgroundColor: open
                              ? faqColors.accentBackground
                              : "transparent",
                          }}
                        >
                          <div
                            className="border-t pt-4 transition-all duration-300"
                            style={{
                              borderColor: `${faqColors.accentColor}30`,
                            }}
                          >
                            {faq.answer}

                            {/* Helpful indicator */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                A fost util acest răspuns?
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                                  style={{
                                    backgroundColor: `${colors.secondary[600]}20`,
                                    color: colors.secondary[600],
                                  }}
                                >
                                  👍 Da
                                </button>
                                <button
                                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                                  style={{
                                    backgroundColor: "#ef444420",
                                    color: "#ef4444",
                                  }}
                                >
                                  👎 Nu
                                </button>
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Nu ai găsit răspunsul la întrebarea ta?
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
            style={ctaButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[700];
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary[600]}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary[600];
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Contactează-ne
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
