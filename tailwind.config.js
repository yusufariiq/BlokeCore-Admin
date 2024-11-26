/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#C9080E',
        'white': '#FFFFFF',
        'black': '#1A1A1A',
        'hover-primary':'#9d060b',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true, 
    prefix: "", 
    logs: true,
    themeRoot: ":root",
  },
}

