import { getAllBlogPosts } from "@/lib/mdx";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | Made Wrong",
  description: "News, updates, and behind-the-scenes from Made Wrong.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Blog</h1>
      <p className="mt-2 text-zinc-500">
        Blogs
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-10 text-center text-zinc-400">
          No posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
