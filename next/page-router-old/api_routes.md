#  API Routes

<br />
<br />

* Next를 사용하는 API 응답
---

```
일반적으로 프론트엔드 서버는
API 서버 (백엔드) 역할을 하지 않는다.

하지만 간단한 부분이라면,
굳이 백엔드 서버 없이 Next를 사용한 API 서버를 구현할 수 있다.

Next에서는 api 라는 이름의 폴더를 만들면,
해당 경로를 API 요청에 사용한다.
```

<br />
<br />
<br />
<br />

1. API 기능 구현

```
pages
├── api
│   ├── {파일명}.tsx      // "api/{파일명}" 요청 경로
```

```ts
// api 폴더에 time.ts라는 파일을 만들었다고 가정 /api/time 경로 요청 시

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleDateString() });
}

// 응답 값 { "time": "1/2/2025" }
```
