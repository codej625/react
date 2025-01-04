# getStaticPaths

<br />
<br />

* Next에서 동적 페이지에 SSG (Static Site Generation) 구현하기
---

```
SSG는 빌드 타임에 미리 페이지를 생성해 놓기 때문에,
동적인 페이지에 대한 대응이 불가능하다.

예를 들어, /book/[id]라는 경로를 받는 동적 페이지는
id라는 파라미터를 사용한 로직이 존재할 시,
미리 페이지를 생성할 수가 없다.
(어떤 id 값의 요청이 올지 알 수 없기 때문에)

그럼에도 미리 페이지를 빌드하고 싶다면,
선수 작업으로 미리 모든 경로에 대한 값을 설정해두면 된다.

물론 경로가 업데이트되면 새로운 경로에 대한 대응은 안 되고,
fallback이라는 옵션을 미리 설정해놓고 대응할 수 있다.
```

<br />
<br />
<br />
<br />

1. Dynamic page + SSG

```
선수작업으로 빌드 타임에 페이지를 생성하기 위해,
사용할 모든 경로에 대한 값을 getStaticPaths() 함수를 사용하여 설정한다.
```

```tsx
// [id].tsx

export const getStaticPaths = () => {
  return {
    // 경로의 값은 반드시 string으로 설정 (문법이 그렇다.)
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    // 설정한 경로 외에 값이 들어오면 어떻게 할 건지에 대한 옵션 Default 값은 false
    fallback: false,
  };
};
```

```tsx
// [id].tsx

// SSG 설정을 위해 getStaticProps() 함수를 사용
export const getStaticProps = async (context: GetStaticPropsContext) => {
  // getStaticProps()의 context에는 기본적으로 param이 없기 때문에 "!" 단언 연산자를 사용한다.
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  return {
    props: { book },
  };
};
```

```tsx
// [id].tsx

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return (
      <div>
        <p>문제가 발생했습니다.</p>
      </div>
    );
  }

  return (
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
  );
}
```

<br />

```tsx
// [id].tsx (완성 코드)

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

// 1)
export const getStaticPaths = () => {
  return {
    // 경로의 값은 반드시 string으로 설정 (문법이 그렇다.)
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    // 설정한 경로 외에 값이 들어오면 어떻게 할 건지에 대한 옵션 Default 값은 false
    fallback: false,
  };
};

// 2)
// SSG 설정을 위해 getStaticProps() 함수를 사용
export const getStaticProps = async (context: GetStaticPropsContext) => {
  // getStaticProps()의 context에는 기본적으로 param이 없기 때문에 "!" 단언 연산자를 사용한다.
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  return {
    props: { book },
  };
};

// 3)
export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return (
      <div>
        <p>문제가 발생했습니다.</p>
      </div>
    );
  }

  return (
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
  );
}
```
