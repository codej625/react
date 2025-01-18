import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    return <div>서버에서 도서 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <>
      {allBooks.map((book, index: number) => (
        <BookItem key={`${book.id}-${index}`} {...book} />
      ))}
    </>
  );
};

const RandomBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
  );

  if (!response.ok) {
    return <div>서버에서 도서 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }
  const randomBooks: BookData[] = await response.json();

  return (
    <>
      {randomBooks.map((book, index: number) => (
        <BookItem key={`${book.id}-${index}`} {...book} />
      ))}
    </>
  );
};

export default async function Home() {
  return (
    <div className={style.container}>
      <h3>지금 추천하는 도서</h3>
      <section>
        <RandomBooks />
      </section>
      <h3>등록된 모든 도서</h3>
      <section>
        <AllBooks />
      </section>
    </div>
  );
}
