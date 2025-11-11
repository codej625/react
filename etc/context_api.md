# Context API

<br />
<br />

* 전역 상태관리

---

```
컴포넌트 간에 데이터를 전역적으로 공유할 수 있게 해주는 기능이다.

이를 사용하면 props drilling(중첩된 컴포넌트에 props를 계속 전달하는 것)을 피할 수 있다.
```

<br />
<br />
<br />
<br />

1. 예시 - 세팅

<br />

`1) Context 생성`

```js
// CustomContext.js

import React, { createContext } from 'react';

// 초깃값을 설정하지 않음
export const CustomContext = createContext(null);
```

<br />

`2) Context Provider 설정`

```jsx
// App.jsx

import React, { useState } from 'react';
import { CustomContext } from './context/CustomContext';
import ChildComponent from './components/ChildComponent';

const App = () => {
  const [state, setState] = useState('codej625');

  return (
    // Context Provider를 사용하여 하위 컴포넌트에 데이터를 제공. (보통 최상위 컴포넌트에서 설정한다.)
    <CustomContext.Provider value={{ state, setState }}>
      // context를 적용할 하위 컴포넌트
      <ChildComponent />
    </CustomContext.Provider>
  );
};

export default App;
```

<br />
<br />
<br />

2. Context 사용 - 나중에 값 세팅

<br />

`만들어 놓은 context 사용`

```jsx
// ChildComponent.jsx

import React, { useContext } from 'react';
import { CustomContext } from '... 경로';

export defalut function ChildComponent() {
  // 만들어 놓은 context 사용
  const { state, setState } = useContext(CustomContext);

  return (
    <div>
      <p>{state}</p>
      <button
        onClick={() => setState('codeflow625')}
      >
        Change
      </button>
    </div>
  );
};
```

<br />
<br />
<br />

3. Context 사용 - 초깃값 세팅

<br />

`1) Context 생성 시, 초깃값 설정`

```js
// CustomContext.js

import { createContext } from 'react';

// 초깃값을 설정 시 다른 컴포넌트에서 곧바로 사용할 수 있다.
export const CustomContext = createContext('codej625');
```

<br />

`2) Context 초깃값 사용`

```jsx
// ChildComponent.jsx

import { useContext } from 'react';
import { CustomContext } from '...경로';

export defalut function ChildComponent() {
  // 초깃값 사용
  const text = useContext(CustomContext);

  return (
    <>
      <p>{text}</p>
    </>
  );
};
```
