# env

<br />
<br />

* 환경 변수 사용하기
---

```
개발을 하다 보면 외부로 알려지면 안 되는
API Key, DB 관련 정보 등 보안이 필요한 값들이 있다.

이러한 값들을 .env 파일에 변수로 만들어 사용하는 것을 "환경 변수"라고 한다.
```

<br />
<br />
<br />
<br />

1. Next에서 환경 변수 사용하기

```
1) .env 파일을 만든다.

2) 항상 프로젝트의 최상위 루트에 만들어야 한다.
```

```env
// 예시 .env

NEXT_PUBLIC_API_KEY=codej625
NEXT_PUBLIC_API_URL=http://localhost:3000
```

<br />
<br />
<br />

2. 사용 예시

```
Next 에서는 process.env. 뒤에
환경 변수명을 붙여 사용한다.
```

```ts
// 예시

export default async function fetchFindOneUser(id: number): Promise<UserData | null> {
  // process.env + {환경 변수명}으로 사용
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
```
