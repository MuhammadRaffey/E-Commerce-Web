import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0083ff",
          secondary: "#0083ff",
          accent: "#ff3200",
          neutral: "#0d1014",
          "base-100": "#fffadb",
          info: "#00ccff",
          success: "#68a600",
          warning: "#f97d17",
          error: "#ff4b7a",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  prefix: "",
  theme: {
    extend: {
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("tailwindcss-animate"), daisyui],
};

export default config;
