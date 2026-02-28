import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ── Interfaces ──────────────────────────────────────────────

export interface CommissionFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  featured: boolean;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  time?: string; // optional, e.g. "14:30" or "9:00"
  description: string;
  thumbnail: string;
  author: string;
  tags: string[];
  published: boolean;
}

// ── Directories ─────────────────────────────────────────────

const commissionsDir = path.join(process.cwd(), "content/commissions");
const blogDir = path.join(process.cwd(), "content/blog");

// ── Commissions ─────────────────────────────────────────────

export function getAllCommissions(): CommissionFrontmatter[] {
  const files = fs.readdirSync(commissionsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(commissionsDir, filename), "utf-8");
      const { data } = matter(raw);
      return data as CommissionFrontmatter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getCommissionBySlug(slug: string) {
  const filePath = path.join(commissionsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw;
}

// ── Blog ────────────────────────────────────────────────────

export function getAllBlogPosts(): BlogFrontmatter[] {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(raw);
      return data as BlogFrontmatter;
    })
    .filter((post) => post.published)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}${a.time ? " " + a.time : ""}`).getTime();
      const dateB = new Date(`${b.date}${b.time ? " " + b.time : ""}`).getTime();
      return dateB - dateA;
    });
}

export function getBlogPostBySlug(slug: string) {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw;
}
