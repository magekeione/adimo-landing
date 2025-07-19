import { getAllBlogPosts, getAllNews } from "@/lib/markdown";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata = {
  title: "Blog ADIMO - Articole și Noutăți",
  description:
    "Citește cele mai recente articole despre ADIMO, funcționalități noi și tendințe în administrarea asociațiilor de locatari.",
  openGraph: {
    title: "Blog ADIMO - Articole și Noutăți",
    description:
      "Articole despre platformă, funcționalități și tendințe în administrarea asociațiilor.",
  },
};

export default function BlogPage() {
  // Server-side: obține toate postările
  const blogPosts = getAllBlogPosts();
  const newsItems = getAllNews();

  // Combină și sortează toate postările
  const allPosts = [...blogPosts, ...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Separă featured posts
  const featuredPosts = allPosts.filter((post) => post.featured);
  const regularPosts = allPosts.filter((post) => !post.featured);

  // Categorii pentru filtrare
  const categories = Array.from(
    new Set(
      allPosts
        .map((post) => post.category)
        .filter((category): category is string => Boolean(category))
    )
  );

  // Tags populare
  const allTags = allPosts.flatMap((post) => post.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <BlogListClient
      allPosts={allPosts}
      featuredPosts={featuredPosts}
      regularPosts={regularPosts}
      categories={categories}
      popularTags={popularTags}
    />
  );
}
