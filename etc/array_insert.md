# 배열에 항목을 추가해보자!

```
우선, 예시를 만들기 위해 input 두개와 button 하나로 이루어진 CreateUser.js 라는 컴포넌트를 src 디렉터리에 만들어보자.
```

<br/>

```
CreateUser.js
```
```javascript
import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateUser;
```

<br/>

```
상태관리를 CreateUser 에서 하지 않고 부모 컴포넌트인 App 에서 하게 하고,
input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 처리해보자!
```

<br/><br/>

```
배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다.
그렇기 때문에, 배열의 push, splice, sort 등의 함수를 사용하면 안 된다.
(만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야 한다.)
```

<br/><br/>

```
불변성을 지키면서 배열에 새 항목을 추가하는 방법은 두가지가 있다.
첫번째는 "spread 연산자"를 사용하는 것이다.
```
```javascript
import React, { useRef, useState } from 'react';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
    </>
  );
}

export default App;
```

<br/><br/>

```
또 다른 방법은 concat 함수를 사용하는 것 이다.
concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만들어 준다.
```
```javascript
import React, { useRef, useState } from 'react';
import CreateUser from './CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
    </>
  );
}

export default App;
```

```
배열에 새 항목을 추가 할 때에는 이렇게 spread 연산자를 사용하거나, concat 을 사용 한다.
```
