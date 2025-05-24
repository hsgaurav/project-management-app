import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff0f1',
          100: '#ffdbde',
          200: '#ffb8c2',
          300: '#ff859b',
          400: '#ff4d6d',
          500: '#ff385c',
          600: '#ed1c4e',
          700: '#c8102e',
          800: '#a50e2a',
          900: '#8a0e27',
        },
        coral: {
          50: '#fff0f1',
          100: '#ffdbde', 
          200: '#ffb8c2',
          300: '#ff859b',
          400: '#ff4d6d',
          500: '#ff385c',
          600: '#ed1c4e',
          700: '#c8102e',
          800: '#a50e2a',
          900: '#8a0e27',
        },
        gray: {
          50: '#f7f7f7',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b0b0b0',
          500: '#717171',
          600: '#484848',
          700: '#222222',
          800: '#1a1a1a',
          900: '#0f0f0f',
        }
      },
      fontFamily: {
        sans: [
          "Circular",
          "-apple-system",
          "BlinkMacSystemFont",
          "Roboto",
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'DEFAULT': '8px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.08)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.1)',
        'card': '0 6px 16px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config; 