/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 'primary':"#5f6FFF"
        // 'primary':"#3788fe"        
        'primary':"#8EDBC0"  
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(250px, 1fr))'
      }
    },
  },
  plugins: [],
}