import { BookData } from '@/types';

export default async function fetchOneBooks(id: number): Promise<BookData | null> {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL_1}/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
