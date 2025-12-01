/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#e8ab30", // Warm Gold
        secondary: "#FF8A65", // Soft Coral accent
        "background-light": "#FAFAFA", // Off-white, not stark white
        "background-dark": "#121212", // Deep almost-black
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
        "content-light": "#1A1A1A",
        "content-dark": "#EDEDED",
        "subtle-light": "#888888",
        "subtle-dark": "#A0A0A0",
        "border-light": "#E5E5E5",
        "border-dark": "#333333",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(232, 171, 48, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}