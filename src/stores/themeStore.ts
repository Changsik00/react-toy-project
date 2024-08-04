import { create } from 'zustand'

const DARK_CLASS = 'dark'
const LIGHT_CLASS = 'light'

// 시스템 다크 모드 변경 감지
const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

interface ThemeState {
  isDarkMode: boolean
  fontFamily: string
  language: string
  toggleDarkMode: () => void
  setLanguage: (language: string) => void
}

const applyDarkModeClass = (isDarkMode: boolean) => {
  document.documentElement.classList.toggle(DARK_CLASS, isDarkMode)
  document.documentElement.classList.toggle(LIGHT_CLASS, !isDarkMode)
}

const applyFontFamily = (fontFamily: string) => {
  document.documentElement.style.setProperty('--font-family', fontFamily)
  document.documentElement.style.fontFamily = fontFamily
}

const getFontByLanguage = (language: string): string => {
  switch (language) {
    case 'ko':
      return 'Noto Sans KR, Arial, sans-serif'
    case 'ja':
      return 'Noto Sans JP, Arial, sans-serif'
    case 'zh':
      return 'Noto Sans SC, Arial, sans-serif'
    case 'fr':
    case 'de':
    case 'es':
      return 'Roboto, Arial, sans-serif'
    default:
      return 'Arial, sans-serif'
  }
}

const initializeTheme = () => {
  const isDarkMode = matchMedia.matches
  const initialLanguage = navigator.language.split('-')[0]
  const initialFontFamily = getFontByLanguage(initialLanguage)

  applyDarkModeClass(isDarkMode)
  applyFontFamily(initialFontFamily)

  return { isDarkMode, initialLanguage, initialFontFamily }
}

export const useThemeStore = create<ThemeState>((set, get) => {
  // 초기 테마 설정
  const { isDarkMode, initialLanguage, initialFontFamily } = initializeTheme()

  return {
    isDarkMode,
    fontFamily: initialFontFamily,
    language: initialLanguage,
    toggleDarkMode: () =>
      set((state) => {
        const isDarkMode = !state.isDarkMode
        if (isDarkMode !== state.isDarkMode) {
          applyDarkModeClass(isDarkMode)
          return { isDarkMode }
        }
        return state
      }),
    setLanguage: (language: string) => {
      if (language === get().language) {
        return
      }
      const fontFamily = getFontByLanguage(language)
      applyFontFamily(fontFamily)
      set({ fontFamily, language })
    },
  }
})

// 시스템 다크 모드 변경 감지 이벤트 핸들러
const handleDarkModeChange = (e: MediaQueryListEvent) => {
  const isDarkMode = e.matches
  const { isDarkMode: currentDarkMode } = useThemeStore.getState()
  if (isDarkMode !== currentDarkMode) {
    useThemeStore.setState({ isDarkMode })
    applyDarkModeClass(isDarkMode)
  }
}

matchMedia.addEventListener('change', handleDarkModeChange)
