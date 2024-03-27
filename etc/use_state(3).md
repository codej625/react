# false를 기본값으로 설정하고 && 연산자를 사용하여 조건부 렌더링하는 패턴을 익혀보자.

<br />

```
이 패턴은 조건에 따라 특정 요소를 렌더링할 때 유용하다.
```

```javascript
import React, { useState } from 'react';

function MyComponent() {
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

export default MyComponent;
```
