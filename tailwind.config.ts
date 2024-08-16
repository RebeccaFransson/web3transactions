import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#ff4eb8",
          transparent: "rgb(255, 78, 184, 0.2)",
          600: "#FF4E65",
          900: "rgb(100 0 53)",
        },
        orange: { DEFAULT: "#ff4e17", transparent: "rgb(255, 78, 23, 0.2)" },
        white: { DEFAULT: "#fff", transparent: "rgba(250,250,250, 0.2)" },
        gray: { DEFAULT: "#837678" },
      },
      width: {
        box: "900px",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  plugins: [],
};
export default config;
