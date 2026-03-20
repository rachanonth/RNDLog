import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-8">
      <p className="font-serif text-2xl text-stone-900">Page not found.</p>
      <p className="mt-3 text-sm text-stone-400">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-xs tracking-widest uppercase text-stone-400 hover:text-stone-600 transition-colors font-sans"
      >
        ← Back home
      </Link>
    </div>
  );
}
