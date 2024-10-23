# Context API

<br /><br />

* Context API + useContext()
---

```
컴포넌트 간에 데이터를 전역적으로 공유할 수 있게 해주는 기능이다.
이를 사용하면 props drilling(중첩된 컴포넌트에 props를 계속 전달하는 것)을 피할 수 있다.
```

<br /><br /><br />

* 예시
---

1. Context 생성

```javascript
// CustomContext.js

import React, { createContext } from 'react';

export const CustomContext = createContext(null);
```

<br /><br />

2. Context Provider 설정

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
      <ChildComponent /> // context를 적용할 하위 컴포넌트
    </CustomContext.Provider>
  );
};

export default App;
```

<br /><br />

3. Context 사용

```jsx
// ChildComponent.jsx

import React, { useContext } from 'react';
import { CustomContext } from '... 경로';

export defalut function ChildComponent() {
  const { state, setState } = useContext(CustomContext); // 만들어 놓은 context 사용.

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

<br /><br /><br />

* 예시2
---
  
1-1. Context 생성 시 초깃값 설정

```javascript
// CustomContext.js

import { createContext } from 'react';

export const CustomContext = createContext('codej625'); // 초깃값을 설정 시 다른 컴포넌트에서 곧바로 사용할 수 있다.
```

<br /><br />

2-2. Context 초깃값 사용

```jsx
// ChildComponent.jsx

import { useContext } from 'react';
import { CustomContext } from '... 경로';

export defalut function ChildComponent() {
  const text = useContext(CustomContext); // 초깃값 사용

  return (
    <>
      <p>{text}</p>
    </>
  );
};
```
