# Handling Nonexistent Pages

<br />
<br />

* 존재하지 않는 페이지 대응
---

```
404, 500과 같은 상황을
대응하거나 커스텀페이지를 만드는 방법을 알아보자.
```

<br />
<br />
<br />
<br />

1. 404

```ts
// pages/404.tsx

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

<br />
<br />
<br />

2. 500

```ts
pages/500.tsx

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>
}
```

<br />
<br />
<br />

3. Custom page

```
500.tsx 서버 사이드 에러만을 위한 정적 페이지
_error.tsx 모든 종류의 에러(404 포함)를 처리할 수 있는 페이지
```

```ts
// CustomError component

import { useEffect } from 'react';
import Link from 'next/link';

function CustomError({ statusCode, message }) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러 보고
    if (statusCode) {
      console.error(`Error ${statusCode} occurred`);
      // 여기에 에러 추적 서비스 호출 (예: Sentry)
    }
  }, [statusCode]);

  const getErrorMessage = () => {
    switch (statusCode) {
      case 404:
        return '페이지를 찾을 수 없습니다';
      case 500:
        return '서버 에러가 발생했습니다';
      default:
        return message || '알 수 없는 에러가 발생했습니다';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          {statusCode || '오류'}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{getErrorMessage()}</p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
          >
            페이지 새로고침
          </button>
          <Link href="/">
            <a className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              홈으로 돌아가기
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

// pages/_error.tsx에서 사용할 getInitialProps
CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
```

```ts
// pages/500.tsx
import CustomError from '../components/CustomError';

export default function Custom500() {
  return <CustomError statusCode={500} />;
}

// pages/_error.tsx
import CustomError from '../components/CustomError';
export default CustomError;
```

<br />

```
getInitialProps는 Next.js의 데이터 페칭 메서드이다.
에러가 발생했을 때 서버나 클라이언트에서 에러 상태 코드를 가져오는 역할을 한다.
```

```ts
// getInitialProps 예시

CustomError.getInitialProps = ({ res, err }) => {
  // 1. res 서버 응답 객체 (서버 사이드에서만 존재)
  // 2. err 에러 객체 (에러 발생 시 존재)
  
  const statusCode = res 
    ? res.statusCode        // 서버 응답이 있으면 해당 상태 코드 사용
    : err 
      ? err.statusCode      // 없다면 에러 객체의 상태 코드 사용
      : 404;                // 둘 다 없으면 404 사용

  return { statusCode };    // 상태 코드를 컴포넌트의 props로 전달
};
```
