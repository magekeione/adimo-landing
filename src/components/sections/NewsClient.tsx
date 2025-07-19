"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import Card from "../ui/Card";
import { useTheme } from "@/context/ThemeContext";
import { BlogPost } from "@/types/blog";

interface NewsClientProps {
  posts: BlogPost[];
}

export default function NewsClient({ posts }: NewsClientProps) {
  const { colors } = useTheme();

  const getNewsTypeColor = (date: string, index: number) => {
    const newsDate = new Date(date);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 7) {
      return {
        background: `${colors.primary[600]}20`,
        color: colors.primary[600],
        badge: "NOU",
      };
    } else if (daysDiff < 30) {
      return {
        background: `${colors.secondary[600]}20`,
        color: colors.secondary[600],
        badge: "RECENT",
      };
    } else {
      const isEven = index % 2 === 0;
      return {
        background: isEven
          ? `${colors.primary[600]}20`
          : `${colors.secondary[600]}20`,
        color: isEven ? colors.primary[600] : colors.secondary[600],
        badge: "ARCHIVED",
      };
    }
  };

  return (
    <section id="news" className="section-padding bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Noutăți și{" "}
            <span
              className="transition-colors duration-500"
              style={{ color: colors.primary[600] }}
            >
              actualizări
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rămâi la curent cu cele mai recente funcționalități și îmbunătățiri
            ale platformei ADIMO.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 6).map((post, index) => {
            const newsTypeColor = getNewsTypeColor(post.date, index);

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full relative" hover>
                  {post.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: colors.secondary[600] }}
                      >
                        ⭐ FEATURED
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold text-white transition-all duration-500"
                      style={{ backgroundColor: newsTypeColor.color }}
                    >
                      {newsTypeColor.badge}
                    </span>
                  </div>

                  <div
                    className="h-2 transition-all duration-500"
                    style={{ backgroundColor: newsTypeColor.color }}
                  ></div>

                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium transition-all duration-500"
                        style={{
                          backgroundColor: newsTypeColor.background,
                          color: newsTypeColor.color,
                        }}
                      >
                        {new Date(post.date).toLocaleDateString("ro-RO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      {post.category && (
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {post.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium inline-flex items-center transition-all duration-300 hover:gap-2"
                      style={{ color: newsTypeColor.color }}
                    >
                      Citește mai mult
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-300"
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
                    </Link>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: newsTypeColor.color,
                          width: `${Math.max(20, 100 - index * 15)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {post.author && (
                    <div className="px-6 pb-4 border-t pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <span>De {post.author}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0">
                    <div
                      className="w-0 h-0 transition-all duration-500"
                      style={{
                        borderLeft: "20px solid transparent",
                        borderBottom: `20px solid ${newsTypeColor.color}30`,
                      }}
                    ></div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: colors.primary[600] }}
          >
            Vezi toate articolele
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
