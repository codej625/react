import { ReactNode } from 'react';
import style from './index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import BookItem from '@/components/book-item';
// import { InferGetServerSidePropsType } from 'next'; SSR
import { InferGetStaticPropsType } from 'next'; // SSG
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';
import Head from 'next/head';

// SSR
// export const getServerSideProps = async () => {
//   // Promise.all([])을 사용해서 Promise를 병렬로 처리
//   const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

//   return {
//     props: { allBooks, randomBooks },
//   };
// };

// SSG
export const getStaticProps = async () => {
  // 1) Promise.all([])을 사용해서 Promise를 병렬로 처리
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
  // 2) props를 컴포넌트에 전달 (리턴 시 밑에 문법 변경X)
  return {
    props: { allBooks, randomBooks },
    // revalidate 옵션 추가 (ISR 구현)
    // revalidate: 3, // 3초마다 재생성
  };
};

// SSR
// export default function Home({ allBooks, randomBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

// SSG
export default function Home({ allBooks, randomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="CODEJ625 BOOKS" />
        <meta property="og description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>

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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
