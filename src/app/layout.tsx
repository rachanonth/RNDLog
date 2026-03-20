import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "The Archivist",
    template: "%s — The Archivist",
  },
  description: "A digital archive.",
  metadataBase: new URL("https://rachanont.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col transition-colors">
        <ThemeProvider>
          {/* TopNavBar */}
          <nav className="fixed top-0 w-full z-50 bg-[#faf9f6]/80 dark:bg-[#1a1c1a]/80 backdrop-blur-md border-b border-outline-variant/10">
            <div className="flex justify-between items-center max-w-5xl mx-auto px-6 h-20">
              <Link href="/" className="text-xl font-bold tracking-tighter text-[#1c1917] dark:text-[#faf9f6] font-headline">
                The Archivist
              </Link>
              <div className="hidden md:flex items-center gap-8 font-headline font-medium text-sm tracking-tight">
                <Link
                  href="/projects"
                  className="text-[#1c1917]/60 dark:text-[#faf9f6]/60 hover:text-[#1c1917] dark:hover:text-[#faf9f6] transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-[#1c1917]/60 dark:text-[#faf9f6]/60 hover:text-[#1c1917] dark:hover:text-[#faf9f6] transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="text-[#1c1917]/60 dark:text-[#faf9f6]/60 hover:text-[#1c1917] dark:hover:text-[#faf9f6] transition-colors"
                >
                  Blog
                </Link>
                <ThemeToggle />
              </div>
              <div className="md:hidden flex items-center">
                <button className="p-2 hover:bg-[#f4f3f0] dark:hover:bg-[#2a2d2a] rounded-sm transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </nav>

          <main className="pt-40 pb-24 px-6 max-w-5xl mx-auto flex-1 w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="w-full mt-auto py-12 bg-[#f4f3f0] dark:bg-[#141614] border-t border-outline-variant/10">
            <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-6 gap-4">
              <div className="font-body text-xs uppercase tracking-widest opacity-70 text-[#1c1917] dark:text-[#faf9f6]">
                © {new Date().getFullYear()} The Digital Archivist
              </div>
              <div className="flex gap-8">
                <a
                  href="https://github.com/rachanonth/"
                  className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity text-[#1c1917] dark:text-[#faf9f6]"
                >
                  GitHub
                </a>
                <a
                  href="/rss"
                  className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity text-[#1c1917] dark:text-[#faf9f6]"
                >
                  RSS
                </a>
                <a
                  href="/source"
                  className="font-body text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity text-[#1c1917] dark:text-[#faf9f6]"
                >
                  Source
                </a>
              </div>
            </div>
          </footer>

          {/* Decorative Grid Overlay */}
          <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] select-none">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#000 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
