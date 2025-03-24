# 리액트에서 사용하기 좋은 패턴을 정리

<br />
<br />

* 컴포넌트의 조합에 따라 사용하기 좋은 패턴이 있을까?
---

```
일반적으로 좋은 UI/UX는 사용자에게 익숙한 형태를 띤다.

그렇기 때문에 비슷한 형태의 레아이웃을 갖는 화면구성은,
컴포넌트의 조합 또한 어느 정도 좋은 구성이 존재한다.
```

<br />
<br />
<br />
<br />

1. 서치옵션 + 그리드 테이블

```
서치옵션과 그리드 테이블로 이루어진 가장 기본적인 레이아웃이다.

그러면서도 잘못하면 props drilling이 빈번하게 일어난다.

좋은 컴포넌트 조합을 만들어보자.
```

`리액트 바전`

```tsx
import React, { useState, useEffect } from 'react';

// 타입 정의
interface SearchParams {
  query?: string;
  // 필요한 검색 조건들을 여기에 추가
}

interface RowData {
  [key: string]: any; // 행 데이터의 형태를 정의 (예: { id: number, name: string, ... })
}

interface GridProps {
  data: RowData[];
  onRowClick: (rowData: RowData) => void;
}

interface SearchOptionsProps {
  onSearch: (params: SearchParams) => void;
}

// api 호출 함수 (예시)
function fetchData(params: SearchParams): Promise<RowData[]> {
  // ... API 호출 로직 ...
  return new Promise((resolve) => {
    // 예시 데이터
    const exampleData: RowData[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
      { id: 3, name: 'Item 3', description: 'Description 3' },
    ];
    resolve(exampleData);
  });
}

// SearchOptions 컴포넌트
function SearchOptions({ onSearch }: SearchOptionsProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch({ query: searchQuery });
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

// Grid 컴포넌트
function Grid({ data, onRowClick }: GridProps) {
  // ... 테이블 렌더링 로직 ...
  return (
    <div>
      {/* data를 이용한 테이블 렌더링 및 onRowClick 이벤트 핸들링 */}
      {data.map((row, index) => (
        <div key={index} onClick={() => onRowClick(row)}>
          {Object.entries(row).map(([key, value]) => (
            <span key={key}>{key}: {value} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Wrapper 컴포넌트
function Wrapper() {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [gridData, setGridData] = useState<RowData[]>([]);

  useEffect(() => {
    fetchData(searchParams).then((data) => setGridData(data));
  }, [searchParams]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  const handleRowClick = (rowData: RowData) => {
    console.log('Selected row:', rowData);
  };

  return (
    <div>
      <SearchOptions onSearch={handleSearch} />
      <Grid data={gridData} onRowClick={handleRowClick} />
    </div>
  );
}

export default Wrapper;
```

<br />

`넥스트 15버전`

```tsx
import React, { useState } from 'react';
import { Metadata } from 'next';

// 타입 정의
interface SearchParams {
  query?: string;
  // 필요한 검색 조건들을 여기에 추가
}

interface RowData {
  [key: string]: any; // 행 데이터의 형태를 정의 (예: { id: number, name: string, ... })
}

interface GridProps {
  data: RowData[];
  onRowClick: (rowData: RowData) => void;
}

interface SearchOptionsProps {
  onSearch: (params: SearchParams) => void;
}

// api 호출 함수 (백엔드 서버에서 직접 데이터 가져오기)
async function fetchData(params: SearchParams): Promise<RowData[]> {
  const url = `/api/data?query=${params.query || ''}`; // 백엔드 API 엔드포인트
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// SearchOptions 컴포넌트 (클라이언트 컴포넌트)
function SearchOptions({ onSearch }: SearchOptionsProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch({ query: searchQuery });
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

// Grid 컴포넌트 (서버 컴포넌트)
async function Grid({ data, onRowClick }: GridProps) {
  return (
    <div>
      {data.map((row, index) => (
        <div key={index} onClick={() => onRowClick(row)}>
          {Object.entries(row).map(([key, value]) => (
            <span key={key}>
              {key}: {value}{' '}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Wrapper 컴포넌트 (Next.js 페이지 컴포넌트, 서버 컴포넌트)
export default async function Wrapper({ searchParams }: { searchParams: SearchParams }) {
  const data = await fetchData(searchParams);

  const handleRowClick = (rowData: RowData) => {
    console.log('Selected row:', rowData);
  };

  return (
    <div>
      <SearchOptions onSearch={(params) => {
        window.location.href = `/?query=${params.query}`;
      }} />
      <Grid data={data} onRowClick={handleRowClick} />
    </div>
  );
}
```
