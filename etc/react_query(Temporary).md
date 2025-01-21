# React의 서버 상태 관리를 위한 라이브러리

<br />
<br />

* React query ?
---

<br />

`1) 클라이언트 상태와 / 서버 상태의 분리`

```
클라이언트에서 사용하는 상태와,
서버에서 가져온 상태를 혼합하여 사용할 경우
상태 관리와 로직 작성이 복잡해지고 유지보수가 어려워질 수 있는데,
이럴 때 React Query를 사용하면
서버 상태를 따로 관리할 수 있어 프로젝트 관리가 편해진다.
```

<br />

`2) 최신 상태 유지`

```
서버의 최신 상태를 가져오는 기능을 제공한다.
일정 시간마다 상태를 업데이트하거나,
특정 동작 이후에 상태를 업데이트할 수 있다.
```

<br />

`3) 캐싱, 중복 요청 방지`

```
API 요청 결과를 캐싱하여 관리한다.
서버에 API 요청하여 받아온 결과를 캐싱하며,
중복 요청을 최소화할 수 있다.
```

<br />

`4) 비동기 요청에 대한 상태 핸들링`

```
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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchWeather = async () => {
  const { data } = await axios.get('https://api.example.com/weather');
  return data;
};

const WeatherComponent = () => {
  const { isLoading, error, data, isFetching } = useQuery(
    ['weather'],
    fetchWeather,
    {
      staleTime: 5000,  // 5초 동안 데이터가 신선함으로 간주됩니다.
      cacheTime: 10000, // 데이터가 캐시에서 10초 동안 유지됩니다.
      refetchOnWindowFocus: true, // 창 포커스 변경 시 재페치
      refetchInterval: false, // 자동 새로 고침 없음
      retry: 3, // 실패 시 재시도 횟수
      onSuccess: () => { console.log('Data fetched successfully'); }, // 성공 시 호출
      onError: (error) => { console.error('Error fetching data:', error); }, // 실패 시 호출
      initialData: { weather: 'Fetching weather...' }, // 기본 데이터
      select: (data) => data.weather, // 데이터 변환
      enabled: true, // 쿼리 자동 실행 여부
      refetchOnReconnect: true, // 네트워크 재연결 시 재페치
      refetchOnMount: true, // 컴포넌트 마운트 시 재페치
      keepPreviousData: true, // 이전 데이터 유지
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Current Weather</h1>
      <p>{data}</p>
      {isFetching && <span>Updating...</span>}
    </div>
  );
};
```

```
// 상태 필드 외에 추가적인 "fetchStatus" 속성이 있다.

fetchStatus === 'fetching' // 쿼리가 현재 데이터를 가져오고 있는 상태
fetchStatus === 'paused'   // 쿼리가 데이터를 가져오려 했으나 일시 중지된 상태
fetchStatus === 'idle'     // 쿼리가 현재 아무 작업도 하지 않는 상태
```

```
// 자주 사용되는 옵션

useQuery({
  queryKey: ['todo', id],
  queryFn: () => fetchTodoById(id),
  staleTime: 5000, // 데이터가 'fresh'한 상태로 유지되는 시간
  cacheTime: 300000, // 캐시된 데이터가 유지되는 시간
  retry: 3, // 실패 시 재시도 횟수
  refetchOnWindowFocus: false, // 윈도우 포커스 시 재조회 여부
  enabled: !!id, // 쿼리 활성화 조건
})
```

```jsx
// 쿼리 키는 가져올 데이터를 고유하게 설명해야 하므로, 이런 식으로도 키설정이 가능

function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ['todos', todoId],
    ...
  })
}
```

<br />

| 옵션 | 설명 | 기본값 |
|:---|:---|:---|
| `staleTime` | 데이터가 '신선'하다고 간주되는 시간 (밀리초) | 0 |
| `cacheTime` | 데이터가 캐시에 남아 있는 시간 (밀리초) | 300000 (5분) |
| `refetchOnWindowFocus` | 창 포커스 변경 시 데이터 재페치 여부 | true |
| `refetchInterval` | 자동으로 데이터를 새로 고침하는 간격 (밀리초), `false`로 설정 시 주기적 재페치 없음 | `false` |
| `retry` | 데이터 페치 실패 시 재시도 횟수 | 3 |
| `onSuccess` | 데이터 페치 성공 시 호출되는 함수 | - |
| `onError` | 데이터 페치 실패 시 호출되는 함수 | - |
| `enabled` | 쿼리가 자동으로 실행되는지 여부, `false`로 설정 시 쿼리 자동 실행 안됨 | true |
| `select` | 쿼리 결과 데이터를 변환하는 함수 | - |
| `initialData` | 캐시에 데이터가 없을 때 사용할 기본 데이터 | - |
| `refetchOnReconnect` | 네트워크 재연결 시 데이터 재페치 여부 | true |
| `refetchOnMount` | 컴포넌트 마운트 시 데이터 재페치 여부 | true |
| `keepPreviousData` | 데이터 요청하는 동안 이전 데이터를 유지할지 여부 | false |

<br />
<br />
<br />

4. 추후 업데이트 사항

```
1) useMutation - 데이터 변경 작업(CREATE, UPDATE, DELETE)에 사용

2) useInfiniteQuery - 무한 스크롤 구현에 사용

3) useQueryClient - QueryClient 인스턴스에 직접 접근할 때 사용
```

```
// Select options

const { data: todoTitles } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (data) => data.map(todo => todo.title) // 제목만 추출
})
```
