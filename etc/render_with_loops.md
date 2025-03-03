# Array 다루기

<br />
<br />

* 배열 렌더링
---

```
리액트는 반복문을 사용할 때, 고유한 키를 사용하여
변경된 요소만 업데이트함으로써 성능을 최적화할 수 있다.

이를 통해 불필요한 DOM 업데이트를 피하고,
렌더링 속도를 향상시킬 수 있다.
```

<br />
<br />
<br />
<br />

1. `map()`

```
리액트에서 특히 map() 메서드가 많이 사용되는데,
이는 코드가 간결하고 선언적이어서 리액트의 JSX와 잘 어울리기 때문이다.

또한, map()은 배열을 순회하며 바로 요소를 변환해 렌더링할 수 있고,  
고유한 `key`를 쉽게 지정할 수 있어 성능 최적화에도 유리하다.

이 외에도 원본 데이터를 수정하지 않는 특성 덕분에,  
상태 관리와 데이터 흐름을 단순하게 유지할 수 있다.
```

<br />
<br />
<br />

2. `예시`

```
밑에 예시는 리액트에서 가장 많이 사용하는
map 메서드를 사용해 렌더링하는 방식이다.
```

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
