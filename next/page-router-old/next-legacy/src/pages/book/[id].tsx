import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css';
import fetchOneBooks from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBooks(Number(id));

  // 404 페이지 리다이렉트 옵션
  // if (!book) {
  //   return {
  //     nofFount: true,
  //   };
  // }

  return {
    props: { book },
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
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
