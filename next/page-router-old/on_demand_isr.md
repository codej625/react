# On-demand ISR

<br />
<br />

* Next에서 On-demand ISR 구현하기
---

```
기존의 ISR 방식은 변경된 내용이 없더라도
일정 주기로 계속 페이지를 업데이트한다.

혹은 곧바로 업데이트가 필요한 상황에서도
일정 주기로 업데이트되기 때문에 최신 데이터를 반영하지 못한다.

이러한 단점을 보완하기 위해,
Next 서버에 즉각적으로 페이지의 업데이트 요청을 하는 ISR을
On-demand ISR라고 한다.

이렇게 Next에서는 최신 데이터를 유지하면서도
정적페이지를 유지하고 SSR을 방지할 수 있다.
```

<br />
<br />
<br />
<br />

1. On-demand ISR

```
Next는 간단한 API 서버의 기능을 구현할 수 있는데,
NextApiResponse 객체의 revalidate() 메서드를 사용하여,
revalidate을 구현할 수 있다.

의도적으로 페이지를 재생성 하는 것이다. (약간의 꼼수)
```

```ts
// revalidate.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/'); // 요청 경로
    return res.json({ revalidate: true }); // 확인하기 위한 json 값
  } catch {
    res.status(500).send('Revalidation Failed');
  }
}
```

```tsx
// index.tsx

export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  return {
    props: {
      allBooks,
      randomBooks
    },
    // 페이지 재생성 옵션을 제거
    // revalidate: 3,
  };
};

export default function Home({ allBooks, randomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
```

<br />

```
/api/ridate 을 요청하면,
ridate() 메서드의 인수로 사용된 경로의
페이지를 재생성한다.

재생성 된 페이지를 새로 고침 해보면
데이터가 업데이트된 것을 확인할 수 있다.
```
