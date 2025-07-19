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

// Generează metadata avansată pentru SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Articol inexistent - ADIMO Blog",
      description: "Articolul căutat nu a fost găsit pe blogul ADIMO.",
    };
  }

  // Folosește SEO custom din frontmatter sau defaulturi
  const seoTitle = post.seo?.title || post.title;
  const seoDescription = post.seo?.description || post.excerpt;
  const seoKeywords = post.seo?.keywords;
  const canonicalUrl =
    post.seo?.canonical || `https://adimo.ro/blog/${post.slug}`;

  // Imaginea pentru social media
  const socialImage = post.social?.image || post.image;
  const socialTitle = post.social?.title || seoTitle;
  const socialDescription = post.social?.description || seoDescription;

  return {
    title: `${seoTitle} - ADIMO Blog`,
    description: seoDescription,
    keywords: seoKeywords,
    authors: post.author
      ? [{ name: post.author, url: post.authorLinkedIn }]
      : undefined,
    publisher: "ADIMO",
    category: post.category,

    // Open Graph
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type: "article",
      publishedTime: post.publishedAt || post.date,
      modifiedTime: post.lastModified,
      authors: post.author ? [post.author] : undefined,
      section: post.category,
      tags: post.tags,
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: post.imageAlt || post.title,
            },
          ]
        : undefined,
      url: canonicalUrl,
      siteName: "ADIMO Blog",
    },

    // Twitter Cards
    twitter: {
      card:
        post.social?.twitter_card === "summary_large_image"
          ? "summary_large_image"
          : "summary",
      title: socialTitle,
      description: socialDescription,
      images: socialImage ? [socialImage] : undefined,
      creator: post.authorTwitter,
      site: "@adimo_ro",
    },

    // Structurate Data și alte meta tags
    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: post.visibility === "public",
      follow: post.visibility === "public",
      googleBot: {
        index: post.visibility === "public",
        follow: post.visibility === "public",
      },
    },

    // Article specific metadata
    other: {
      "article:author": post.author || "",
      "article:section": post.category || "",
      "article:tag": post.tags?.join(",") || "",
      "article:published_time": post.publishedAt || post.date,
      "article:modified_time": post.lastModified || "",
      reading_time: post.readingTime?.toString() || "",
      difficulty: post.difficulty || "",
      version: post.version || "",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
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
