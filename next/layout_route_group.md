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
layout 컴포넌트는 page 컴포넌트보다 먼저 렌더링되고,
page 컴포넌트를 children으로 받게 된다.
```

```ts
// app/layout.tsx

// app 디렉토리의 최상위에 정의된 레이아웃을 "루트 레이아웃"이라고 한다.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 루트 레이아웃은 필수이며, 반드시 html과 body 태그를 포함해야 한다.
    <html lang="en">
      <body>
        {/* 레이아웃 UI */}
        <main>{children}</main> // index 컴포넌트 (즉, page.tsx이다.)
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
3) 특정 라우트 세그먼트(폴더)에 layout 파일을 추가하여 생성한다.
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

아래와 같은 폴더 구조가 있다면,

app/
├── layout.tsx        // 루트 레이아웃
├── page.tsx          // 루트(Index) 페이지
└── blog/
    ├── layout.tsx    // 블로그 레이아웃 (레이아웃별로 독립적인 상태 관리 가능)
    └── page.tsx      // 블로그 페이지

blog 페이지는 독립적인 layout을 갖게 되고,
blog 경로에 속해 있는 모든 컴포넌트는 layout을 공유하게 된다.

* 레이아웃은 이렇게 계속해서 중첩된다.
RootLayout
└──BlogLayout
   └── BlogPage
```

<br />
<br />
<br />

4. 라우트 그룹 (Route Group)

```
라우트 그룹은 경로 상에 아무 영향을 주지 않으면서,
레이아웃을 특정 컴포넌트끼리만 공유하게 설정할 수 있다.

예를 들면 book 컴포넌트와 search 컴포넌트만 레이아웃이 되어야 한다면,
라우트 그룹으로 묶어 두 개의 컴포넌트만 레이아웃을 공유할 수 있다.

() 이렇게 소괄호를 사용해서 감싼 폴더를 만들고
경로에 해당하는 폴더, 페이지파일, 레이아웃을 넣어준다.
```

<br />

```
app/
└── (with-searchbar)
    ├── page       // 경로 "/"
    ├── blog         
    |   └── page   // 경로 "/blog"
    └── layout.tsx // 두 개의 경로의 파일에만 적용되는 레이아웃 
```
