"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "blue" | "red";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    primary: {
      50: string;
      100: string;
      500: string;
      600: string;
      700: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      300: string;
      500: string;
      600: string;
      700: string;
    };
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  blue: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      900: "#1e3a8a",
    },
    secondary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      300: "#7dd3fc",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
    },
  },
  red: {
    primary: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#eb0e13",
      700: "#dc2626",
      900: "#7f1d1d",
    },
    secondary: {
      50: "#fff1f2",
      100: "#ffe4e6",
      300: "#fda4af",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
    },
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("blue");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "blue" ? "red" : "blue"));
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      <div
        style={
          {
            "--color-primary-50": colors.primary[50],
            "--color-primary-100": colors.primary[100],
            "--color-primary-500": colors.primary[500],
            "--color-primary-600": colors.primary[600],
            "--color-primary-700": colors.primary[700],
            "--color-primary-900": colors.primary[900],
            "--color-secondary-50": colors.secondary[50],
            "--color-secondary-100": colors.secondary[100],
            "--color-secondary-300": colors.secondary[300],
            "--color-secondary-500": colors.secondary[500],
            "--color-secondary-600": colors.secondary[600],
            "--color-secondary-700": colors.secondary[700],
          } as React.CSSProperties
        }
        className="min-h-screen transition-all duration-500"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
