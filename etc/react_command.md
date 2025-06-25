# React 관련 명령어

<br />
<br />

* CRA, Vite와 같은 빌드 도구 명령어를 알아보자

---

<br />
<br />
<br />
<br />

1. Create React App(CRA)

<br />

`새로운 React 프로젝트를 생성`

```
// npx create-react-app <프로젝트명>

npx create-react-app my-app
```

<br />

`개발 서버를 시작하고, 코드 변경 시 자동으로 새로고침 (CRA 기본 스크립트)`

```
npm start
```

<br />

`프로덕션용 빌드를 생성 (최적화된 파일이 build 폴더에 저장)`

```
npm run build
```

<br />

`Jest를 사용해 테스트를 실행`

```
npm test
```

<br />
<br />
<br />

2. Vite

<br />

`Vite로 새로운 React 프로젝트를 생성`

```
// npm create vite@latest

npm create vite@latest my-vite-app
```

<br />

`Vite 개발 서버를 시작 (빠른 HMR(Hot Module Replacement)을 지원)`

```
npm run dev
```

<br />

`프로덕션용 빌드를 생성`

```
npm run build
```

<br />

`빌드된 프로젝트를 로컬에서 미리보기한다.`

```
npm run preview
```

<br />
<br />
<br />

3. Yarn 명령어 (npm 대체)

<br />

`새로운 프로젝트를 초기화`

```
yarn init
```

<br />

`패키지를 설치`

```
// yarn add <패키지명>

yarn add react
```

<br />

`개발용 의존성을 설치`

```
// yarn add --dev <패키지명>

yarn add --dev jest
```

<br />

`package.json의 start 스크립트를 실행`

```
yarn start
```

<br />

`프로덕션 빌드를 생성`

```
yarn build
```

<br />

`패키지를 제거`

```
// yarn remove <패키지명>

yarn remove lodash
```
