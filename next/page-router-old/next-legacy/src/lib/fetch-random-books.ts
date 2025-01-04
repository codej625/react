import { BookData } from '@/types';

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url: string = process.env.NEXT_PUBLIC_API_URL_2 as string;

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
