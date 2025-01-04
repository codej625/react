# getServerSideProps

<br />
<br />

* Next에서 SSR 구현하기
---

```
Next에서는 기본적으로 SSR을 지원하고,
Pre-Rendering과 Fetching을 통해 빠른 FCP를 달성한다.
```

<br />
<br />
<br />
<br />

1. SSR

```
Next에서는 컴포넌트에 getServerSideProps() 함수를 사용하여,
서버에서의 작업을 할 수 있다. (SSR)
```

```ts
// fetch-books.ts

import { BookData } from '@/types';

export default async function fetchBooks(query?: string): Promise<BookData[]> {
  // 환경변수 사용
  let url = process.env.NEXT_PUBLIC_API_URL_1 as string;

  if (query) url += `/search?q=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  }
  catch (err) {
    console.log(err); // 예외 처리는 임시
    return [];
  }
}


// fetch-random-books.ts

import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url: string = process.env.NEXT_PUBLIC_API_URL_2 as string;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  }
  catch (err) {
    console.log(err);
    return [];
  }
}
```

```tsx
// index.tsx

// 컴포넌트보다 먼저 실행 되어, 컴포넌트에 필요한 데이터를 가져오는 내장 함수 (이름 변경 X)
export const getServerSideProps = async() => {
  // 서버에서만 작동하는 코드 작성 (예시 데이터 패칭)

  // 1) Promise.all([])을 사용해서 Promise를 병렬로 처리
  const [allBooks, randomBooks] = await Promise.all(
    [
      fetchBooks(),
      fetchRandomBooks(),
    ]
  );
  // 2) props를 컴포넌트에 전달 (리턴 시 밑에 문법 변경X)
  return {
    props: { allBooks, randomBooks },
  };
};

export default function Home({
  allBooks, randomBooks
// InferGetServerSidePropsType<> 제네릭 타입은 Next에서 지원해주는 기본 타입이다.
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data); // 브라우저에서 작동

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {randomBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
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

```tsx
export default function Home({
  data,
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
