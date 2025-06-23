import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', ...defaultTheme.fontFamily.sans],
        bio: ['BioRhyme_Expanded', ...defaultTheme.fontFamily.sans],
        bodoni : ['Bodoni', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
