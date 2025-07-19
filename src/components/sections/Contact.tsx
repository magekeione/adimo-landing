"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Container from "../ui/Container";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { sendEmail } from "@/lib/emailjs";

export default function Contact() {
  const { colors } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmail(formData);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general",
      });
    } catch (error) {
      setSubmitStatus("error");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "contact@adimo.ro",
      link: "mailto:contact@adimo.ro",
      themeColor: "primary",
    },
    {
      icon: PhoneIcon,
      title: "Telefon",
      content: "+40 721 XXX XXX",
      link: "tel:+40721XXXXXX",
      themeColor: "secondary",
    },
    {
      icon: MapPinIcon,
      title: "Adresă",
      content: "București, România",
      link: null,
      themeColor: "primary",
    },
  ];

  // Funcție pentru a obține culorile în funcție de themeColor
  const getContactColors = (themeColor: string) => {
    return {
      background:
        themeColor === "primary"
          ? `${colors.primary[600]}20`
          : `${colors.secondary[600]}20`,
      color:
        themeColor === "primary" ? colors.primary[600] : colors.secondary[600],
    };
  };

  // Stiluri pentru form inputs cu focus dinamic
  const getInputStyles = () => ({
    transition: "all 0.3s ease",
    borderColor: "#d1d5db", // gray-300
  });

  const getInputFocusStyles = () => ({
    borderColor: colors.primary[500],
    outline: "none",
    boxShadow: `0 0 0 2px ${colors.primary[500]}40`, // 40 = 25% opacity
  });

  // Gradient pentru demo card
  const demoCardGradient = {
    background: `linear-gradient(to bottom right, ${colors.primary[50]}, ${colors.secondary[50]})`,
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Contactează{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              echipa ADIMO
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ai întrebări despre platformă sau ai nevoie de suport? Suntem aici
            să te ajutăm.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <h3
                className="text-2xl font-bold mb-6 transition-colors duration-500"
                style={{ color: colors.primary[700] }}
              >
                Trimite-ne un mesaj
              </h3>

              {submitStatus === "success" && (
                <div
                  className="border px-4 py-3 rounded mb-6 transition-all duration-500"
                  style={{
                    backgroundColor: `${colors.secondary[600]}20`,
                    borderColor: colors.secondary[600],
                    color: colors.secondary[700],
                  }}
                >
                  ✅ Mesajul a fost trimis cu succes! Vă vom răspunde în cel mai
                  scurt timp.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  ❌ A apărut o eroare. Vă rugăm să încercați din nou.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-lg transition-all duration-300"
                      style={getInputStyles()}
                      onFocus={(e) => {
                        Object.assign(e.target.style, getInputFocusStyles());
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="Numele tău"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-lg transition-all duration-300"
                      style={getInputStyles()}
                      onFocus={(e) => {
                        Object.assign(e.target.style, getInputFocusStyles());
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                      placeholder="email@exemplu.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipul mesajului
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg transition-all duration-300"
                    style={getInputStyles()}
                    onFocus={(e) => {
                      Object.assign(e.target.style, getInputFocusStyles());
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="general">Întrebare generală</option>
                    <option value="support">Suport tehnic</option>
                    <option value="demo">Solicitare demo</option>
                    <option value="partnership">Parteneriat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subiect *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg transition-all duration-300"
                    style={getInputStyles()}
                    onFocus={(e) => {
                      Object.assign(e.target.style, getInputFocusStyles());
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Subiectul mesajului"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg resize-vertical transition-all duration-300"
                    style={getInputStyles()}
                    onFocus={(e) => {
                      Object.assign(e.target.style, getInputFocusStyles());
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Descrie întrebarea sau problema ta..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full transition-all duration-300"
                  style={{
                    backgroundColor: colors.primary[600],
                    borderColor: colors.primary[600],
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor =
                        colors.primary[700];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor =
                        colors.primary[600];
                    }
                  }}
                >
                  {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Informații de contact
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const contactColors = getContactColors(info.themeColor);

                    return (
                      <Card key={index} className="p-6" hover>
                        <div className="flex items-center">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-all duration-500"
                            style={{
                              backgroundColor: contactColors.background,
                            }}
                          >
                            <info.icon
                              className="w-6 h-6 transition-colors duration-500"
                              style={{ color: contactColors.color }}
                            />
                          </div>
                          <div>
                            <h4
                              className="font-semibold text-lg transition-colors duration-500"
                              style={{ color: contactColors.color }}
                            >
                              {info.title}
                            </h4>
                            {info.link ? (
                              <a
                                href={info.link}
                                className="text-gray-600 transition-colors duration-300"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color =
                                    contactColors.color;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#4b5563"; // gray-600
                                }}
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-gray-600">{info.content}</p>
                            )}
                          </div>
                        </div>

                        {/* Progress indicator pentru fiecare contact method */}
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="h-1 rounded-full transition-all duration-500"
                            style={{
                              backgroundColor: contactColors.color,
                              width: `${85 + index * 5}%`, // 85%, 90%, 95%
                            }}
                          ></div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div
                className="p-6 rounded-xl shadow-lg bg-white transition-all duration-500"
                style={demoCardGradient}
              >
                <h4
                  className="text-xl font-bold mb-4 transition-colors duration-500"
                  style={{ color: colors.primary[600] }}
                >
                  Programează o demonstrație
                </h4>
                <p className="text-gray-600 mb-6">
                  Vrei să vezi ADIMO în acțiune? Programează o demonstrație
                  gratuită cu echipa noastră și descoperă cum poate transforma
                  gestionarea asociației tale.
                </p>
                <Button
                  variant="primary"
                  className="transition-all duration-300"
                  style={{
                    backgroundColor: colors.secondary[600],
                    borderColor: colors.secondary[600],
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.secondary[700];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.secondary[600];
                  }}
                  onClick={() =>
                    window.open("https://www.google.com", "_blank")
                  }
                >
                  Programează demo
                </Button>
              </div>

              {/* Quick contact stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold mb-1 transition-colors duration-500"
                    style={{ color: colors.primary[600] }}
                  >
                    &lt; 2h
                  </div>
                  <div className="text-sm text-gray-600">Timp Răspuns</div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold mb-1 transition-colors duration-500"
                    style={{ color: colors.secondary[600] }}
                  >
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Răspuns Garantat</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
