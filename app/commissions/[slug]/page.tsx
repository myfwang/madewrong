import { compileMDX } from "next-mdx-remote/rsc";
import { getAllCommissions, getCommissionBySlug, type CommissionFrontmatter } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx";
import ImageGallery from "@/components/ImageGallery";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllCommissions().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const raw = getCommissionBySlug(slug);
    const { frontmatter } = await compileMDX<CommissionFrontmatter>({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return {
      title: `${frontmatter.title} | Made Wrong`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Commission | Made Wrong" };
  }
}

export default async function CommissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let raw: string;
  try {
    raw = getCommissionBySlug(slug);
  } catch {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<CommissionFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Left — text content */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <article className="prose prose-zinc mt-8 max-w-none">
            {content}
          </article>
        </div>

        {/* Right — scrollable album */}
        {frontmatter.images && frontmatter.images.length > 0 && (
          <div>
            <ImageGallery images={frontmatter.images} title={frontmatter.title} />
          </div>
        )}
      </div>
    </div>
  );
}
