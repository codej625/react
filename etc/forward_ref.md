# forwardRef에 대해 알아보자

<br />

* forwardRef란 무엇일까?
```
React에서 useRef는 HTML 엘리먼트의 직접 접근하기 위해서 사용된다.
React 16.3에서 소개된 forwardRef가 등장하기 전까지는 컴포넌트의 ref를 Prop으로 받는 게 불가능했다.
forwardRef의 등장으로 ref를 Prop으로 받을 수 있게 된 것이다.

그럼 forwardRef를 사용하여 ref를 Prop으로 받아 엘리먼트에 접근하는 방법을 배워보자.
```

<br /><br />

1. 부모 컴포넌트 예시
```javascript
import React, { useRef } from 'react';
import MyComponent from './MyComponent'; /* 자식 컴포넌트 */

const ParentComponent = () => {
  const ref = useRef();

  return (
    <>
      <MyComponent ref={ref} /> /* 자식 컴포넌트에 ref를 Prop으로 전달 */
    </>
  );
};

export default ParentComponent;
```

<br />

2. 자식 컴포넌트 예시
```javascript
import React, { forwardRef } from 'react'; /* forwardRef를 import한다. */

const MyComponent = forwardRef((props, ref) => { /* forwardRef를 사용하여 MyComponent 함수 컴포넌트를 래핑한다. */
  return (
    <input ref={ref} />
  );
});

export default MyComponent;
```
```
forwardRef는 함수 컴포넌트에서 ref를 전달하는 데에 사용된다.
함수 컴포넌트의 렌더링 결과물은 컴포넌트의 렌더링 결과물로 전달되기 때문에,
forwardRef를 사용하여 ref를 전달하면 해당 함수 컴포넌트의 렌더링 결과물에도 ref가 적용된다.
```

<br /><br />

* 자식 컴포넌트에서 useRef를 직접 사용하려고 할 때 에러가 발생하는 이유?
```
React의 동작 방식과 관련이 있다.

React는 부모 컴포넌트에서 생성한 ref를 자식 컴포넌트로 전달하는 것은 가능하지만,
자식 컴포넌트 내에서 직접 ref를 생성하여 조작하는 것은 허용되지 않는다.

이것은 React가 컴포넌트의 상태와 렌더링을 관리하는 방식과 관련이 있다.
함수 컴포넌트 내부에서 생성된 변수나 ref는 컴포넌트가 다시 렌더링될 때마다 초기화되기 때문에,
외부에서 생성된 ref를 통해 안정적으로 DOM을 조작할 수 있다.

따라서 자식 컴포넌트에서 ref를 사용하고자 할 때에는 forwardRef를 사용하여 부모 컴포넌트에서 생성된 ref를 전달받아야 한다.
이를 통해 React가 컴포넌트의 렌더링을 올바르게 관리하고,
DOM 조작에 대한 안정성을 보장할 수 있다.
```
