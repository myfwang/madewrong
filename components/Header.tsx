import Link from "next/link";
import MobileNav from "./MobileNav";
import FloatingNav from "./FloatingNav";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/commissions", label: "Commissions" },
  { href: "/blog", label: "Blog" },
  { href: "/order", label: "Order" },
];

export default function Header() {
  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-100">
            Made Wrong
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <MobileNav links={navLinks} />
        </div>
      </header>

      <FloatingNav links={navLinks} />
    </>
  );
}
