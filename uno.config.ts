import { defineConfig, presetUno, presetIcons, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 기본 스타일 프리셋
    presetWind(), // Windi CSS 프리셋
    presetIcons(), // 아이콘 프리셋,
  ],
})
