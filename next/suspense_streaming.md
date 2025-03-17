# Suspense & Streaming

<br />
<br />

* 서버 컴포넌트에서 UX 해결하기
---

```
Next.js에서 서버 컴포넌트가 데이터를 패칭하고,
Suspense로 감싸면 스트리밍으로 데이터를 클라이언트에 점진적으로 전달한다.

빠른 부분 먼저 보여주고, 느린 부분 나중에 채우는 방식이다.
이렇게 유저 경험을 좋게 할 수 있다.
```

<br />
<br />
<br />
<br />

1. `Suspense`

```
React의 내장 컴포넌트로,
비동기 작업(데이터 로딩 등)이 완료될 때까지 대체 UI(fallback)를 보여준다.

로딩 상태 관리, 사용자 경험 개선을 한다.
```

<br />
<br />
<br />

2. `스트리밍`

```
서버에서 클라이언트로 데이터를 조각 단위로,
점진적으로 보내는 방식(Next.js에서 서버 컴포넌트와 함께 사용).

페이지 로드 속도 향상, 느린 데이터 처리 최적화한다.
```

<br />
<br />
<br />


3. `Suspense + 스트리밍`

```
Next.js에서 서버 컴포넌트가 데이터를 패칭하고,
Suspense로 감싸면 스트리밍으로 클라이언트에 점진적으로 전달한다.

빠른 부분 먼저 보여주고, 느린 부분 나중에 채우는 방식이다.
```

<br />
<br />
<br />

4. `예시`

```
밑에 예시는 Next.js 서버 컴포넌트를 사용한 예시이다.

코드를 보며 감을 익혀보자.
```

```tsx
// app/page.tsx

import { Suspense } from 'react';
import ClientComponent from '../components/ClientComponent';

async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
  return { title: '서버 데이터' };
}

export default async function Page() {
  const data = fetchData();
  return (
    <div>
      <h1>즉시 표시</h1>
      <Suspense fallback={<p>로딩 중...</p>}>
        <ClientComponent initialData={await data} />
      </Suspense>
    </div>
  );
}
```

<br />

```tsx
// components/ClientComponent.js

'use client';
export default function ClientComponent({ initialData }) {
  return <div>{initialData.title}</div>;
}
```

<br />
<br />
<br />

```
컴포넌트의 데이터 패칭이 많을수록 극적인
스트리밍 효과를 느낄 수 있게 된다.
```
