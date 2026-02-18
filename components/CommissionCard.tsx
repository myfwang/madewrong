import Link from "next/link";
import Image from "next/image";
import type { CommissionFrontmatter } from "@/lib/mdx";

export default function CommissionCard({ commission }: { commission: CommissionFrontmatter }) {
  return (
    <Link
      href={`/commissions/${commission.slug}`}
      className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square bg-zinc-100">
        <Image
          src={commission.thumbnail}
          alt={commission.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900">{commission.title}</h3>
        <p className="mt-1 text-sm text-zinc-500">{commission.description}</p>
      </div>
    </Link>
  );
}
