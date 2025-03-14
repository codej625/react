# React Link

<br />
<br />

* Link? Router?
---

```
React Router는 React 애플리케이션에서 클라이언트 사이드 라우팅을 처리하기 위한 라이브러리이다.

URL에 따라 적절한 컴포넌트를 렌더링하며,
페이지 새로고침 없이 화면을 전환할 수 있도록 설계되었다.

주요 컴포넌트와 훅으로는 <BrowserRouter>, <Routes>, <Route>, <Link>, useParams, useNavigate 등이 있다.
```

<br />
<br />
<br />
<br />

1. `<Link>`

```
<Link>는 React Router에서 제공하는 컴포넌트로,
HTML의 <a> 태그와 유사한 역할을 하지만 페이지 새로고침 없이 라우팅을 처리한다.

사용자가 링크를 클릭하면 브라우저 URL이 변경되고,
React Router가 해당 경로에 맞는 컴포넌트를 렌더링한다.
```

<br />
<br />
<br />

2. 세팅

```
// npm 기준

npm install react-router-dom
```

<br />

```tsx
// 프로젝트의 최상위 컴포넌트에서 BrowserRouter로 감싸고 라우트를 설정한다.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```

<br />
<br />
<br />

3. 사용

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/details/:id" element={<DetailsPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

```tsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/details/1">상세 페이지로 이동 (ID: 1)</Link>
    </div>
  );
};

export default HomePage;
```

```
to 속성: 이동할 경로를 지정한다.
        클릭 시 /details/1로 이동하며,
        React Router가 DetailsPage 컴포넌트를 렌더링한다.
```

<br />

```tsx
// 상세 페이지에서 URL 파라미터 처리

import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>상세 페이지</h1>
      <p>ID: {id}</p>
    </div>
  );
};

export default DetailsPage;
```
