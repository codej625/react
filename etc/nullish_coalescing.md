# Nullish coalescing

<br /><br />


* 어디선가 많이 본 ?? 연산자

---

```
Nullish Coalescing 연산자는 ?? 기호를 사용한다.

이 연산자는 좌항의 값이 null 또는 undefined일 경우에만 우항의 값을 반환하며,
그렇지 않으면 좌항의 값을 반환한다.
```

<br />
<br />
<br />
<br />

1. 기본 문법

<br />

`a ?? b`

```
a가 null 또는 undefined가 아니면 a를 반환한다.

a가 null 또는 undefined이면 b를 반환한다.
```

<br />

`Falsy 값과의 차이점`

```
|| (논리 OR) 연산자는 falsy 값(false, 0, '', NaN, null, undefined 등)을 모두 체크하지만,
?? 연산자는 오직 null과 undefined만 체크한다.

// 0 || 42는 42를 반환하지만, 0 ?? 42는 0을 반환합니다.
```

<br />

`주의 사항`

```js
// ??는 &&나 ||와 함께 사용할 때 우선순위가 낮으므로 괄호를 사용하는 것이 좋다.

let result = (null ?? "default") && true; // 괄호로 우선순위 명확히 한다.
```

<br />
<br />
<br />

2. 예시

<br />

`사용자에게 인사 메시지를 표시하고, 메시지가 제공되지 않을 경우 기본 메시지를 설정하는 예시.`

```jsx
import React from 'react';

const Greeting = ({ message, userName }) => {
  // message가 null 또는 undefined일 경우 'Hello, Guest!'를 기본값으로 사용
  const displayMessage = message ?? 'Hello, Guest!';
  // userName이 null 또는 undefined일 경우 'Guest'를 기본값으로 사용
  const displayName = userName ?? 'Guest';

  return (
    <div>
      <h1>{displayMessage}</h1>
      <p>Welcome, {displayName}!</p>
    </div>
  );
};

export default Greeting;
```
