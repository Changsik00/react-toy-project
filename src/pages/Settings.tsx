import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { useThemeStore } from '../stores/themeStore'

const Settings = () => {
  const { isDarkMode, toggleDarkMode, setLanguage, language } = useThemeStore()
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
  }

  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1>설정</h1>
        <label>
          <input type='checkbox' checked={isDarkMode} onChange={toggleDarkMode} />
          다크 모드
        </label>
        <div>
          <label>언어 선택: </label>
          <select value={language} onChange={handleLanguageChange}>
            <option value='en'>영어</option>
            <option value='ko'>한국어</option>
            <option value='ja'>일본어</option>
            <option value='zh'>중국어</option>
            <option value='fr'>프랑스어</option>
            <option value='de'>독일어</option>
            <option value='es'>스페인어</option>
          </select>
        </div>
      </div>
    </ResponsiveLayout>
  )
}

export default Settings
