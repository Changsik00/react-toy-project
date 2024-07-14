module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: './tsconfig.json', // 특정 tsconfig 파일 경로 지정 ex) ./tsconfig.backup.json
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: false,
        jsxSingleQuote: true, // JSX에서 single quote 사용
        arrowParens: 'always', // 화살표 함수에서 인자가 하나일 때 괄호 사용
        endOfLine: 'lf', // 줄바꿈을 LF로 통일
        bracketSpacing: true, // 객체 리터럴에서 괄호 사이의 공백 사용
        jsxBracketSameLine: false, // JSX의 닫는 태그를 다음 줄에 작성
        plugins: ['prettier-plugin-tailwindcss'],
      },
    ], // Prettier 규칙을 ESLint에 통합하고 설정을 포함
    semi: ['error', 'never'], // 세미콜론을 사용하지 않음
    quotes: ['error', 'single'], // 홑따옴표 사용 강제
    'no-console': 'warn', // console.log 사용시 경고
    'no-debugger': 'warn', // debugger 사용시 경고
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시를 비활성화
    '@typescript-eslint/no-non-null-assertion': 'warn', // non-null assertion 사용 경고
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 사용되지 않은 변수에 대한 경고
    'react/react-in-jsx-scope': 'off', // React 17+에서는 필요하지 않음
    'react/prop-types': 'off', // TypeScript 사용 시 PropTypes 불필요
    'react/jsx-uses-react': 'off', // React 17+에서는 필요하지 않음
    'react/jsx-uses-vars': 'error', // 사용되지 않는 JSX 변수 경고 방지
  },
}
