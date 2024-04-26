# react hook중에 가장 기본이 되는 useState를 사용해보자!

<br />

```
useState 함수는 컴포넌트에서 상태를 관리 할때 사용한다.
먼저 리액트 패키지에서 useState라는 함수를 불러와야 사용할 수 있다.
```
```javascript
import React, { useState } from 'react';
```

<br/>

```
이 함수를 호출해주면 배열이 반환되는데, 여기서 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수이다.
```
```javascript
const [state, setState] = useState(0);
```

<br/>

```
ex) setter에 콜백 함수중 첫번째 파라미터는 state에 값이다.
```
```javascript
setState(PrevState => PrevState +1); /* 현재 state의 값은 1이 된다. */
```
