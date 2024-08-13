import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import Settings from '../pages/Settings'
import i18n from '../locales/i18n'

// 상태를 전역에서 관리하기 위한 변수
let isDarkMode = false
let language = 'en'

// `useThemeStore`를 모킹하여 상태를 관리
const mockSetLanguage = vi.fn((newLanguage) => {
  language = newLanguage
  i18n.changeLanguage(newLanguage)
})

vi.mock('../stores/themeStore', () => ({
  useThemeStore: () => ({
    isDarkMode,
    toggleDarkMode: () => {
      isDarkMode = !isDarkMode
    },
    setLanguage: mockSetLanguage, // vi.fn으로 감싸진 mockSetLanguage 사용
    language,
  }),
}))

describe('Settings Page', () => {
  beforeEach(() => {
    // i18n의 초기 언어를 영어로 설정
    i18n.changeLanguage('en')
    isDarkMode = false // 상태 초기화
    language = 'en' // 상태 초기화

    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/settings']}>
          <Routes>
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>,
    )
  })

  it('renders the settings page', () => {
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByLabelText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('Language Selection:')).toBeInTheDocument()
  })

  it('allows toggling dark mode', async () => {
    const darkModeCheckbox = screen.getByLabelText('Dark Mode')
    expect(darkModeCheckbox).not.toBeChecked()

    await userEvent.click(darkModeCheckbox)

    expect(isDarkMode).toBe(true) // 상태가 변경되었는지 확인
  })

  it('allows selecting a language', async () => {
    const languageSelect = screen.getByRole('combobox')

    // DOM 출력하여 현재 상태 확인
    console.warn(languageSelect.outerHTML)

    // 초기 상태가 영어로 되어 있는지 확인
    expect(languageSelect).toHaveValue('en')

    // 언어를 한국어로 선택
    await userEvent.selectOptions(languageSelect, 'ko')

    // 언어 변경이 화면에 반영되도록 대기
    await waitFor(() => {
      expect(languageSelect).toHaveValue('ko')
    })

    // DOM 출력하여 현재 상태 확인
    console.warn(languageSelect.outerHTML)

    // `setLanguage`가 호출되었는지 확인
    expect(language).toBe('ko')
    expect(i18n.language).toBe('ko')

    // vi.fn 사용의 의미를 확인하기 위한 호출 검증
    expect(mockSetLanguage).toHaveBeenCalledTimes(1) // setLanguage가 1회 호출되었는지 확인
    expect(mockSetLanguage).toHaveBeenCalledWith('ko') // 'ko' 인수로 호출되었는지 확인
  })
})
