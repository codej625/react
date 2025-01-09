# React의 서버 상태 관리를 위한 라이브러리

<br />
<br />

* React query ?
---

```
// 클라이언트 상태와 / 서버 상태의 분리

클라이언트에서 사용하는 상태와,
서버에서 가져온 상태를 혼합하여 사용할 경우
상태 관리와 로직 작성이 복잡해지고 유지보수가 어려워질 수 있는데,
이럴 때 React Query를 사용하면
서버 상태를 따로 관리할 수 있어 프로젝트 관리가 편해진다.
```

```
// 최신 상태 유지

서버의 최신 상태를 가져오는 기능을 제공한다.
일정 시간마다 상태를 업데이트하거나,
특정 동작 이후에 상태를 업데이트할 수 있다.
```

```
// 캐싱, 중복 요청 방지

API 요청 결과를 캐싱하여 관리한다.
서버에 API 요청하여 받아온 결과를 캐싱하며,
중복 요청을 최소화할 수 있다.
```

```
// 비동기 요청에 대한 상태 핸들링

비동기 API 요청에 대한 로딩 상태, 결과 값, 에러 상태와 같은
여러가지 상태를 확인하는 기능을 제공한다.
```

<br />
<br />
<br />
<br />

1. Install

```
// 리액트 쿼리 설치

npm i @tanstack/react-query

or

pnpm add @tanstack/react-query

or

yarn add @tanstack/react-query

or

bun add @tanstack/react-query
```

<br />

```
// 버그와 불일치를 잡는 데 도움이 되는 ESLint 플러그인 쿼리

npm i -D @tanstack/eslint-plugin-query

or

pnpm add -D @tanstack/eslint-plugin-query

or

yarn add -D @tanstack/eslint-plugin-query

or

bun add -D @tanstack/eslint-plugin-query
```

<br />

```
ESLint 설정 파일(일반적으로 .eslintrc.json, .eslintrc.js, 또는 .eslintrc.yaml)을 열어 플러그인을 추가한다.
다음은 eslint.config.js 파일을 사용하는 예시
```

```js
// 추천 설정 플러그인의 모든 권장 규칙을 활성화

import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...pluginQuery.configs['flat/recommended'],
  // Any other config...
]
```

```js
// 플러그인을 로드하고 사용하려는 규칙만 구성

import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
  // Any other config...
]
```

<br />
<br />
<br />

2. Import QueryClient

```jsx
// App.jsx

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

// Default options set
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60,
//       retry: 1,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <{Component} /> or Router
    </QueryClientProvider>
  )
}
```

```
QueryClientProvider를 앱의 최상위 컴포넌트로 감싸면,
앱 전체에서 동일한 QueryClient 인스턴스를 사용할 수 있다.

이렇게 하면 React Query의 상태를 모든 하위 컴포넌트에서 공유할 수 있으며,
각 컴포넌트에서 필요한 경우 데이터를 쉽게 가져올 수 있다.
```

<br />
<br />
<br />

3. Queries 사용 예시

```tsx
function Todos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList, // Fetch function
    // staleTime: staleTime: 5 * 1000, // data가 fresh 상태로 남아있는 시간
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // 이 시점에서는 isSuccess === true 라고 가정할 수 있다.
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
```

```
// 상태 필드 외에 추가적인 "fetchStatus" 속성이 있다.

fetchStatus === 'fetching' // 쿼리가 현재 데이터를 가져오고 있는 상태
fetchStatus === 'paused'   // 쿼리가 데이터를 가져오려 했으나 일시 중지된 상태
fetchStatus === 'idle'     // 쿼리가 현재 아무 작업도 하지 않는 상태
```

```
// staleTime

1) staleTime의 값을 설정해주지 않으면 기본값은 0
(data를 fetch 해오자마자 data를 신선하지 않다고 간주)

예시) 특정 쿼리 키에 대한 data를 다시 fetch 해와야 하는 상황일 때,

data가 fresh한 상태라면 -> API 호출 없이 캐싱된 data가 다시 사용
data가 stale한 상태라면 -> API 호출을 통해 신선한 data를 다시 fetch해오고, 이 data를 cache에 저장
```

<br />

```tsx
// 쿼리 키는 가져올 데이터를 고유하게 설명해야 하므로, 이런 식으로도 키설정이 가능

function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    ...
  })
}
```

```js
/**
 * 쿼리 키는 가져오는 데이터를 고유하게 식별하는 것뿐만 아니라,
 * QueryFunctionContext의 일부로 쿼리 함수에 전달된다.
 *
 * 이는 쿼리 함수를 추출해야 할 때 유용할 수 있다.
 */
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// 쿼리 함수에서 키, 상태, 페이지 변수를 접근
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```
