# Routing

<br />
<br />

* App router
---

```
Next 14버전부터 페이지 라우트가 "App router"로 완전히 대체 되었고,
사용법이 조금 바뀌었다.

어떤 부분이 어떻게 바뀌었는지 알아보자.
```

<br />
<br />
<br />
<br />

1. 페이지 라우트

```
Next 13버전까지의 Page router에서는
파일명이 경로 자체가 될 수 있었지만,
App Router에서는 반드시 경로가 되는 폴더와
폴더 속에 page이라는 컴포넌트가 필요해졌다.
```

<a href="https://github.com/codej625/react/blob/main/next/nested_route.md">Dynamic routes 정리</a>

<br />

```
// Page router (변경 전)

page/
└── blog.tsx // 경로 요청 "/page"

or

page/
└── blog
    └── index.tsx
```

```
// App router (변경 후)

app/
└── blog
    └── page.tsx // 경로 요청 "/page"
```

<br />
<br />
<br />

2. 서버 컴포넌트 Props

```
이제는 서버 컴포넌트에서 비동기 작업이 가능하다.

useRouter()을 사용하지 않고,
쿼리스트링 , 파라미터를 Props로 전달받아 사용 가능해졌다.
```

```ts
// 1) 파라미터 사용 예시 -> /book/[id]/page.tsx (요청 경로 "/book/1")

export default async function Page({
  // page 컴포넌트로 전달되는 Props로 부터 params을 꺼내온다.
  params,
}: {
  // params의 타입은 Promise 객체인데, id라는 URL Parameter을 string 타입으로 가지고 있는 객체이다.
  params: Promise<{ id: string }>;
}) {
  // id라는 Parameter 값을 사용
  const { id } = await params;
  return <>Book/[{id}] Page</>;
}
```

```ts
// 2) 쿼리스트링 사용 예시 -> /search/page.tsx (요청 경로 "/search")

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  return <>Search Page {query}</>;
}
```

<br />

```
Next에서 React 19의 Server component를 적용하면서,
서버 컴포넌트는 서버에서만 작동하는 컴포넌트이기 때문에 async 키워드를 붙일 수 있게 됐다.
```
