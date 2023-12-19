/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        ocean: '#0A508B'
      }
    },
  },
  plugins: [],
})

export default config;
