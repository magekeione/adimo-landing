"use client";
import { useTheme } from "@/context/ThemeContext";

export default function HeroClient() {
  const { colors } = useTheme();

  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${colors.primary[600]}, ${colors.primary[900]})`,
  };

  return (
    <section
      className="text-white py-16 transition-all duration-500"
      style={gradientStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Descoperă{" "}
          <span
            className="transition-colors duration-500"
            style={{ color: colors.secondary[300] }}
          >
            platforma ADIMO
          </span>
        </h1>
        <p
          className="text-xl max-w-3xl mx-auto transition-colors duration-500"
          style={{ color: colors.primary[100] }}
        >
          Explorează funcționalitățile complete și vezi cum ADIMO transformă
          gestionarea asociațiilor de locatari.
        </p>
      </div>
    </section>
  );
}
