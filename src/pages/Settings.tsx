import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { useThemeStore } from '../stores/themeStore'
import { useTranslation } from 'react-i18next'

const Settings = () => {
  const { t, i18n } = useTranslation()
  const { isDarkMode, toggleDarkMode, setLanguage, language } = useThemeStore()
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
  }

  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1>{t('settings')}</h1>
        <label>
          <input type='checkbox' checked={isDarkMode} onChange={toggleDarkMode} />
          {t('darkMode')}
        </label>
        <div>
          <label>{t('languageSelection')}:</label>
          <select
            value={language}
            onChange={(e) => {
              const selectedLang = e.target.value
              i18n.changeLanguage(selectedLang)
              handleLanguageChange(e)
            }}
          >
            <option value='en'>{t('language.en')}</option>
            <option value='ko'>{t('language.ko')}</option>
            <option value='ja'>{t('language.ja')}</option>
            <option value='zh'>{t('language.zh')}</option>
            <option value='fr'>{t('language.fr')}</option>
            <option value='de'>{t('language.de')}</option>
            <option value='es'>{t('language.es')}</option>
          </select>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

export default Settings
