# Array 다루기

<br />
<br />

* 배열 렌더링
---

```
고유한 키를 사용하면,
리액트는 변경된 엘리먼트만 업데이트하므로 성능을 최적화할 수 있다.

이를 통해 불필요한 DOM 업데이트를 피하고,
렌더링 속도를 향상시킬 수 있다.
```

<br />
<br />
<br />
<br />

1. 사용 예시

```tsx
// 예시 데이터

interface User {
  id: number;
  username: string;
  email: string;
}

const users:User[] = [
  {
    id: 1,
    username: 'velopert',
    email: 'public.velopert@gmail.com'
  },
  {
    id: 2,
    username: 'tester',
    email: 'tester@example.com'
  },
  {
    id: 3,
    username: 'liz',
    email: 'liz@example.com'
  }
];
```

```tsx
// UserList.tsx

function UserList() {
  return (
    <div>
      <ul>
        {users.map((user, index) => (
          <li key={`${user.id}-${index}`}
            <p>id: {user.id}</p>
            <p>username: {user.username}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```
