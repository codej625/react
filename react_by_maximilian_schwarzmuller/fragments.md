# Fragments에 대해 알아보자.

<br />

```
JSX는 두 개 이상의 요소를 반환하는 것을 허용하지 않는다.
때때로 여러 컴포넌트를 그룹화해야 할 때가 있는데,
이때 Fragments를 사용하면 불필요한 div나 span 등을 추가로 렌더링하지 않고도 여러 요소를 감싸고 그룹화할 수 있다.
```

<br />

예시 1)
```javascript
import React from 'react';

function MyComponent() {
  return (
    <>
      <h1>Hello</h1>
      <p>React Fragments</p>
    </>
  );
}
```

<br />

예시 2)
```javascript
import React from 'react';

function MyComponent() {
  return (
    <Fragment>
      <h1>Hello</h1>
      <p>React Fragments</p>
    <Fragment/>
  );
}
```
```
<></> or <Fragment><Fragment/>
둘 중 하나를 사용하면 된다.
```
