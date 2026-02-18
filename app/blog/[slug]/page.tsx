import { compileMDX } from "next-mdx-remote/rsc";
import { getAllBlogPosts, getBlogPostBySlug, type BlogFrontmatter } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const raw = getBlogPostBySlug(slug);
    const { frontmatter } = await compileMDX<BlogFrontmatter>({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return {
      title: `${frontmatter.title} | Made Wrong`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Blog | Made Wrong" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let raw: string;
  try {
    raw = getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  if (!frontmatter.published) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium text-zinc-400">
        {new Date(frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" "}&middot;{" "}
        {frontmatter.author}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
        {frontmatter.title}
      </h1>

      <article className="prose prose-zinc mt-10 max-w-none">
        {content}
      </article>
    </div>
  );
}
