"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { useTheme } from "@/context/ThemeContext";
import { BlogPost } from "@/types/blog";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({
  post,
  relatedPosts,
}: BlogPostClientProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<
    number | null
  >(null);

  // Funcție pentru share pe social media
  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      post.social?.title || `${post.title} - ${post.excerpt}`
    );

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    };

    window.open(
      shareUrls[platform as keyof typeof shareUrls],
      "_blank",
      "width=600,height=400"
    );
  };

  // Funcție pentru copierea link-ului
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: " + err);
    }
  };

  // Obține iconul pentru tipul de resursă
  const getResourceIcon = (type: string) => {
    const icons = {
      documentation: "📚",
      external: "🔗",
      download: "📥",
      legal: "⚖️",
      study: "📊",
      report: "📋",
    };
    return icons[type as keyof typeof icons] || "📄";
  };

  // Obține culoarea pentru nivelul de dificultate
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "#10b981"; // green
      case "intermediate":
        return "#f59e0b"; // amber
      case "advanced":
        return "#ef4444"; // red
      default:
        return colors.primary[600];
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Breaking News Banner */}
        {post.breaking_news && (
          <section
            className="py-2 text-white text-center text-sm font-medium"
            style={{ backgroundColor: "#ef4444" }}
          >
            🚨 BREAKING NEWS: Acest articol conține informații importante și
            recente
          </section>
        )}

        {/* Breadcrumb */}
        <section className="py-4 bg-gray-50">
          <Container>
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Acasă
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-gray-500 hover:text-gray-700">
                Blog
              </Link>
              {post.category && (
                <>
                  <span className="text-gray-400">/</span>
                  <Link
                    href={`/blog?category=${post.category}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {post.category}
                  </Link>
                </>
              )}
              <span className="text-gray-400">/</span>
              <span className="text-gray-700 font-medium">{post.title}</span>
            </nav>
          </Container>
        </section>

        <Container>
          <div className="py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-3">
                {/* Article Header */}
                <motion.header
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  {/* Category and Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: colors.primary[600] }}
                      >
                        {post.category}
                      </span>
                    )}

                    {post.subcategory && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${colors.secondary[600]}20`,
                          color: colors.secondary[600],
                        }}
                      >
                        {post.subcategory}
                      </span>
                    )}

                    {post.difficulty && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{
                          backgroundColor: getDifficultyColor(post.difficulty),
                        }}
                      >
                        {post.difficulty.toUpperCase()}
                      </span>
                    )}

                    {post.featured && (
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: colors.secondary[600] }}
                      >
                        ⭐ FEATURED
                      </span>
                    )}

                    {post.sticky && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-white">
                        📌 STICKY
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1
                    className="text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-colors duration-500"
                    style={{ color: colors.primary[700] }}
                  >
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      {/* Author */}
                      {post.author && (
                        <div className="flex items-center text-sm">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
                            style={{ backgroundColor: colors.primary[600] }}
                          >
                            {post.authorAvatar ? (
                              <Image
                                src={post.authorAvatar}
                                alt={post.author}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            ) : (
                              post.author.charAt(0)
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{post.author}</div>
                            {post.authorRole && (
                              <div className="text-gray-500 text-xs">
                                {post.authorRole}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Date and Reading Time */}
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(post.date).toLocaleDateString("ro-RO", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        {post.readingTime && (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {post.readingTime} min citire
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contributors */}
                  {post.contributors && post.contributors.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Contributori:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {post.contributors.map((contributor, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                              style={{ backgroundColor: colors.secondary[600] }}
                            >
                              {contributor.avatar ? (
                                <Image
                                  src={contributor.avatar}
                                  alt={contributor.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                contributor.name.charAt(0)
                              )}
                            </div>
                            <span>
                              {contributor.name} ({contributor.role})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative mb-8">
                      <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      {(post.imageCaption || post.imageCredits) && (
                        <div className="mt-2 text-sm text-gray-600 text-center">
                          {post.imageCaption && (
                            <div className="italic">{post.imageCaption}</div>
                          )}
                          {post.imageCredits && (
                            <div className="text-xs text-gray-500">
                              {post.imageCredits}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Video */}
                  {post.video && (
                    <div className="mb-8">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                        {post.video.thumbnail ? (
                          <div className="relative w-full h-full group cursor-pointer">
                            <Image
                              src={post.video.thumbnail}
                              alt={post.video.title || "Video thumbnail"}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
                              <button
                                onClick={() =>
                                  window.open(post.video?.url, "_blank")
                                }
                                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300"
                              >
                                <svg
                                  className="w-6 h-6 text-gray-800 ml-1"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="m9.5 16.5 7-4.5-7-4.5v9ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <iframe
                            src={post.video.url}
                            title={post.video.title || "Video"}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        )}
                      </div>
                      {(post.video.title || post.video.duration) && (
                        <div className="mt-2 text-sm text-gray-600 text-center">
                          {post.video.title && (
                            <div className="font-medium">
                              {post.video.title}
                            </div>
                          )}
                          {post.video.duration && (
                            <div className="text-xs text-gray-500">
                              Durată: {post.video.duration}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {post.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.header>

                {/* Table of Contents */}
                {post.toc && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                  >
                    <Card className="p-6">
                      <h3
                        className="text-lg font-bold mb-4 transition-colors duration-500"
                        style={{ color: colors.primary[600] }}
                      >
                        📋 Cuprins
                      </h3>
                      {post.sections && (
                        <ul className="space-y-2">
                          {post.sections.map((section, index) => (
                            <li key={index}>
                              <a
                                href={`#${section}`}
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                              >
                                {index + 1}. {section.replace("-", " ")}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  </motion.div>
                )}

                {/* Article Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-lg max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: post.content || "" }}
                />

                {/* Gallery */}
                {post.gallery && post.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                  >
                    <h3
                      className="text-2xl font-bold mb-6 transition-colors duration-500"
                      style={{ color: colors.primary[600] }}
                    >
                      📸 Galerie foto
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {post.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => setSelectedGalleryImage(index)}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        </div>
                      ))}
                    </div>

                    {/* Gallery Modal */}
                    {selectedGalleryImage !== null && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedGalleryImage(null)}
                      >
                        <div className="relative max-w-4xl max-h-full">
                          <Image
                            src={post.gallery[selectedGalleryImage].url}
                            alt={post.gallery[selectedGalleryImage].alt}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                          />
                          {post.gallery[selectedGalleryImage].caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                              {post.gallery[selectedGalleryImage].caption}
                            </div>
                          )}
                          <button
                            onClick={() => setSelectedGalleryImage(null)}
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* CTA Section */}
                {post.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12"
                  >
                    <Card className="p-8 text-center transition-all duration-500">
                      <h3
                        className="text-2xl font-bold mb-4 transition-colors duration-500"
                        style={{ color: colors.primary[600] }}
                      >
                        {post.cta.title}
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        {post.cta.description}
                      </p>
                      <button
                        onClick={() =>
                          window.open(post.cta?.button_url, "_blank")
                        }
                        className="px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: colors.primary[600] }}
                      >
                        {post.cta.button_text}
                      </button>
                    </Card>
                  </motion.div>
                )}

                {/* Social Share */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="border-t border-b py-6 mb-8"
                >
                  <h3 className="text-lg font-bold mb-4">
                    Distribuie articolul:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => shareToSocial("facebook")}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </button>

                    <button
                      onClick={() => shareToSocial("twitter")}
                      className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </button>

                    <button
                      onClick={() => shareToSocial("linkedin")}
                      className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </button>

                    <button
                      onClick={() => shareToSocial("whatsapp")}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      WhatsApp
                    </button>

                    <button
                      onClick={copyLink}
                      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      {copied ? "Copiat!" : "Copiază link"}
                    </button>
                  </div>
                </motion.div>

                {/* Author Bio Extended */}
                {post.author && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                          style={{ backgroundColor: colors.primary[600] }}
                        >
                          {post.authorAvatar ? (
                            <Image
                              src={post.authorAvatar}
                              alt={post.author}
                              width={64}
                              height={64}
                              className="rounded-full"
                            />
                          ) : (
                            post.author.charAt(0)
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">
                            {post.author}
                          </h3>
                          {post.authorRole && (
                            <p className="text-gray-600 text-sm mb-2">
                              {post.authorRole}
                            </p>
                          )}
                          <p className="text-gray-600 mb-3">
                            {post.authorBio?.toString() ||
                              `Membru al echipei ADIMO, pasionat de digitalizarea proceselor și îmbunătățirea experienței utilizatorilor în administrarea asociațiilor de locatari.`}
                          </p>

                          {/* Author Social Links */}
                          <div className="flex gap-3">
                            {post.authorEmail && (
                              <a
                                href={`mailto:${post.authorEmail}`}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                                </svg>
                              </a>
                            )}
                            {post.authorLinkedIn && (
                              <a
                                href={post.authorLinkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </a>
                            )}
                            {post.authorTwitter && (
                              <a
                                href={post.authorTwitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-sky-500 transition-colors duration-200"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Resources & Sources */}
                {(post.resources || post.sources) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12"
                  >
                    {post.resources && post.resources.length > 0 && (
                      <Card className="p-6 mb-6">
                        <h3
                          className="text-lg font-bold mb-4 transition-colors duration-500"
                          style={{ color: colors.primary[600] }}
                        >
                          📚 Resurse utile
                        </h3>
                        <div className="space-y-3">
                          {post.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <span className="mr-3 text-lg">
                                {getResourceIcon(resource.type)}
                              </span>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {resource.title}
                                </div>
                                <div className="text-sm text-gray-500 capitalize">
                                  {resource.type}
                                </div>
                              </div>
                              <svg
                                className="w-4 h-4 ml-auto text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </Card>
                    )}

                    {post.sources && post.sources.length > 0 && (
                      <Card className="p-6">
                        <h3
                          className="text-lg font-bold mb-4 transition-colors duration-500"
                          style={{ color: colors.secondary[600] }}
                        >
                          📖 Surse și referințe
                        </h3>
                        <div className="space-y-2">
                          {post.sources.map((source, index) => (
                            <div key={index} className="flex items-start">
                              <span className="text-gray-400 mr-2 mt-1">
                                {index + 1}.
                              </span>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex-1"
                              >
                                {source.title}
                                <span className="text-xs text-gray-500 ml-2">
                                  ({source.type})
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </motion.div>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Navigation */}
                  <Card className="p-6">
                    <h3
                      className="text-lg font-bold mb-4 transition-colors duration-500"
                      style={{ color: colors.primary[600] }}
                    >
                      Navigare
                    </h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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
                        Înapoi
                      </button>
                      <Link
                        href="/blog"
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0l-4-4m4 4l-4 4"
                          />
                        </svg>
                        Toate articolele
                      </Link>
                    </div>
                  </Card>

                  {/* Article Info */}
                  <Card className="p-6">
                    <h3
                      className="text-lg font-bold mb-4 transition-colors duration-500"
                      style={{ color: colors.primary[600] }}
                    >
                      Informații articol
                    </h3>
                    <div className="space-y-3 text-sm">
                      {post.version && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Versiune:</span>
                          <span className="font-medium">{post.version}</span>
                        </div>
                      )}
                      {post.lastModified && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Actualizat:</span>
                          <span className="font-medium">
                            {new Date(post.lastModified).toLocaleDateString(
                              "ro-RO"
                            )}
                          </span>
                        </div>
                      )}
                      {post.readingTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timp citire:</span>
                          <span className="font-medium">
                            {post.readingTime} min
                          </span>
                        </div>
                      )}
                      {post.difficulty && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dificultate:</span>
                          <span
                            className="font-medium"
                            style={{
                              color: getDifficultyColor(post.difficulty),
                            }}
                          >
                            {post.difficulty}
                          </span>
                        </div>
                      )}
                      {post.target_audience &&
                        post.target_audience.length > 0 && (
                          <div>
                            <span className="text-gray-600 block mb-1">
                              Pentru:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {post.target_audience.map((audience, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  {audience}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </Card>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <Card className="p-6">
                      <h3
                        className="text-lg font-bold mb-4 transition-colors duration-500"
                        style={{ color: colors.primary[600] }}
                      >
                        Articole similare
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost, index) => (
                          <motion.div
                            key={relatedPost.slug}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                          >
                            <Link
                              href={`/blog/${relatedPost.slug}`}
                              className="block group"
                            >
                              {relatedPost.image && (
                                <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                                  <Image
                                    src={relatedPost.image}
                                    alt={relatedPost.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  {relatedPost.featured && (
                                    <div className="absolute top-2 right-2">
                                      <span className="px-1 py-0.5 bg-yellow-500 text-white text-xs rounded-full">
                                        ⭐
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <h4 className="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>
                                  {new Date(
                                    relatedPost.date
                                  ).toLocaleDateString("ro-RO")}
                                </span>
                                {relatedPost.readingTime && (
                                  <span>{relatedPost.readingTime} min</span>
                                )}
                              </div>
                              {relatedPost.category && (
                                <span
                                  className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full"
                                  style={{
                                    backgroundColor: `${colors.secondary[600]}20`,
                                    color: colors.secondary[600],
                                  }}
                                >
                                  {relatedPost.category}
                                </span>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      <Link
                        href="/blog"
                        className="inline-block mt-4 text-sm font-medium transition-colors duration-200"
                        style={{ color: colors.primary[600] }}
                      >
                        Vezi toate articolele →
                      </Link>
                    </Card>
                  )}

                  {/* Article Actions */}
                  <Card className="p-6">
                    <h3
                      className="text-lg font-bold mb-4 transition-colors duration-500"
                      style={{ color: colors.primary[600] }}
                    >
                      Acțiuni rapide
                    </h3>
                    <div className="space-y-2">
                      <button
                        onClick={copyLink}
                        className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        {copied ? "Link copiat!" : "Copiază link"}
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                        Printează
                      </button>

                      <Link
                        href={`/blog?category=${post.category}`}
                        className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        Vezi categoria
                      </Link>
                    </div>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
