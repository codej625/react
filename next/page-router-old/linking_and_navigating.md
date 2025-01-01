# Linking and Navigating

<br />
<br />

```
Next.js 라우터를 사용하면 단일 페이지 애플리케이션 (SPA)와 비슷하게,
페이지 간에 클라이언트 측 경로 전환을 수행할 수 있다.

기본적으로 Next에서 제공하는 Link component를 사용한다.
```

<br />
<br />
<br />
<br />

1. Link

| Prop            | Example                  | Type              | Required | Description                                              |
|-----------------|--------------------------|-------------------|----------|----------------------------------------------------------|
| href            | href="/dashboard"        | String or Object  | Yes      | 링크의 URL을 지정합니다.                                 |
| replace         | replace={false}          | Boolean           | -        | true이면, 페이지 이동 시 history stack을 교체      |
| scroll          | scroll={false}           | Boolean           | -        | true이면, 페이지 이동 시 스크롤을 최상단으로 이동|
| prefetch        | prefetch={false}         | Boolean           | -        | true이면, 해당 링크를 미리 불러옴           |
| legacyBehavior  | legacyBehavior={true}    | Boolean           | -        | true이면, Next.js의 이전 버전과의 호환성을 유지 |
| passHref        | passHref={true}          | Boolean           | -        | true이면, 자식에게 href 속성을 전달    |
| shallow         | shallow={false}          | Boolean           | -        | true이면, getInitialProps를 호출하지 않고 URL을 변경|
| locale          | locale="fr"              | String or Boolean | -        | 특정 언어로 페이지를 설정 |

<br />

```ts
// 사용 예시

import Link from 'next/link'
 
function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}
 
export default Home
```

<br />
<br />
<br />

2. Programmatic Navigation

```
어떤 함수, 특정 이벤트가 작동했을 때도,
페이지를 이동시킬 수 있다.

이떄는 useRouter 훅을 사용한다.
```

```ts
// 사용 예시

import { useRouter } from "next/router";
 
function Home() {
  const router = useRouter();
  const onClickButton = () => {
    router.push("/test");
  };

  return (
    <>
      <button onClick={onClickButton}>/test 페이지로 이동</button>
    </>
  )
}
 
export default Home
```
