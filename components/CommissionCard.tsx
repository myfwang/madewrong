import Link from "next/link";
import Image from "next/image";
import type { CommissionFrontmatter } from "@/lib/mdx";

export default function CommissionCard({ commission }: { commission: CommissionFrontmatter }) {
  return (
    <Link
      href={`/commissions/${commission.slug}`}
      className="group block overflow-hidden rounded-lg transition-colors w-[500px]"
    >
      <div className="relative aspect-[3/4] bg-transparent transition-colors group-hover:bg-zinc-100">
        <Image
          src={commission.thumbnail}
          alt={commission.title}
          fill
          className="object-contain transition-opacity duration-700 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
        {commission.images?.[0] && (
          <Image
            src={commission.images[0]}
            alt={commission.title}
            fill
            className="object-contain transition-opacity duration-700 opacity-0 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 text-center">{commission.title}</h3>
      </div>
    </Link>
  );
}
