# forwardRef에 대해 알아보자

<br />

```
React에서 useRef는 HTML 엘리먼트의 직접 접근하기 위해서 사용된다.
React 16.3에서 소개된 forwardRef가 등장하기 전까지는 컴포넌트의 ref를 Prop으로 받는 게 불가능했다.
그럼 새롭게 추가된 forwardRef를 사용하여 ref를 Prop으로 받아 엘리먼트에 접근하는 방법을 배워보자.
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
