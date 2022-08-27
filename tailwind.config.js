module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      sm: {'max': '420px'},
      md: {'max': '960px'},
      lg: {'min': '961px'},
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#2f9176',
      'green-800': '#59a791',
      'yellow': '#ffc82c',
      'white': '#ffffff',
      'white-sub': '#e3e3e3',
      'black': '#1f1f22',
      'dark': '#121212',
      'gray-dark': '#273444',
      'gray': '#242424',
      'gray-light': '#27272a',
      'gray-white': '#52525b'
    },
    extend: {
      padding: {
        '4-25': '4.25rem',
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp')
  ],
  daisyui: {
    themes: [
      {
        mylight: {
          primary: "#1f1f22",
          secondary: "#e3e3e3",
          accent: "#37cdbe",
          neutral: "#ffffff",
          "base-100": "#ffffff",
        },
      },
      {
        mydark: {
          primary: "#ffffff",
          secondary: "#52525b",
          accent: "#37cdbe",
          neutral: "#27272a",
          "base-100": "#1f1f22",
        },
      }
    ],
  },
}
