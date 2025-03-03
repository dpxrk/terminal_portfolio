import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.05" },
          "50%": { opacity: "0.1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
