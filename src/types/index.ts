export interface Testimonial {
  id: number;
  name: string;
  role: string;
  association: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content?: string;
}
