//tailwind config
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#0A2A66',
        gold:      '#D4A017',
        'gold-dark':'#b8870e',
        teal:      '#1C8EA6',
        'soft-grey':'#F2F4F7',
        charcoal:  '#333333',
        border:    '#E5E5E5',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
