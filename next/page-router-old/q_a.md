# Question & Answer

<br />
<br />

* 궁금증을 해결하고 정리해보는 시간
---

```
Next에는 여러 가지 종류의 Rendering Routing 방법이 존재한다.

해소되지 않았던 부분을 자세히 알아보고 정리해보자.
```

<br />
<br />
<br />
<br />

1. Next의 Rendering 방식 이해하기 (SSR, SSG, ISR)

```
ISR은 SSR의 형태가 아닌 SSG의 업그레이드 형태이다.
(SSG + Revalidation)

1) SSR은 Server Side Rendering의 약자로,
"런타임에 매 요청마다 실시간으로 페이지를 생성"하는 방식이고,

2) SSG는 Static Site Generation의 약자로,
"빌드 타임에 미리 정적으로 페이지를 생성"해두는 방식이다.

3) ISR은
SSG + 일정 주기로 페이지를 재생성한다.
(페이지 컴포넌트를 실행하여 정적인 HTML 페이지를 생성해 서버측에 저장,
더 쉽게 이야기하자면 정적으로 빌드 타임에 생성된 페이지를 백그라운드에서 다시 생성해 캐시를 갱신한다.)
```

<br />
<br />
<br />

2. 동적 페이지를 SSG으로 구현하기

```
SSG는 빌드 타임에 미리 정적 페이지를 생성해두는 방식이기 때문에,
동적 페이지의 Parameter, Path 등의 값을 포함하는 로직이 있다면
구현에 문제가 생긴다.
(요청 값을 미리 알 수 없으니 페이지도 미리 생성 X)

하지만 getStaticPaths() 함수를 사용해서
선수 작업으로 요청 경로에 대한 처리를 해놓는다면,
SSG 구현이 가능하고 그 외의 요청에는 "fallback" 옵션으로 대응이 가능하다.

캐싱이 되어 있지 않은 페이지는 실시간으로 생성해 응답 + 캐싱에 저장하고,
캐싱이 되어 있는 페이지는 캐싱 된 페이지를 응답하는 방식으로 동작한다.
(즉, 반쪽짜리 SSG에서 데이터 패칭이 끝나면 캐싱 후 완전한 SSG로 작동한다.)
```

<br />
<br />
<br />

3. On-demand ISR 구현

```
의도적인 페이지 재생성을 위해서,
Next의 API 기능을 이용할 수 있다.

예시로 요청한 API의 응답으로 revalidate() 메서드를 사용하면,
페이지를 재 생성할 수 있다.
```

```ts
// 예시 revalidate.ts 요청 경로 "/api/revalidate"

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/'); // 재생성 페이지의 요청 경로
    return res.json({ revalidate: true }); // 확인하기 위한 json 값
  } catch {
    res.status(500).send('Revalidation Failed');
  }
}
```
