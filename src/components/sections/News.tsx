import { getAllBlogPosts, getAllNews } from "@/lib/markdown";
import NewsClient from "./NewsClient";

export default function News() {
  // Server-side: citește fișierele Markdown
  const blogPosts = getAllBlogPosts();
  const newsItems = getAllNews();

  // Combină și sortează
  const allPosts = [...blogPosts, ...newsItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  // Pasează către client component
  return <NewsClient posts={allPosts} />;
}
