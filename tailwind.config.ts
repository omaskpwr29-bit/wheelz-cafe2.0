import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mist: "#ECEFF1",
        midnight: "#191970",
        deepnavy: "#0D0D2B",
        gold: "#F5C518",
        muted: "#8892A4",
        white: "#FFFFFF",
      },
      boxShadow: {
        card: "0 4px 24px rgba(25,25,112,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
