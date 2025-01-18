# Fetching query strings

<br />
<br />

* App router 이후 Fetching 방법이 많이 바뀌었다.
---

```
기존 Page router에서 App router로 넘어오면서,
쿼리 스트링이나, 파라미터를 가져오는 방법이
많이 바뀌어 정리하는 글이다.
```

<br />

```
기존에는 사전 렌더링 과정 진행 중
백엔드 서버에서 데이터를 Fetching 할 때,

인덱스 파일 (지금은 페이지 파일)을 기준으로
선행 작업으로 특수한 함수를 사용해 Fetching을 하였다.
```

```tsx
// SSR (Server Side Rendering, 서버 사이드 렌더링)
export async function getServerSideProps() {
  return { props: {...} }
}

// SSG (Static Site Generation, 정적 사이트 생성)
export async function getStaticProps() {
  return { props: {...} }
}

// Dynamic SSG (동적 경로에 대한 정적 사이트 생성)
export async function getStaticPaths() {
  return { paths: [...], fallback: ... }
}

// 위와 같이 특수한 함수를 사용해서 Props를 Index 페이지에서 전달받아 사용
```

```
하지만 서버 컴포넌트가 업데이트되면서 이러한 특수한 함수를 사용할 필요가 없어졌다.

Next에서는 데이터가 필요한 곳에서 직접 불러 사용하라고 말하고 있다.
```

<br />
<br />
<br />
<br />

1. 쿼리스트링 가져오기 (서버 사이드)

```tsx
// /?query=query 요청 시

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  console.log('query -> ', query); // "query"

  return (
    ...
  );
}
```

<br />
<br />
<br />

2. 파라미터 가져오기 (서버 사이드)

```tsx
// /book/1 요청 시

export default async function Page({
  // page 컴포넌트로 전달되는 Props로 부터 params을 꺼내온다.
  params,
}: {
  // params의 타입은 Promise 객체인데, id라는 URL Parameter을 string 타입으로 가지고 있는 객체이다.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('parameter -> ', id); // 1

  return (
    ...
  );
}
```

<br />
<br />
<br />

3. API Route에서 쿼리스트링 가져오기 (서버 사이드)

```ts
// api?type=type 요청 시

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get("type") // "type"

  ...

  return NextResponse.json({ results }, { status: 200 })
}
```

<br />
<br />
<br />

4. 클라이언트 컴포넌트 (클라이언트 사이드)

```tsx
// // book?type=share 요청 시

'use client'

import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log(type); // "share"

  ...
}
```
