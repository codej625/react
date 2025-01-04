import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/'); // 요청 경로
    return res.json({ revalidate: true }); // 확인하기 위한 json 값
  } catch {
    res.status(500).send('Revalidation Failed');
  }
}
