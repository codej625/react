import SearchableLayout from '@/components/searchable-layout';
import { ReactNode, useEffect, useState } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import { BookData } from '@/types';
import { useRouter } from 'next/router';

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const query = router.query.q;

  useEffect(() => {
    const fetchSearchResult = async () => {
      setLoading(true);
      const result = await fetchBooks(query as string);
      setBooks(result);
      setLoading(false);
    };

    if (query) fetchSearchResult();
  }, [query]);

  if (!query && loading) {
    return (
      <div>
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <p>로딩중입니다.</p>
      </div>
    );
  }

  if (!loading && books.length === 0) {
    return (
      <div>
        <p>검색결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book}></BookItem>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
