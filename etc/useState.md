# react hook중에 가장 기본이 되는 useState를 사용해보자!

```
useState 함수는 컴포넌트에서 상태를 관리 할 때 사용한다.
먼저 리액트 패키지에서 useState라는 함수를 불러와야 사용할 수 있다.
```
```
import React, { useState } from 'react';
```

<br/>
<br/>

```javascript
const [state, setState] = useState(0);
```
```
이 함수를 호출해주면 두 개의 배열이 반환되는데, 비구조화하여 할당받는다.
여기서 첫 번째 원소는 현재 상태, 두 번째 원소는 Setter 함수이다.
```

<br/>
<br/>

```
setter에 콜백 함수 중 첫 번째 인자는 state(현재) 값이다.
```

```javascript
setState(status + 1); /* 1 */
setState(PrevState => PrevState +1); /* 1 */
```
```
{state} // state의 값은 1
```
