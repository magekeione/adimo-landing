import {
  getAllBlogPosts,
  getAllNews,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/lib/markdown";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { Metadata } from "next";

// Generează params pentru toate postările (pentru static generation)
export async function generateStaticParams() {
  const blogPosts = getAllBlogPosts();
  const newsItems = getAllNews();
  const allPosts = [...blogPosts, ...newsItems];

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Verifică dacă articolul poate fi accesat public
  if (post.status !== "published" || post.visibility !== "public") {
    notFound();
  }

  // Obține postări similare folosind noul algoritm
  const relatedPosts = getRelatedPosts(post, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
