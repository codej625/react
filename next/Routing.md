# Routing

<br />
<br />

* 페이지를 라우팅하는 방법
---

```
Next 14버전부터 페이지 라우트가 App router로 완전히 대체 되었고,
사용법이 조금 바뀌었다.

어떤 부분이 어떻게 바뀌었는지 알아보자.
```

<br />
<br />
<br />
<br />

1. 기본 라우트

```
Next 13버전까지의 Page router에서는
파일명이 경로 자체가 될 수 있었지만,
App Router에서는 반드시 경로가 되는 폴더와
폴더 속에 page이라는 컴포넌트가 필요해졌다.
```

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
