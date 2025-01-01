# Pre-fetching

<br />
<br />

* Next.js의 Pre-fetching
---

```
Pre-fetching이란 현재 사용자가 보고 있는 페이지 내에서,
이동할 가능성이 있는 모든 페이지의 데이터를 미리 불러와 놓는 기능이다.

Next는 사용자가 요청 시,
빠른 렌더링 속도를 위해 현재 페이지에 관한 JS Bundle 만을 전달하고,
Hydration이 작동한다.

그렇기에 다른 페이지의 JS는 없는 상태에서
Pre-fetching을 통해 다른 페이지의 데이터를 미리 불러와
빠른 페이지 교체를 가능하게 만든다.

(그렇기에 Pre-fetching이 되어있지 않은 페이지는 추가로 서버의 요청이 필요하다.)
```

<br />
<br />
<br />
<br />

1. 프리패칭 확인하기

```
프리 패칭은 일반적으로 개발 모드에서는 작동하지 않는다.

그렇기에 build 후 프로덕션 모드로 앱이 작동하면 개발자도구에서
프리패칭이 된 페이지를 확인 할 수 있다.
```

<br />
<br />
<br />

2. 프리패칭이 안 되어있는 페이지에 프리패칭 적용하기

```
Next는 "Link" 컴포넌트를 사용했을 때 프리패칭이 이루어지기 때문에,
programmatic navigation을 사용한 상태에서는 프리패칭이 이루어지지 않는다.

이럴때는 조금의 편법을 사용할 수 있다.
```

```ts
// 사용 예시

import { useRouter } from "next/router";
import { useEffect } from "react";
 
function Home() {
  const router = useRouter();
  const onClickButton = () => {
    router.push('/test');
  };

  // 컴포넌트가 마운팅 되었을 때 Router를 사용해서 '/test' 경로를 프리패칭 한다.
  useEffact(() => {
    router.prefetch('/test');
  }, []);

  return (
    <>
      <button onClick={onClickButton}>/test 페이지로 이동</button>
    </>
  )
}
 
export default Home
```

<br />
<br />
<br />

3. 프리패칭이 해제

```
잘 사용되지 않는 페이지에 프리패칭을
해체하려면 prefetch={false} 이러한 옵션을 추가한다.
```

```ts
// 예시

<Link
  href="/blog/hello-world"
  prefetch={false}
>
  Blog Post
</Link>
```
