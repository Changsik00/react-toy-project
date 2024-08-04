import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { useThemeStore } from '../stores/themeStore'

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore()
  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1>설정</h1>
        <label>
          <input type='checkbox' checked={isDarkMode} onChange={toggleDarkMode} />
          다크 모드
        </label>
      </div>
    </ResponsiveLayout>
  )
}

export default Settings
