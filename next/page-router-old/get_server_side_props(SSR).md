# getServerSideProps

<br />
<br />

* Next에서 SSR 구현하기
---

```
Next에서는 기본적으로 SSR을 지원하고,
Pre-Rendering과 Fetching을 통해 빠른 TTI를 달성한다.
```

<br />
<br />
<br />
<br />

1. SSR

```
Next에서는 컴포넌트에 getServerSideProps() 함수를 구현함으로써,
서버에서의 작업을 할 수 있다.
```

```ts
// Index.tsx

// 컴포넌트보다 먼저 실행 되어, 컴포넌트에 필요한 데이터를 가져오는 함수 (이름 변경 X)
export const getServerSideProps = () => {
  // 서버에서만 작동하는 코드 작성
  const data = "hello";
  console.log(data); // 서버에서 작동

  // 리턴 데이터 (리턴 시 밑에 문법 변경X)
  return {
    props: {
      data,
    },
  };
};

export default function Home({
  data,
// InferGetServerSidePropsType<> 제네릭 타입은 Next에서 지원해주는 기본 타입이다.
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data); // 브라우저에서 작동

  return (
    <>
      <h1>{data}</h1>
    </>
  );
}
```

<br />
<br />
<br />

2. 서버가 아닌 브라우저에서 실행되는 코드 만들기(CSR)

```
기본적으로 React는 CSR 작동이고,
React의 Hook들은 브라우저에서만 작동한다.

이를 이용해 useEffect() 훅을 사용하면,
브라우저에서만 작동하는 코드를 만들 수 있다.
```

```ts
export default function Home({
  data,
// InferGetServerSidePropsType<> 제네릭 타입은 Next에서 지원해주는 기본 타입이다.
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // useEffect() Hook은 브라우저에서만 작동
  useEffect(() => {
    console.log(window); // window 객체는 브라우저에서만 확인 가능
  }, []);

  return (
    <>
      <h1>{data}</h1>
    </>
  );
}
```
