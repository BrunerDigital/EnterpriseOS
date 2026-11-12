import content from "./editorial-content.json";

type EditorialArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  service: string;
  publishedAt?: string;
  image?: { src: string; alt: string };
  sections: { title: string; paragraphs: string[] }[];
  sources?: { label: string; url: string }[];
};

export const articles: EditorialArticle[] = content;
export const editorialDate = "2026-11-04";
