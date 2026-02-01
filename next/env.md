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

3) 브라우저(클라이언트)에서 쓰려면 변수명 앞에 NEXT_PUBLIC_ 를 붙인다.
   붙이지 않으면 서버에서만 사용 가능하다.

4) .env 파일은 git에 올리지 않고, .env.example 에 예시만 올려둔다.
```

```env
// 예시 .env

NEXT_PUBLIC_API_KEY=codej625
NEXT_PUBLIC_API_URL=http://localhost:3000

// NEXT_PUBLIC_ 없으면 서버 전용 (클라이언트에서 process.env로 접근 불가)
API_SECRET=secret123
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

<br />
<br />
<br />

3. 참고

```vim
.env.local # 로컬 전용, git 제외 (실제 비밀값)
.env.development # npm run dev 시
.env.production # npm run build / start 시
.env.example # 필수 변수 이름만 적어둔 템플릿, git 포함 권장
```
