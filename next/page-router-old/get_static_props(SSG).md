# getStaticProps

<br />
<br />

* Next에서 SSG (Static Site Generation) 구현하기
---

```
Next에서는 기본적으로 SSR을 지원하고,
SSG에서는 빌드 타임에 페이지를 미리 사전렌더링 해둠으로써 빠른 FCP를 달성한다.
(HTML 렌더링 + 데이터 패칭한 페이지를 빌드 타임때 사전 렌더링)

단점으로는 빌드타임 이후로는 다시는 페이지를 새로 생성하지 않기 때문에,
언제 요청을 보내더라도 같은 페이지만 응답한다.
(결과적으로 최신 데이터를 반영하는 건 불가능)

또한, 미리 페이지를 빌드 해놓기 때문에,
실시간 관련 기능은 구현하는 게 사실상 불가능하다.

예시 실시간 검색 등
(getStaticProps() 의 context는 context.query 자체가 존재 X)
```

<br />
<br />
<br />
<br />

1. SSG

```
Next에서는 컴포넌트에 getStaticProps() 함수를 사용하여,
SSG를 구현한다.
```

```tsx
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
export const getStaticProps = async () => {
  // Promise.all([])을 사용해서 Promise를 병렬로 처리
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  // 2) props를 컴포넌트에 전달 (리턴 시 밑에 문법 변경X)
  return {
    props: { allBooks, randomBooks },
  };
};

export default function Home({ allBooks, randomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('start');
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
