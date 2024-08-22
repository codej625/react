# 논리 AND 연산자를 사용해 조건부 렌더링하기

<br /><br />


```
&& 연산자를 통해 특정 조건이 참일 때만 JSX를 렌더링하도록 할 수 있다.

예를 들어,
어떤 컴포넌트에서 특정 상태가 true일 때만 특정 요소를 화면에 표시하고 싶을 때 유용하다.
```

<br /><br /><br />

* 예시
---

```jsx
import React, { useState } from 'react';

export default function MainComponent() {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      {/* showText가 true일 때만 해당 요소를 렌더링 */}
      {showText && <p>This text will show if showText is true</p>}

      <button onClick={() => setShowText(!showText)}>
        Toggle Text
      </button>
    </div>
  );
}
```
