import { BookData } from "@/types";
import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: Promise<{ [id: string]: string | string[] }>;
}) {
  const param = await params;
  const bookId = param.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const book: BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${book.coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
