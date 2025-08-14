# React Suspense

<br />
<br />

* React에서 비동기 작업

---

```
React Suspense는 React에서 비동기 작업을 선언적으로 처리할 수 있게 해주는 기능이다.

사용자 경험을 개선하기 위해,
컴포넌트가 데이터나 리소스를 기다리는 동안 대체 UI를 표시한다.
```

<br />
<br />
<br />
<br />

1. React Suspense의 주요 특징

<br />

|-|-|
|-|-|
| 목적 | 컴포넌트 렌더링을 특정 조건(예: 데이터 로드 완료)이 충족될 때까지 "일시 중지"한다. |
| 사용법 | <Suspense> 컴포넌트로 감싸고 fallback prop을 사용해 로딩 중 표시할 UI를 지정한다. |
| 주요 사용 사례 | 데이터 가져오기, 코드 분할(지연 로딩), 비동기 렌더링 처리. |

<br />
<br />

```tsx
import React, { Suspense } from 'react';

const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MyComponent />
    </Suspense>
  );
}
```

```
// 데이터 가져오기

Relay나 React Query 같은 라이브러리는 Suspense와 통합하여,
데이터 가져오기를 처리할 수 있다.

커스텀 데이터 가져오기에도 Suspense를 사용할 수 있다.
```

<br />
<br />
<br />

2. 코드 분할 (Lazy Loading) 예시

```tsx
// React의 React.lazy와 Suspense를 사용해 컴포넌트를 동적으로 로드하는 예시

import React, { Suspense, lazy } from 'react';

// MyComponent는 필요할 때 동적으로 로드
const MyComponent = lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <h1>React Suspense 예시</h1>
      <Suspense fallback={<div>컴포넌트 로딩 중...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

```
React.lazy를 사용해 MyComponent를 동적으로 불러온다.

Suspense는 MyComponent가 로드될 때까지 fallback에 지정된 <div>컴포넌트 로딩 중...</div>를 표시하고,
MyComponent가 로드되면 자동으로 렌더링된다.
```

<br />
<br />
<br />

3. 데이터 가져오기 예시

```tsx
import React, { Suspense } from 'react';

// 비동기 데이터 가져오기 함수
let data = null;
const fetchData = () => {
  if (!data) {
    data = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: '데이터 가져오기 완료!' });
      }, 2000); // 2초 지연
    });
    throw data; // Suspense가 이 Promise를 감지
  }
  return data;
};

// 데이터를 사용하는 컴포넌트
function DataComponent() {
  const result = fetchData();
  return <div>{result.message}</div>;
}

function App() {
  return (
    <div>
      <h1>데이터 가져오기 예시</h1>
      <Suspense fallback={<div>데이터 로딩 중...</div>}>
        <DataComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

```
fetchData 함수는 Promise를 통해 데이터를 비동기적으로 가져온다.

DataComponent가 데이터를 요청하면 Promise가 해결될 때까지
Suspense가 fallback UI(데이터 로딩 중...)를 표시하고,

데이터가 준비되면 DataComponent가 렌더링되어 결과를 표시한다.
```

```
Suspense를 데이터 가져오기와 함께 사용할 때는 Relay,
React Query 같은 라이브러리를 사용하는 것이 더 실용적일 수 있다.
```
