import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d8ebff",
          200: "#b9dcff",
          300: "#8ec8ff",
          400: "#5aaaff",
          500: "#2f84ff",
          600: "#1f68f5",
          700: "#1b53e1",
          800: "#1d46b6",
          900: "#1e3f90"
        },
        danger: {
          low: "#16a34a",
          medium: "#eab308",
          high: "#f97316",
          critical: "#dc2626"
        }
      },
      boxShadow: {
        panel: "0 16px 40px -22px rgba(17, 24, 39, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
