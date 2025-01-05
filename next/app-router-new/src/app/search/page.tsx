export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  return <>Search Page {query}</>;
}
