# 배열에 항목을 추가하기

<br />
<br />

* 리액트에서 상태를 다루는 방법을 알아보자.
---

```
리액트는 state(상태)가 변경될 때, 리렌더링 된다.

상태에 배열값을 넣고,
리액트에서 상태를 사용하는 방법에 익숙해져 보자.
```

<br/>
<br/>
<br/>
<br/>

1. `CreateUser 컴포넌트 만들기`

```tsx
// src/CreateUser.tsx
import React from 'react';

// props 타입 정의
interface CreateUserProps {
  username: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
}

function CreateUser({ username, email, onChange, onCreate }: CreateUserProps) {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
      <input
        name="username"
        placeholder="계정명"
        value={username}
        onChange={onChange}
        style={{ padding: '5px' }}
      />
      <input
        name="email"
        placeholder="이메일"
        value={email}
        onChange={onChange}
        style={{ padding: '5px' }}
      />
      <button onClick={onCreate} style={{ padding: '5px 10px' }}>
        등록
      </button>
    </div>
  );
}

export default CreateUser;
```

```
CreateUserProps 인터페이스를 만들어 props 타입을 정의했다.

onChange는 React.ChangeEvent<HTMLInputElement> 타입을 사용해서 input 이벤트에 맞게 설정했다.
```

<br />
<br />
<br />

2. `App 컴포넌트 (부모 컴포넌트)를 사용한 상태의 중앙관리`

```
방법 첫 번째

Spread 연산자 사용
```

```tsx
// src/App.tsx
import React, { useState, useRef } from 'react';
import CreateUser from './CreateUser';

interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  const [inputs, setInputs] = useState<{ username: string; email: string }>({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'velopert', email: 'public.velopert@gmail.com' },
    { id: 2, username: 'tester', email: 'tester@example.com' },
    { id: 3, username: 'liz', email: 'liz@example.com' },
  ]);
  const nextId = useRef<number>(4);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onCreate = () => {
    const newUser: User = { id: nextId.current, username, email };
    setUsers((prev) => [...prev, newUser]);
    setInputs({ username: '', email: '' });
    nextId.current += 1;
  };

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

<br />
<br />

```
방법 두 번째

concat 메서드 사용
```

```tsx
// src/App.tsx
import React, { useState, useRef } from 'react';
import CreateUser from './CreateUser';

interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  const [inputs, setInputs] = useState<{ username: string; email: string }>({
    username: '',
    email: '',
  });
  const { username, email } = inputs;
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: 'velopert', email: 'public.velopert@gmail.com' },
    { id: 2, username: 'tester', email: 'tester@example.com' },
    { id: 3, username: 'liz', email: 'liz@example.com' },
  ]);
  const nextId = useRef<number>(4);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onCreate = () => {
    const newUser: User = { id: nextId.current, username, email };
    setUsers((prev) => prev.concat(newUser));
    setInputs({ username: '', email: '' });
    nextId.current += 1;
  };

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
