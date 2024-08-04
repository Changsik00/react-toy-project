import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '.'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // 기본 언어 설정
  fallbackLng: 'en', // 언어가 없을 경우 대체할 언어
  interpolation: {
    escapeValue: false, // React는 기본적으로 XSS를 방지합니다.
  },
})

export default i18n
