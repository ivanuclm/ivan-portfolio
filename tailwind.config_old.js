/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      borderRadius: { xl: "0.75rem", "2xl": "1rem" }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
