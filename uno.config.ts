// uno.config.ts
import { defineConfig, presetAttributify, presetIcons } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
  presets: [
    presetWind3(),          // ✅ Replaces deprecated presetUno()
    presetAttributify(),
    presetIcons(),
  ],
  safelist: [
    'border-pink-200',
    'border-purple-200',
    'border-blue-200',
    'text-pink-500',
    'text-pink-700',
    'text-purple-600',
  ],
  theme: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, sans-serif',
    },
  },
})
