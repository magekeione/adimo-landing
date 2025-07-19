import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "@/types/blog";

const contentDirectory = path.join(process.cwd(), "content");
const blogDirectory = path.join(contentDirectory, "blog");
const newsDirectory = path.join(contentDirectory, "news");

// Creează directoarele dacă nu există
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Calculează timpul de citire
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Procesează un fișier markdown
function processMarkdownFile(
  fileName: string,
  directory: string
): BlogPost | null {
  try {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const data = matterResult.data;

    // Calculează timpul de citire dacă nu este specificat
    const readingTime =
      data.readingTime || calculateReadingTime(matterResult.content);

    return {
      slug,
      // Informații de bază
      title: data.title || "Untitled",
      excerpt: data.excerpt || "",
      date: data.date || new Date().toISOString().split("T")[0],
      lastModified: data.lastModified,
      publishedAt: data.publishedAt,

      // Autor și contributori
      author: data.author,
      authorRole: data.authorRole,
      authorBio: data.authorBio,
      authorEmail: data.authorEmail,
      authorLinkedIn: data.authorLinkedIn,
      authorTwitter: data.authorTwitter,
      authorAvatar: data.authorAvatar,
      contributors: data.contributors,

      // Categorizare
      category: data.category,
      subcategory: data.subcategory,
      tags: data.tags || [],

      // Status și vizibilitate
      featured: data.featured || false,
      featured_order: data.featured_order,
      status: data.status || "published",
      visibility: data.visibility || "public",
      sticky: data.sticky || false,
      breaking_news: data.breaking_news || false,

      // Multimedia
      image: data.image,
      imageAlt: data.imageAlt,
      imageCaption: data.imageCaption,
      imageCredits: data.imageCredits,
      gallery: data.gallery,
      video: data.video,

      // SEO și Marketing
      seo: data.seo,
      social: data.social,

      // Metrici
      readingTime,
      difficulty: data.difficulty,
      target_audience: data.target_audience,
      stats: data.stats,

      // Organizare conținut
      toc: data.toc,
      toc_depth: data.toc_depth,
      sections: data.sections,

      // Legături și resurse
      related_posts: data.related_posts,
      resources: data.resources,
      sources: data.sources,

      // Configurări tehnice
      layout: data.layout,
      template: data.template,
      sidebar: data.sidebar,
      show_author: data.show_author,
      show_date: data.show_date,
      show_reading_time: data.show_reading_time,
      show_tags: data.show_tags,
      show_social_share: data.show_social_share,
      show_related: data.show_related,
      enable_comments: data.enable_comments,

      // CTA și monetizare
      cta: data.cta,

      // Workflow
      version: data.version,
      review_status: data.review_status,
      editor: data.editor,
      reviewer: data.reviewer,
      approved_by: data.approved_by,
      approved_date: data.approved_date,
    } as BlogPost;
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    ensureDirectoryExists(blogDirectory);

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => processMarkdownFile(fileName, blogDirectory))
      .filter((post): post is BlogPost => post !== null)
      .filter(
        (post) => post.status === "published" && post.visibility === "public"
      ); // Doar articolele publice

    return allPostsData.sort((a, b) => {
      // Sortează: sticky -> featured -> dată
      if (a.sticky && !b.sticky) return -1;
      if (!a.sticky && b.sticky) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.date < b.date) return 1;
      else return -1;
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export function getAllNews(): BlogPost[] {
  try {
    ensureDirectoryExists(newsDirectory);

    const fileNames = fs.readdirSync(newsDirectory);
    const allNewsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => processMarkdownFile(fileName, newsDirectory))
      .filter((post): post is BlogPost => post !== null)
      .filter(
        (post) => post.status === "published" && post.visibility === "public"
      );

    return allNewsData.sort((a, b) => {
      if (a.breaking_news && !b.breaking_news) return -1;
      if (!a.breaking_news && b.breaking_news) return 1;
      if (a.date < b.date) return 1;
      else return -1;
    });
  } catch (error) {
    console.error("Error reading news:", error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    // Încearcă în blog
    let fullPath = path.join(blogDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      // Încearcă în news
      fullPath = path.join(newsDirectory, `${slug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Convertește markdown în HTML
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const content = processedContent.toString();

    const post = processMarkdownFile(
      path.basename(fullPath),
      path.dirname(fullPath)
    );
    if (!post) return null;

    return {
      ...post,
      content,
    };
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

// Funcții utilitare pentru filtrare
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];
  return allPosts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];
  return allPosts.filter((post) =>
    post.tags?.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];
  return allPosts
    .filter((post) => post.featured)
    .sort((a, b) => (a.featured_order || 999) - (b.featured_order || 999));
}

export function getPostsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];
  return allPosts.filter((post) => post.difficulty === difficulty);
}

export function getBreakingNews(): BlogPost[] {
  const allPosts = getAllNews();
  return allPosts.filter((post) => post.breaking_news);
}

export function searchPosts(query: string): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];
  const lowercaseQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category?.toLowerCase().includes(lowercaseQuery)
  );
}

// Funcție pentru a obține postări similare
export function getRelatedPosts(post: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = [...getAllBlogPosts(), ...getAllNews()];

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = 0;

      // Aceeași categorie = +3 puncte
      if (p.category === post.category) score += 3;

      // Tag-uri comune = +1 punct per tag
      const commonTags =
        p.tags?.filter((tag) => post.tags?.includes(tag)) || [];
      score += commonTags.length;

      // Același autor = +2 puncte
      if (p.author === post.author) score += 2;

      // Același nivel de dificultate = +1 punct
      if (p.difficulty === post.difficulty) score += 1;

      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}
