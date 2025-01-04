# SEO

<br />
<br />

* Next에서 SEO 최적화하기
---

```
리액트와는 달리 Next의 작동 방식은 SSR이고,
페이지별로 SEO 최적화가 가능하다.

여기서는 메타태그를 페이지별로 구현하는 방법을 알아보자.
```

<br />
<br />
<br />
<br />

1. 메타 태그 추가

```
컴포넌트의 return문 최상위에 <Head>태그를 추가시킨다.
(전체 태그를 <></> 태그로 묶어 가장 상위에 <Head>의 내용을 채우면 된다.)

주의점으로는 'next/head'의 head를 Import 한다.
('next/document'라는 함정도 존재하기 때문에)
```

```tsx
// index.tsx

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // 여기서는 Fallback 상태일 때 기본 메타 태그를 설정하는 방법이다.
  if (router.isFallback) {
    return (
      <>
        // 기본 메타태그 설정
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="CODEJ625 BOOKS" />
          <meta property="og description" content="한입 북스에 등록된 도서들을 만나보세요" />
        </Head>

        <div>
          <p>...로딩중 입니다.</p>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <div>
        <p>문제가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <>
      // 데이터 패칭이 끝난 후 메타태그 추가
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content={book.coverImgUrl} />
        <meta property="og:title" content={book.title} />
        <meta property="og description" content={book.description} />
      </Head>

      <div className={style.container}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url('${book.coverImgUrl}')` }}>
          <img src={book.coverImgUrl} alt="책 이미지" />
        </div>
        <div className={style.title}>{book.title}</div>
        <div className={style.subTitle}>{book.subTitle}</div>
        <div className={style.author}>
          {book.author} | {book.publisher}
        </div>
        <div className={style.description}>{book.description}</div>
      </div>
    </>
  );
}
```
