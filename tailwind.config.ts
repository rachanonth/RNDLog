import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-hen-special)", "Georgia", "serif"],
        serif: ["var(--font-hen-special)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      typography: {
        stone: {
          css: {
            "--tw-prose-body": "#292524",       // stone-800
            "--tw-prose-headings": "#1c1917",   // stone-900
            "--tw-prose-lead": "#57534e",       // stone-600
            "--tw-prose-links": "#1c1917",
            "--tw-prose-bold": "#1c1917",
            "--tw-prose-counters": "#78716c",   // stone-500
            "--tw-prose-bullets": "#a8a29e",    // stone-400
            "--tw-prose-hr": "#e7e5e4",         // stone-200
            "--tw-prose-quotes": "#1c1917",
            "--tw-prose-quote-borders": "#d6d3d1", // stone-300
            "--tw-prose-captions": "#78716c",
            "--tw-prose-code": "#1c1917",
            "--tw-prose-pre-code": "#e7e5e4",
            "--tw-prose-pre-bg": "#292524",
            "--tw-prose-th-borders": "#d6d3d1",
            "--tw-prose-td-borders": "#e7e5e4",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
