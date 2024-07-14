import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons(), presetAttributify()],
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  shortcuts: [
    {
      'dark-mode': 'dark:bg-gray-800 dark:text-white',
      'light-mode': 'light:bg-gray-100 light:text-gray-900',
    },
  ],
})
