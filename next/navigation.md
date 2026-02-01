# Navigation

<br />
<br />

* Navigation의 작동원리
---

```
유저로부터 페이지 이동요청이 오면
서버는 JS Bundle(컴포넌트)과 RSC Payload를 전달한다.

그러면 브라우저에서 전달받은 JS와 RSC Payload를 사용해서
페이지를 교체하여 화면에 렌더링한다.
```

<br />
<br />
<br />
<br />


1. Page Router에서 바뀐 점

```
Import 시, next/navigation 패키지를 사용해야 한다.
next/router (X)

* App Router는 next/navigation, Pages Router는 next/router
```

<br />
<br />

2. 브라우저로 전달 되는 파일

```
정적으로 생성된 페이지 (서버 컴포넌트) 는
RSC Payload로 전달되고,
클라이언트 컴포넌트는 JS Bundle로 전달된다.

한 페이지에 서버/클라이언트 컴포넌트가 섞여 있으면
RSC Payload와 JS Bundle이 함께 내려온다.
```

<br />
<br />

3. Static 페이지와 Dynamic 페이지

```
빌드를 진행할 때 Next는 페이지의 종류를
Static과 Dynamic으로 구분하는데,

Static은 기본적으로 SSG처럼 빌드 타임에 미리 생성된 페이지이고,
Dynamic은 SSR 방식으로 그때 그때 생성되는 페이지라고 생각하면 된다.

* Dynamic이 되는 경우는 cookies(), headers(), searchParams 사용,
동적 세그먼트 [slug] (generateStaticParams로 미리 안 채운 경우),
또는 export const dynamic = 'force-dynamic' 지정 시.
```
