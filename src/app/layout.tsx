import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const henSpecial = localFont({
  src: [
    {
      path: "../fonts/iannnnn-HENSpecial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iannnnn-HENSpecial-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hen-special",
});

export const metadata: Metadata = {
  title: {
    default: "Rachanont",
    template: "%s — Rachanont",
  },
  description: "A personal journal by Rachanont.",
  metadataBase: new URL("https://rachanont.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={henSpecial.variable} suppressHydrationWarning>
      <body className="antialiased bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col transition-colors">
        <ThemeProvider>
          <div className="w-full max-w-2xl mx-auto px-6 flex flex-col min-h-screen">
            <header className="pt-16 pb-12 flex items-center justify-between">
              <a
                href="/"
                className="font-serif text-xl tracking-wide text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
              >
                Rachanont
              </a>
              <div className="flex items-center gap-5">
                <Link
                  href="/projects"
                  className="text-sm font-sans text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  Projects
                </Link>
                <ThemeToggle />
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="py-12 mt-16 flex items-center justify-between">
              <p className="text-xs text-stone-400 dark:text-stone-500 font-sans">
                © {new Date().getFullYear()} Rachanont
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="/feed.xml"
                  aria-label="RSS feed"
                  className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/rachanonth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
