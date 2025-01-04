# Incremental Static Regeneration

<br />
<br />

* Next에서 ISR 구현하기
---

```
Incremental(증분) Static(정적) Regeneration(재 생선) 이란?

이름처럼 복잡한 게 아닌 아주 단순하게 SSG파일로 생성된 정적 페이지를
일정 주기로 재 생성 하는걸 말한다.

(데이터의 주기적인 업데이트가 필요하지만, 실시간처리가 필요하지 않은 페이지의 사용 하면 좋다.)
```

<br />
<br />
<br />
<br />

1. ISR

```
기존의 SSG로 생성된 파일에서
"revalidate"라는 한 가지의 옵션만 추가하면 ISR을 구현할 수 있다.
```

```tsx
// index.tsx

// ISR
export const getStaticProps = async () => {
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  return {
    props: {
      allBooks,
      randomBooks
    },
    // revalidate 옵션 추가 (ISR 구현)
    revalidate: 3, // 3초마다 재 생성
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

```
앱을 빌드하고 프로덕션 모드로 실행한 다음
새로 고침을 여러 번 눌러보면 업데이트된 데이터로 변경된 페이지 모습을 확인할 수 있다.
```
