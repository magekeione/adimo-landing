/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"],
    formats: ["image/avif", "image/webp"],
  },
  async generateBuildId() {
    return "adimo-v1";
  },
};
