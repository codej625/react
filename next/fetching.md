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
// Pages Router 예시 (App Router에서는 사용하지 않음)

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
하지만 App Router와 서버 컴포넌트 도입으로 이러한 특수한 함수는 쓰지 않는다.

Next에서는 데이터가 필요한 곳(페이지·컴포넌트)에서 직접 fetch 하거나
searchParams / params 를 받아서 사용하라고 안내하고 있다.
```

<br />
<br />
<br />
<br />

1. 쿼리스트링 가져오기 (서버 사이드)

```tsx
// /?query=query 요청 시
// searchParams를 쓰는 페이지는 해당 세그먼트가 Dynamic으로 처리된다.

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
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

2. 동적 경로 파라미터 가져오기 (서버 컴포넌트)

```tsx
// app/book/[id]/page.tsx → /book/1 요청 시

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log('parameter -> ', id); // "1"

  return (
    ...
  );
}
```

<br />
<br />
<br />

3. API Route (Route Handler)에서 쿼리 스트링 가져오기

```ts
// app/api/.../route.ts → /api/...?type=type 요청 시

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const type = req.nextUrl.searchParams.get("type"); // "type"

  ...

  return NextResponse.json({ results }, { status: 200 });
}
```

<br />
<br />
<br />

4. 클라이언트 컴포넌트에서 쿼리 스트링 가져오기

```tsx
// /book?type=share 요청 시

'use client';

import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log(type); // "share"

  ...
}
```

<br />
<br />
<br />

5. 참고

```vim
- App Router에서는 searchParams / params 가 Promise 이므로 반드시 await 후 사용한다.

- 페이지에서 searchParams 를 사용하면 그 세그먼트는 Dynamic 이 되어 빌드 시 정적 생성되지 않는다.

- 동적 경로 [id] 를 빌드 시 미리 만들고 싶으면 generateStaticParams 를 사용한다.
```
