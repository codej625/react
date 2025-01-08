# React Router Dom

<br />
<br />

* react-router-dom ?
---

```
react-router-dom React은 애플리케이션에서,
클라이언트 측 라우팅을 쉽게 구현할 수 있도록 도와주는 라이브러리이다.

React 애플리케이션에서 여러 페이지로 구성된 웹사이트를 개발할 때,
URL과 컴포넌트를 연결해주는 역할을 한다.
```

<br />
<br />
<br />
<br />

1. 파일 정의

```ts
// routes/Routes.ts

const nonAuthRoutes: RouteObject[] = [
  {
    path: "/",
    element: <{컴포넌트 명} />,
    children: [
      {
        index: true,
        element: <{컴포넌트 명} />,
      },
    ],
  },
  {
    path: "/auth",
    element: <{컴포넌트 명} />,
    children: [
      {
        path: "sign-in",
        element: <{컴포넌트 명} />,
      },
    ],
  },
];

///////////////////////////////////////////////////////////////////////////////

const authRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <{컴포넌트 명} />,
    handle: {
      pageCode: "",
    },
    children: [
      {
        index: true,
        element: <{컴포넌트 명} />,
        handle: {
          pageCode: "DASHBOARD",
        },
      },
    ],
  },
  {
    path: "/page-layout",
    element: <{컴포넌트 명} />,
    handle: {
      pageCode: "",
    },
    children: [
      {
        index: true,
        element: <{컴포넌트 명} />,
        handle: {
          pageCode: "PAGE_LAYOUT_PAGE",
        },
      },
    ],
  },
];

const testRoutes: RouteObject[] = [
  {
    path: "/test-page",
    element: <{컴포넌트 명} />,
    handle: {
      pageCode: "",
    },
    children: [
      {
        index: true,
        element: <{컴포넌트 명} />,
        handle: {
          pageCode: "DATA_GRID_PAGE",
        },
      },
    ],
  },
];

///////////////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////

const routes: RouteObject[] = [...nonAuthRoutes, ...authRoutes, ...testRoutes];

export default routes;
```

```tsx
// App.tsx

function App() {
  
  const router = useMemo(() => {
    return createBrowserRouter(routes, {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    });
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
```

```tsx
// Layout.tsx

import { memo } from "react";
import { Outlet } from "react-router-dom";

///////////////////////////////////////////////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////

const BaseLayout = () => {
  return (
    <FullScreenContainer>
      <Outlet /> // 이부분이 Routes.ts 에 children 부분에 해당
    </FullScreenContainer>
  );
};

export default memo(BaseLayout);
```
