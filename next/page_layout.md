# Page & Layout

<br />
<br />

* Next.js에서 레이아웃 설정과 페이지 생성 방법을 알아보자.
---

```
Next.js는 파일 시스템 기반 라우팅을 사용한다.

이는 "폴더"와 "파일"을 사용하여 라우트를 정의한다는 의미이다.
자세한 예시를 보며 알아보자.
```

<br />
<br />
<br />
<br />

1. 페이지

```
페이지는 특정 라우트에서 렌더링되는 UI이다.

페이지를 만들려면,
1) app 디렉토리 안에 page 파일을 생성
2) React 컴포넌트를 default export
```

```ts
// app/page.tsx

export default function Page() {
  return <h1>Hello Next.js!</h1>
}

// 이렇게 하면 루트 경로(/)에 해당하는 인덱스 페이지가 생성된다.
```

<br />
<br />
<br />

2. 레이아웃

```
레이아웃은 여러 페이지 간에 공유되는 UI이다.

레이아웃은 몇가지 특징이 있다.

1) 페이지 간 이동 시 상태가 유지됨
2) 상호작용이 가능한 상태로 유지
3) 다시 렌더링되지 않음

레이아웃을 만들려면,
1) app 디렉토리에 layout 파일 생성
2) children prop을 받는 React 컴포넌트를 default export
(children은 페이지나 다른 레이아웃이 될 수 있음)
```

```ts
// app/layout.tsx

// app 디렉토리의 최상위에 정의된 레이아웃을 "루트 레이아웃"이라고 함
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 루트 레이아웃은 필수이며, 반드시 html과 body 태그를 포함해야 함
    <html lang="en">
      <body>
        {/* 레이아웃 UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

```
* app 디렉토리의 최상위에 정의된 레이아웃을 "루트 레이아웃"이라고 함
* 루트 레이아웃은 필수이며, 반드시 html과 body 태그를 포함해야 함
* children을 원하는 위치에 배치하여 페이지나 중첩된 레이아웃을 렌더링할 수 있음
```

<br />
<br />
<br />

3. 중첩 레이아웃(Nested Layouts)

```
중첩 레이아웃의 기본 특징

1) 폴더 계층 구조에 따라 자동으로 중첩됨
2) 상위 레이아웃이 하위 레이아웃을 children prop으로 감싸는 구조
3) 특정 라우트 세그먼트(폴더)에 layout 파일을 추가하여 생성
```

```ts
// app/blog/layout.tsx
// 예시 블로그 레이아웃 생성

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}

```

```
// 폴더 및 파일 구조

app/
├── layout.tsx        // 루트 레이아웃
├── page.tsx          // 루트(Index) 페이지
└── blog/
    ├── layout.tsx    // 블로그 레이아웃 (레이아웃별로 독립적인 상태 관리 가능)
    └── page.tsx      // 블로그 페이지
```
