export default async function Page({
  // page 컴포넌트로 전달되는 Props로 부터 params을 꺼내온다.
  params,
}: {
  // params의 타입은 Promise 객체인데, id라는 URL Parameter을 string 타입으로 가지고 있는 객체이다.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <>Book/[{id}] Page</>;
}
