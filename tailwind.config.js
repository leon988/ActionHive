/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'Arial', 'sans-serif']
      },
      colors: {
        'primary': '#8B5CF6',   // Main purple
        'secondary': '#C4B5FD', // Lighter purple for secondary elements
        'accent': '#6D28D9',    // Darker purple for accents
        'neutral': '#F3F4F6',   // Light gray for backgrounds
        'dark': '#3730A3',      // Dark purple for important text or elements
        'dark-grey': '#1F2937'  // Custom dark grey
      }
    },
  },
  plugins: [],
}