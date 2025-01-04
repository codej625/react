import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const query: string = router.query.q as string;

  useEffect(() => {
    setSearch(query || '');
  }, [query]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || query === search) return;
    router.push(`/search?q=${search}`);
  };

  const onkeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <div className={style.searchbar_container}>
        <input value={search} onChange={onChangeSearch} onKeyDown={onkeyEnter} placeholder="검색어를 입력하세요" />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </>
  );
}
