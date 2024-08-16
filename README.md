# React + TypeScript + Vite

이 프로젝트는 개인 프로젝트로, 현재는 보일러플레이트를 만드는 단계입니다. 

## 초기 설정

이 템플릿은 `React + TypeScript + Vite + SWC` 조합으로 초기 설정되어 있습니다.

자세한 내용은 [초기 설정 문서](./docs/initial-setup.md)를 참조하세요.


## 주요 기능
- **MSW**: `Mock` 데이터로 `API` 테스트
- **Vitest**: 로그인 기능 테스트
- **Tanstack Query**: 사용자 데이터 `fetch`
- **Axios**: `HTTP` 클라이언트 구성
- **Unocss**: 기본 스타일링은 `unocss`로 설정
- **Form Validate**: `react-hook-form` + `zod`로 구현 
- **Protected Route**: `react-router-dom` + `useAuthStore`를 사용해서 페이지 이동 제약
- **Global Store**: `zustand`, `jotai`
   - 현재는 `zustand`만 사용하고 있음 `top-down` 방식이기 때문에 차후 `bottom-up` 방식인 `jotai`도 도입할 예정   
   - `jotai`는 `context api`를 대체 할 예정임

