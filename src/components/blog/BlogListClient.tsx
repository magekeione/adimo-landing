"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { useTheme } from "@/context/ThemeContext";
import { BlogPost } from "@/types/blog";

interface BlogListClientProps {
  allPosts: BlogPost[];
  featuredPosts: BlogPost[];
  regularPosts: BlogPost[];
  categories: string[];
  popularTags: string[];
}

export default function BlogListClient({
  allPosts,
  featuredPosts,
  categories,
  popularTags,
}: BlogListClientProps) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "popularity" | "reading_time">(
    "date"
  );

  // Filtrare și sortare postări
  const filteredAndSortedPosts = allPosts
    .filter((post) => {
      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      const matchesDifficulty =
        !selectedDifficulty || post.difficulty === selectedDifficulty;
      const matchesSearch =
        !searchTerm ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesCategory && matchesTag && matchesDifficulty && matchesSearch
      );
    })
    .sort((a, b) => {
      // Întâi sortează sticky posts
      if (a.sticky && !b.sticky) return -1;
      if (!a.sticky && b.sticky) return 1;

      // Apoi featured posts
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Apoi criteriul selectat
      switch (sortBy) {
        case "reading_time":
          const aTime = a.readingTime || 0;
          const bTime = b.readingTime || 0;
          return aTime - bTime;
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Breaking news posts
  const breakingNews = allPosts.filter((post) => post.breaking_news);

  // Hero gradient
  const heroGradient = {
    background: `linear-gradient(to bottom right, ${colors.primary[600]}, ${colors.primary[900]})`,
  };

  const getPostTypeColor = (post: BlogPost, index: number) => {
    if (post.breaking_news) {
      return { color: "#ef4444", badge: "🚨 BREAKING" };
    }

    const newsDate = new Date(post.date);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - newsDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 7) {
      return { color: colors.primary[600], badge: "NOU" };
    } else if (daysDiff < 30) {
      return { color: colors.secondary[600], badge: "RECENT" };
    } else {
      const isEven = index % 2 === 0;
      return {
        color: isEven ? colors.primary[600] : colors.secondary[600],
        badge: "POPULAR",
      };
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "#10b981";
      case "intermediate":
        return "#f59e0b";
      case "advanced":
        return "#ef4444";
      default:
        return colors.primary[600];
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Breaking News Banner */}
        {breakingNews.length > 0 && (
          <section className="bg-red-600 text-white py-3">
            <Container>
              <div className="flex items-center justify-center text-center">
                <span className="font-bold mr-2">🚨 BREAKING NEWS:</span>
                <Link
                  href={`/blog/${breakingNews[0].slug}`}
                  className="hover:underline"
                >
                  {breakingNews[0].title}
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* Hero Section */}
        <section
          className="text-white py-16 transition-all duration-500"
          style={heroGradient}
        >
          <Container>
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold mb-6"
              >
                Blog{" "}
                <span
                  className="transition-colors duration-500"
                  style={{ color: colors.secondary[300] }}
                >
                  ADIMO
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl max-w-3xl mx-auto transition-colors duration-500 mb-8"
                style={{ color: colors.primary[100] }}
              >
                Articole despre platformă, noutăți și tendințe în administrarea
                asociațiilor de locatari.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">{allPosts.length}</div>
                  <div className="text-sm opacity-90">Articole</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{categories.length}</div>
                  <div className="text-sm opacity-90">Categorii</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {featuredPosts.length}
                  </div>
                  <div className="text-sm opacity-90">Recomandate</div>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Caută articole, autori, tag-uri..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg text-gray-900 focus:outline-none focus:ring-2 transition-all duration-300"
                  />
                  <svg
                    className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <Container>
          <div className="py-16">
            {/* Advanced Filters */}
            <section className="mb-12">
              <div className="grid lg:grid-cols-4 gap-6 mb-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categorie:
                  </label>
                  <select
                    value={selectedCategory || ""}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value || null)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  >
                    <option value="">Toate categoriile</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dificultate:
                  </label>
                  <select
                    value={selectedDifficulty || ""}
                    onChange={(e) =>
                      setSelectedDifficulty(e.target.value || null)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  >
                    <option value="">Toate nivelurile</option>
                    <option value="beginner">Începător</option>
                    <option value="intermediate">Intermediar</option>
                    <option value="advanced">Avansat</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sortează după:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "date" | "popularity" | "reading_time"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                  >
                    <option value="date">Data publicării</option>
                    <option value="popularity">Popularitate</option>
                    <option value="reading_time">Timp de citire</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setSelectedDifficulty(null);
                      setSearchTerm("");
                      setSortBy("date");
                    }}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                  >
                    Resetează filtrele
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              {popularTags.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-medium text-gray-700">
                    Tag-uri populare:
                  </span>
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setSelectedTag(selectedTag === tag ? null : tag)
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        selectedTag === tag
                          ? "text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      style={
                        selectedTag === tag
                          ? { backgroundColor: colors.secondary[600] }
                          : {}
                      }
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 &&
              !searchTerm &&
              !selectedCategory &&
              !selectedTag &&
              !selectedDifficulty && (
                <section className="mb-16">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold mb-8 flex items-center"
                    style={{ color: colors.primary[600] }}
                  >
                    ⭐ Articole Recomandate
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({featuredPosts.length})
                    </span>
                  </motion.h2>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {featuredPosts.slice(0, 2).map((post, index) => {
                      const typeColor = getPostTypeColor(post, index);

                      return (
                        <motion.div
                          key={post.slug}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300"
                            hover
                          >
                            {post.image && (
                              <div className="relative h-64 overflow-hidden">
                                <Image
                                  src={post.image}
                                  alt={post.imageAlt || post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between">
                                  <span
                                    className="px-2 py-1 rounded-full text-xs font-bold text-white"
                                    style={{
                                      backgroundColor: colors.secondary[600],
                                    }}
                                  >
                                    ⭐ FEATURED
                                  </span>
                                  <span
                                    className="px-2 py-1 rounded-full text-xs font-bold text-white"
                                    style={{ backgroundColor: typeColor.color }}
                                  >
                                    {typeColor.badge}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4 text-sm">
                                <span className="text-gray-500">
                                  {new Date(post.date).toLocaleDateString(
                                    "ro-RO"
                                  )}
                                </span>
                                {post.readingTime && (
                                  <span className="text-gray-500">
                                    📖 {post.readingTime} min
                                  </span>
                                )}
                              </div>

                              <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>

                              <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center font-medium transition-colors duration-300"
                                style={{ color: typeColor.color }}
                              >
                                Citește articolul complet
                                <svg
                                  className="w-4 h-4 ml-1"
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
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

            {/* Results Header */}
            <section className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
              >
                <h2 className="text-3xl font-bold">
                  {selectedCategory ||
                  selectedTag ||
                  selectedDifficulty ||
                  searchTerm
                    ? `Rezultate filtrare (${filteredAndSortedPosts.length})`
                    : "Toate Articolele"}
                </h2>
              </motion.div>

              {/* Active Filters Display */}
              {(selectedCategory ||
                selectedTag ||
                selectedDifficulty ||
                searchTerm) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory && (
                    <span
                      className="px-3 py-1 rounded-full text-sm text-white flex items-center"
                      style={{ backgroundColor: colors.primary[600] }}
                    >
                      Categorie: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedTag && (
                    <span
                      className="px-3 py-1 rounded-full text-sm text-white flex items-center"
                      style={{ backgroundColor: colors.secondary[600] }}
                    >
                      Tag: #{selectedTag}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {selectedDifficulty && (
                    <span
                      className="px-3 py-1 rounded-full text-sm text-white flex items-center"
                      style={{
                        backgroundColor: getDifficultyColor(selectedDifficulty),
                      }}
                    >
                      Dificultate: {selectedDifficulty}
                      <button
                        onClick={() => setSelectedDifficulty(null)}
                        className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm flex items-center">
                      Căutare: &quot;{searchTerm}&quot;
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                </div>
              )}
            </section>

            {/* All Posts Grid */}
            <section>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedPosts.map((post, index) => {
                  const typeColor = getPostTypeColor(post, index);

                  return (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 9) * 0.1 }}
                    >
                      <Card
                        className="overflow-hidden h-full group hover:shadow-lg transition-all duration-300"
                        hover
                      >
                        {(post.sticky || post.breaking_news) && (
                          <div className="bg-yellow-500 text-white text-center py-1 text-xs font-bold">
                            {post.breaking_news
                              ? "🚨 BREAKING NEWS"
                              : "📌 STICKY POST"}
                          </div>
                        )}

                        {post.image && (
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              {post.featured && (
                                <span
                                  className="px-1 py-0.5 rounded text-xs font-bold text-white"
                                  style={{
                                    backgroundColor: colors.secondary[600],
                                  }}
                                >
                                  ⭐
                                </span>
                              )}
                              {post.difficulty && (
                                <span
                                  className="px-1 py-0.5 rounded text-xs font-bold text-white"
                                  style={{
                                    backgroundColor: getDifficultyColor(
                                      post.difficulty
                                    ),
                                  }}
                                >
                                  {post.difficulty.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3 text-sm">
                            <span className="text-gray-500">
                              {new Date(post.date).toLocaleDateString("ro-RO")}
                            </span>
                            {post.readingTime && (
                              <span className="text-gray-500">
                                {post.readingTime} min
                              </span>
                            )}
                          </div>

                          {post.category && (
                            <div className="mb-2">
                              <span
                                className="px-2 py-1 rounded-full text-xs font-medium"
                                style={{
                                  backgroundColor: `${typeColor.color}20`,
                                  color: typeColor.color,
                                }}
                              >
                                {post.category}
                              </span>
                            </div>
                          )}

                          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>

                          {post.author && (
                            <div className="flex items-center mb-3 text-sm">
                              <span className="text-gray-600">
                                De {post.author}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center font-medium transition-colors duration-300 text-sm"
                              style={{ color: typeColor.color }}
                            >
                              Citește
                              <svg
                                className="w-3 h-3 ml-1"
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
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* No Results */}
              {filteredAndSortedPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">
                    Nu am găsit articole
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Încearcă să modifici filtrele sau termenul de căutare pentru
                    a găsi articolele care te interesează.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setSelectedDifficulty(null);
                      setSearchTerm("");
                      setSortBy("date");
                    }}
                    className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.primary[600] }}
                  >
                    Resetează toate filtrele
                  </button>
                </div>
              )}
            </section>

            {/* Stats Footer */}
            {filteredAndSortedPosts.length > 0 && (
              <div className="text-center mt-16">
                <p className="text-gray-600 mb-4">
                  Afișând {filteredAndSortedPosts.length} din {allPosts.length}{" "}
                  articole
                </p>
                {filteredAndSortedPosts.length === allPosts.length && (
                  <p className="text-sm text-gray-500">
                    Ai văzut toate articolele disponibile! 🎉
                  </p>
                )}
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
