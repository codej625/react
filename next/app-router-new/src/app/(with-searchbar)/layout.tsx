import SearchBar from "./search-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>야 너두?</h1>
      <SearchBar />
      {children}
    </>
  );
}
