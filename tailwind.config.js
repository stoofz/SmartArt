/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#324E4B', // Map your primary color to 'primary'
          light: 'lighter-color-for-primary', // Define your custom light color
          dark: 'darker-color-for-primary', // Define your custom dark color
        },
        secondary: {
          DEFAULT: '#F5C9C6', // Map your secondary color to 'secondary'
        },
        warning: {
          DEFAULT: '#893F04', // Map your warning color to 'warning'
        },
        info: {
          DEFAULT: '#fff', // Map your info color to 'info'
        },
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}