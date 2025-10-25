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
        primary: {
          DEFAULT: '#667eea',
          dark: '#5a67d8',
        },
        sidebar: {
          DEFAULT: '#2d3748',
          hover: '#4a5568',
        }
      },
    },
  },
  plugins: [],
};
export default config;
