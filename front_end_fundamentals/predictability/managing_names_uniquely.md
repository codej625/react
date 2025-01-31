# 코드의 예측 가능성을 높이기 (1)

<br />
<br />

* 이름 겹치지 않게 관리하기
---

```
같은 이름을 가지는 함수나 변수는 동일한 동작을 해야 한다.

작은 차이가 코드의 예측 가능성을 낮추고,
코드를 읽는 사람에게 혼란을 줄 수 있다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
어떤 프론트엔드 서비스에서,
원래 사용하던 HTTP 라이브러리를 감싸서 새로운 형태로 HTTP 요청을 보내는 모듈을 만들었다.

공교롭게 원래 HTTP 라이브러리와 새로 만든 HTTP 모듈의 이름은 http로 같은 상황이다.
```

```tsx
// http.ts

// 이 서비스는 `http`라는 라이브러리를 쓰고 있다.
import { http as httpLibrary } from "@some-library/http";

export const http = {
  async get(url: string) {
    const token = await fetchToken();

    return httpLibrary.get(url);
  }
};
```

```tsx
// fetchUser.ts

// http.ts에서 정의한 http를 가져오는 코드
import { http } from "./http";

export async function fetchUser() {
  return http.get("...");
}
```

<br />

```
"예측 가능성"

이 코드는 기능적으로 문제가 없지만,
읽는 사람에게 혼란을 줄 수 있다.

http.get을 호출하는 개발자는 이 함수가 원래의 HTTP 라이브러리가 하는 것처럼
단순한 GET 요청을 보내는 것으로 예상하지만,
실제로는 토큰을 가져오는 추가 작업이 수행된다.

오해로 인해서 기대 동작과 실제 동작의 차이가 생기고,
버그가 발생하거나, 디버깅 과정을 복잡하고 혼란스럽게 만들 수 있다.
```

<br />
<br />
<br />

2. `개선`

```
서비스에서 만든 함수에는
라이브러리의 함수명과 구분되는 명확한 이름을 사용해서 함수의 동작을 예측 가능하게 만들 수 있다.
```

```tsx
// httpService.ts

// 라이브러리 함수명과 구분되도록 명칭을 변경했다.
export const httpService = {
  async getWithAuth(url: string) {
    const token = await fetchToken();

    // 토큰을 헤더에 추가하는 등 인증 로직을 추가한다.
    return httpLibrary.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
```

```tsx
// fetchUser.ts

// http.ts에서 정의한 http를 가져오는 코드
import { httpService } from "./httpService";

export async function fetchUser() {
  // 함수명을 통해 이 함수가 인증된 요청을 보내는 것을 알 수 있다.
  return await httpService.getWithAuth("...");
}
```

<br />

```
이렇게 해서 함수의 이름을 봤을 때 동작을 오해할 수 있는 가능성을 줄일 수 있다.

다른 개발자가 이 함수를 사용할 때,
서비스에서 정의한 함수라는 것을 인지하고 올바르게 사용할 수 있다.

또한, getWithAuth라는 이름으로 이 함수가 인증된 요청을 보낸다는 것을 명확하게 전달할 수 있다.
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
