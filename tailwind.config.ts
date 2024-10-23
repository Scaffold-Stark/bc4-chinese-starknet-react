import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#00abff",
        secondary: "#005cc4",
        info: "#0073ed",
        success: "#9bd500",
        warning: "#f9ac00",
        destructive: "#ff8da9",
      },
    },
  },
  plugins: [],
};
export default config;
