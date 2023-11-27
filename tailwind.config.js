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
          light: '#5a716e', // Define your custom light color
          dark: '#1e2e2d', // Define your custom dark color
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
      fontSize: {
        xs: '0.7rem',
      },
      screens: {
        'xs': '480px', // Add your custom screen size
        'md': '815px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}