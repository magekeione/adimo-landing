"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: "Acasă", href: "/" },
    { name: "Platformă", href: "/platforma" },
    { name: "Despre Noi", href: "/despre-noi" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/adimo_logo.png"
                alt="ADIMO Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-dynamic-primary-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Butonul de schimbare temă */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === "blue"
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-600"
                  : "bg-red-100 hover:bg-red-200 text-red-600"
              }`}
              title={`Schimbă în tema ${
                theme === "blue" ? "roșie" : "albastră"
              }`}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${
                  theme === "red" ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>

            <Button
              variant="primary"
              onClick={() => window.open("https://app.adimo.ro", "_blank")}
              className="bg-dynamic-primary-600 hover:bg-dynamic-primary-700"
            >
              Accesează aplicația
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center space-x-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Theme toggle pentru mobile */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                theme === "blue"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-all duration-300 ${
                  theme === "red" ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>

            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-dynamic-primary-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="primary"
                className="mt-4 bg-dynamic-primary-600 hover:bg-dynamic-primary-700"
                onClick={() => window.open("https://app.adimo.ro", "_blank")}
              >
                Accesează aplicația
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
