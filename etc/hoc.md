# HOC

<br />
<br />

* 고차 컴포넌트(HOC)?
---

```
고차 컴포넌트는 컴포넌트를 인자로 받아,
새로운 기능을 추가한 컴포넌트를 반환하는 컴포넌트이다.

"고차"라는 이름은 함수형 프로그래밍에서 유래했으며,
함수를 인자로 받거나 함수를 반환하는 함수를 뜻한다.

React에서는 기존 컴포넌트에
로직(예: 데이터 fetching, 상태 관리, 스타일 적용 등)을 재사용 가능하게 추가할 때 사용된다.
```

<br />
<br />
<br />
<br />

1. 예시

```
인증 체크를 추가하는 HOC

요구사항 예시: 사용자가 로그인하지 않았다면 "로그인 필요"를 표시하고, 로그인했으면 컴포넌트를 렌더링.
```

```
// 파일 구조 예시

src/
├── App.ts
├── ProfilePage.ts
├── ProtectedProfilePage.ts
└── withAuth.ts
```

<br />

```tsx
// withAuth.ts

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props: P) => {
    const isAuthenticated: boolean = false; // 인증 상태 (Redux나 Context에서 가져올 수 있음)

    if (!isAuthenticated) {
      return <div>로그인이 필요합니다.</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuth;
};

export default withAuth;
```

<br />

```tsx
// ProfilePage.ts

interface ProfilePageProps {
  user: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  return <div>{user}의 프로필 페이지</div>;
};

export default ProfilePage;
```

<br />

```tsx
// ProtectedProfilePage.ts

import withAuth from "./withAuth";
import ProfilePage from "./ProfilePage";
import { ProfilePageProps } from "./ProfilePage";

const ProtectedProfilePage = withAuth<ProfilePageProps>(ProfilePage);

export default ProtectedProfilePage;
```

<br />

```tsx
// App.tsx

import ProtectedProfilePage from "./ProtectedProfilePage";

const App: React.FC = () => {
  return <ProtectedProfilePage user="김철수" />;
};

export default App;
```
