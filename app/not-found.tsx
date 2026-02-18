import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-zinc-900">404</h1>
      <p className="mt-4 text-lg text-zinc-500">
        This page doesn&apos;t exist. Maybe it was made wrong.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Go Home
      </Link>
    </div>
  );
}
