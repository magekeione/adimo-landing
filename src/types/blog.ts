export interface BlogAuthor {
  name: string;
  role?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: string;
}

export interface BlogContributor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogGalleryItem {
  url: string;
  alt: string;
  caption?: string;
}

export interface BlogVideo {
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: string;
}

export interface BlogSEO {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export interface BlogSocial {
  title?: string;
  description?: string;
  image?: string;
  twitter_card?: string;
}

export interface BlogResource {
  title: string;
  url: string;
  type:
    | "documentation"
    | "external"
    | "download"
    | "legal"
    | "study"
    | "report";
}

export interface BlogCTA {
  type: "demo" | "trial" | "download" | "contact";
  title: string;
  description: string;
  button_text: string;
  button_url: string;
}

export interface BlogPost {
  // Informații de bază
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lastModified?: string;
  publishedAt?: string;

  // Autor și contributori
  author?: string;
  authorRole?: string;
  authorBio?: string;
  authorEmail?: string;
  authorLinkedIn?: string;
  authorTwitter?: string;
  authorAvatar?: string;
  contributors?: BlogContributor[];

  // Categorizare
  category?: string;
  subcategory?: string;
  tags?: string[];

  // Status și vizibilitate
  featured?: boolean;
  featured_order?: number;
  status?: "draft" | "published" | "archived";
  visibility?: "public" | "private" | "members-only";
  sticky?: boolean;
  breaking_news?: boolean;

  // Multimedia
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredits?: string;
  gallery?: BlogGalleryItem[];
  video?: BlogVideo;

  // SEO și Marketing
  seo?: BlogSEO;
  social?: BlogSocial;

  // Metrici
  readingTime?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  target_audience?: string[];

  // Organizare conținut
  toc?: boolean;
  toc_depth?: number;
  sections?: string[];

  // Legături și resurse
  related_posts?: string[];
  resources?: BlogResource[];
  sources?: BlogResource[];

  // Configurări tehnice
  layout?: string;
  template?: string;
  sidebar?: boolean;
  show_author?: boolean;
  show_date?: boolean;
  show_reading_time?: boolean;
  show_tags?: boolean;
  show_social_share?: boolean;
  show_related?: boolean;
  enable_comments?: boolean;

  // CTA și monetizare
  cta?: BlogCTA;

  // Workflow
  version?: string;
  review_status?: "draft" | "review" | "approved" | "published";
  editor?: string;
  reviewer?: string;
  approved_by?: string;
  approved_date?: string;

  // Conținut procesat
  content?: string;
}
