import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
        Made Wrong
      </h1>
      <p className="mt-4 max-w-md text-lg text-zinc-500">
        Custom clothing &amp; commissions. Every piece is one of a kind, made
        wrong on purpose.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/commissions"
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          View Work
        </Link>
        <Link
          href="/order"
          className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Place an Order
        </Link>
      </div>
    </div>
  );
}
