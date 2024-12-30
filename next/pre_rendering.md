# Pre-Rendering

<br />
<br />

* React 렌더링과 Next.js의 렌더링 차이
---

```
리액트는 기본적으로 CSR을 사용한다.

페이지 이동이 매우 빠르고 쾌적하다는 장점이 있으나,
FCP와 TTI가 전부 느리다는 단점이 있다.

Next.js에서는 어떻게 이 부분을 해결했는지 알아보자.

* FCP(First Contentful Paint) 요청이 시작되고 컨텐츠가 화면에 처음 나타나는데 걸리는 시간
* TTI(Time To Interactive) HTML의 모든 요소들이 상호작용 가능해진 시점
```

<br />
<br />
<br />
<br />

1. React

```
1) 유저 Request

2) 브라우저(Client)는 서버에 요청

3) 서버는 index.html(빈 껍데기)를 브라우저에게 보냄

4) 브라우저는 빈 화면을 렌더링 (FCP)

5) 서버가 JS Bundle (서비스에 접근 가능한 모든 컴포넌트 코드)까지 후속으로 전달

6) 브라우저는 JS Bundle을 실행 (리액트 앱)

7) 컨텐츠를 렌더링 후 유저에게 화면이 보임 (TTI)
```

<br />
<br />
<br />

2. Next (Pre-Rendering)

```
1) 유저 Request

2) 브라우저(Client)는 서버에 요청

3) 서버는 서버 내에서 JS를 실행 (렌더링)

4) 렌더링 된 HTML을 브라우저에 보냄 (상호 작용이 되는 건 아님)

5) 브라우저는 HTML 코드를 화면에 그려낸다. (FCP)

6) 서버가 JS Bundle (서비스에 접근 가능한 모든 컴포넌트 코드)까지 후속으로 전달

7) 브라우저는 JS Bundle을 실행하여, HTML과 연결한다. (Hydration)

8) 화면의 상호작용 가능 (TTI)
```
