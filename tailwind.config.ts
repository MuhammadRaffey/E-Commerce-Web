import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config = {
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

          secondary: "#00a124",

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
  theme: {},
  plugins: [require("tailwindcss-animate"), daisyui],
} satisfies Config;

export default config;
