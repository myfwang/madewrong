import Link from "next/link";
import Image from "next/image";
import type { BlogFrontmatter } from "@/lib/mdx";

export default function BlogCard({ post }: { post: BlogFrontmatter }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-lg"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-zinc-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="mt-0.5 font-semibold text-zinc-900">{post.title}</h3>
        <p className="mt-0.5 truncate text-sm text-zinc-500">{post.description}</p>
      </div>
      {post.thumbnail && (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      )}
    </Link>
  );
}
