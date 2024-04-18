# 변수에 JSX 값을 저장해서 사용해보자.

<br />

```
일반적으로 useState() 를 사용해서 상태 값을 관리한다.
왜냐하면 리액트의 가상 DOM과 실제 DOM 사이에 불일치가 발생할 수 있기 때문이다.
리액트는 상태(state)나 속성(props)을 변경하여 컴포넌트를 렌더링하고, 이를 통해 UI를 업데이트한다.

하지만 변수에 JSX 값을 담아 사용하면,
컴포넌트를 렌더링할 수 있다.
```

<br /><br />

ex)
```javascript
import React from 'react';

function App() {
  /* 조건부로 JSX를 저장 */
  const isLoggedIn = true;
  const greeting = isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>;

  return (
    <div>
      {greeting}
      <p>This is a simple React component.</p>
    </div>
  );
}

export default App;
```
