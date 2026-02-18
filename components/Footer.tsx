import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Jersey barrier image — tiles horizontally at natural size */}
      <div
        className="h-32 sm:h-40 md:h-48"
        style={{
          backgroundImage: "url('/images/madewrong-footer.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "center bottom",
        }}
        role="img"
        aria-label="Made Wrong jersey barrier"
      />

      {/* Footer content */}
      <div className="bg-zinc-900">
        <div className="flex flex-col items-center justify-evenly gap-8 px-6 py-10 sm:flex-row">
          {/* Contact */}
          <div className="text-center">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-100">
              Contact
            </h3>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>
                <a href="mailto:madewrong99@gmail.com" className="hover:text-white">
                  madewrong99@gmail.com
                </a>
              </li>
              <li>
                <Link href="/order" className="hover:text-white">
                  Commission a piece &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-zinc-100">
              Follow
            </h3>
            <ul className="space-y-1 text-sm text-zinc-400">
              <li>
                <a
                  href="https://instagram.com/madewrong99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} Made Wrong. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
