import { create } from 'zustand'

const DARK_CLASS = 'dark'
const LIGHT_CLASS = 'light'

interface ThemeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const applyDarkModeClass = (isDarkMode: boolean) => {
  if (isDarkMode) {
    document.documentElement.classList.add(DARK_CLASS)
    document.documentElement.classList.remove(LIGHT_CLASS)
  } else {
    document.documentElement.classList.add(LIGHT_CLASS)
    document.documentElement.classList.remove(DARK_CLASS)
  }
}

export const useThemeStore = create<ThemeState>((set) => {
  // 시스템 설정에 따라 다크 모드 설정
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyDarkModeClass(isDarkMode)

  return {
    isDarkMode,
    toggleDarkMode: () =>
      set((state) => {
        const newIsDarkMode = !state.isDarkMode
        applyDarkModeClass(newIsDarkMode)
        return { isDarkMode: newIsDarkMode }
      }),
  }
})

// 시스템 다크 모드 변경 감지
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
matchMedia.addEventListener('change', (e) => {
  const isDarkMode = e.matches
  useThemeStore.setState({ isDarkMode })
  applyDarkModeClass(isDarkMode)
})
