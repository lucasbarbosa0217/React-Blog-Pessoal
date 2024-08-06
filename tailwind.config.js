/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Gupter', 'serif'],
      },
      colors: {
        dark: {
          background1: '#0c0a09',
          background2: '#1c1917',
          background3: '#292524',
          textContent: '#f5f5f4',
          textDetail: '#a8a29e',
          textLink: '#7dd3fc',
          textVisited: '#8b5cf6',
          accent: '#f97316',
          accentSelected: '#ea580c',
          accentActive: '#c2410c',
          errorColor: '#fd9292',
        },
        light: {
          background1: '#d6d3d1',
          background2: '#e7e5e4',
          background3: '#fafaf9',
          textContent: '#1c1917',
          textDetail: '#44403c',
          textLink: '#0369a1',
          textVisited: '#4c1d95',
          accent: '#f97316',
          accentSelected: '#ea580c',
          accentActive: '#c2410c',
          errorColor: '#dc2626',
        },
      },
    },
  }
}
