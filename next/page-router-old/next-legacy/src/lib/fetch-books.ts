import { BookData } from '@/types';

export default async function fetchBooks(query?: string): Promise<BookData[]> {
  let url = process.env.NEXT_PUBLIC_API_URL_1 as string;

  if (query) url += `/search?q=${query}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
