# Page Router

<br />
<br />

* 라우트에 대해 알아보자 (13버전 이전)
---

```
Next.js는 크게 Page router와 App router로 나뉘는데,
13버전부터 라우터의 구현 방법이 완전히 새로운 방법으로 바뀌었다.

여기서는 기존 프로젝트를 위해 Page Router의 사용법을 알아보자.
```

<br />
<br />
<br />
<br />

1. 기본적인 라우트

```
루트 폴더는 "pages" 이다.
폴더명은 경로명으로 사용된다.

폴더가 없고 파일만 있으면 파일 이름이 경로명이 된다.
```

```
// 예시

pages/
├── index.tsx          // "/" 루트 경로
├── blog/
│   ├── index.tsx      // "/blog" 경로
│
```

<br />
<br />
<br />

2. 동적 라우트 (Dynamic routes)

```
파일 이름을 대괄호로 감싸면 [slug]
동적 라우트 세그먼트가 생성된다.
(데이터를 기반으로 여러 페이지를 생성할 때 유용)

ex) 블로그 포스트
    제품 페이지
    사용자 프로필 페이지
```

```
// 예시

pages/
├── index.tsx       // "/" 루트 경로
├── blog/
│   ├── index.tsx   // "/blog" 경로
│   ├── [slug].tsx  // "/blog/1" 경로
```

<br />
<br />
<br />

3. 동적 라우트 심화(Catch-all segments)

```
예시로 /blog/[slug]/[slug]/[slug] 와 같은
경로의 요청이 온다면 어떻게 해야할까?

이런 요청을 대응하기 위해 Next에서는
Catch-all segments 라는 개념이 존재한다.

파일 이름을 대괄호로 감싸고 ...을 붙여준다.
예시 [...slug]
```

```
// 예시

pages/
├── index.tsx          // "/" 루트 경로
├── blog/
│   ├── index.tsx      // "/blog" 경로
│   ├── [...slug].tsx  // "/blog/[slug]/[slug]/[slug]" 등의 모든 경로
```

<br />
<br />
<br />

4. 동적 라우트 심화(Optional + Catch-all segments)

```
Catch-all segments는 모든 경로의 요청을 받아들이지만
정작 /blog 경로 자체는 대응하지 못한다.

그래서 일반적으로 blog 폴더 안에 index 파일을 만들어주는데,
blog에 관련된 모든 경로에 대응하게 만들려면
Optional catch-all segments 을 사용하면 된다.

파일 이름을 대괄호로 두 번 감싸고 ...을 붙여준다.
예시 [[...slug]]
```

```
// 예시

pages/
├── index.tsx       // "/" 루트 경로
├── blog/
│   ├── index.tsx(파일 생성 X)
│   ├── [[...slug]].tsx  // "/blog" or "/blog/[slug]/[slug]/[slug]" 등의 모든 경로
```
