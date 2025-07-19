import {
  getAllBlogPosts,
  getAllNews,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/lib/markdown";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/BlogPostClient";

// Generează params pentru toate postările (pentru static generation)
export async function generateStaticParams() {
  const blogPosts = getAllBlogPosts();
  const newsItems = getAllNews();
  const allPosts = [...blogPosts, ...newsItems];

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // Promise în loc de Record
}) {
  const { slug } = await params; // Await params
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  if (post.status !== "published" || post.visibility !== "public") {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
