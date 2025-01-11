# Fetching query strings

<br />
<br />

* App router 이후 Query string을 가져오는 방법이 바뀌었다.
---

```
서버 사이드, 클라이언트 사이드에서
쿼리 스트링이나, 파라미터를 가져오는 방법이
많이 바뀌어 정리하는 글이다.
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
