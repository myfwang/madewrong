import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between px-6 py-24 text-center min-h-screen bg-[url('/images/home-wall.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-white/15">
      <div className="relative z-10" />
      <div className="relative z-10">
        <h1 className="text-[10vw] font-bold tracking-tight text-zinc-900 whitespace-nowrap">
          madew<span className="inline-block scale-x-[-1] ml-[0.1em]">r</span>ong
        </h1>
      </div>
      <div className="relative z-10 mb-8 flex gap-4">
        <Link
          href="/commissions"
          className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          View Work
        </Link>
        {/* <Link
          href="/order"
          className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          Place an Order
        </Link> */}
      </div>
    </div>
  );
}
