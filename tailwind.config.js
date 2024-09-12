import SideBar from './src/components/sideBar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          default:'#131314',
          SideBar:'#1e1f20'
        }
      }
    },
  },
  plugins: [],
}

