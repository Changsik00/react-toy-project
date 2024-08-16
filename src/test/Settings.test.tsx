import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import Settings from '@/pages/Settings'
import i18n from '@/locales/i18n'
import { useThemeStore } from '@/stores/themeStore'

describe('Settings Page', () => {
  beforeEach(() => {
    const { setLanguage } = useThemeStore.getState()

    i18n.changeLanguage('en')
    setLanguage('en')
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
    await waitFor(() => {
      const { isDarkMode } = useThemeStore.getState()
      expect(isDarkMode).toBe(true) // 상태가 변경되었는지 확인
    })
  })

  it('allows selecting a language', async () => {
    const languageSelect = screen.getByRole('combobox')

    // DOM 출력하여 현재 상태 확인
    console.warn(languageSelect.outerHTML)

    // 초기 상태가 영어로 되어 있는지 확인
    expect(languageSelect).toHaveValue('en')

    // 언어를 한국어로 선택
    await userEvent.selectOptions(languageSelect, 'ko')

    // DOM 출력하여 현재 상태 확인
    console.warn(languageSelect.outerHTML)

    // 언어 변경이 화면에 반영되도록 대기
    await waitFor(() => {
      const { language } = useThemeStore.getState()
      expect(languageSelect).toHaveValue('ko')
      // `setLanguage`가 호출되었는지 확인
      expect(language).toBe('ko')
      expect(i18n.language).toBe('ko')
    })
  })
})
