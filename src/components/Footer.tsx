import Link from "next/link";
import Image from "next/image";
import Container from "./ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Funcționalități", href: "/platforma" },
      { name: "Demo", href: "#" },
    ],
    support: [
      { name: "Documentație", href: "#" },
      { name: "FAQ", href: "/despre-noi" },
      { name: "Contact", href: "/contact" },
    ],
    company: [
      { name: "Despre noi", href: "/despre-noi" },
      { name: "Noutăți", href: "/blog" },
    ],
    legal: [
      { name: "Termeni și condiții", href: "#" },
      { name: "Politica de confidențialitate", href: "#" },
      { name: "Politica cookies", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com",
      icon: "/facebook.png",
    },
    { name: "TikTok", href: "https://www.tiktok.com", icon: "/tik-tok.png" },
    {
      name: "Instagram",
      href: "https://www.instagram.com",
      icon: "/instagram.png",
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <Container>
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Image
                src="/adimo_logo.png"
                alt="ADIMO Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-6"
              />
              <p className="text-gray-300 mb-6 max-w-md">
                ADIMO transformă gestionarea asociațiilor de locatari prin
                digitalizare completă și transparență totală. Gratuit pentru
                toate asociațiile.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    <img src={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Produs</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Suport</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Companie</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ADIMO. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
