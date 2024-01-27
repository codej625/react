# useState()의 변수를 업데이트 할 때 중복제거

<br />

```javascript
import React, { useState } from 'react';

function ArrayExample() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = (newItem) => {
    /* 중복 제거 */
    if (!items.includes(newItem)) {
      /* 중복되지 않은 경우에만 새로운 배열을 생성하여 상태를 업데이트합니다. */
      const newItems = [...items, newItem];
      setItems(newItems);
    }
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          /* item이 확실한 unique value라면 item을 key로 주는게 좋다. */
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => addItem(4)}>Add Item</button>
      <button onClick={() => addItem(2)}>Add Duplicate</button>
    </div>
  );
}
```
