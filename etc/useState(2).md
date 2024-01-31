# useState의 렌더링을 한 번만 실행되게 만들자!

<br />

```jsx
import "./App.css";
import React, { useState } from "react"; /* useState import */

function App() {
  /* 매우 무거운 값을 가져오는 함수라고 가정. */
  const heayWork = () => {
    console.log("data");
    return 0;
  };

  const [count, setCount] = useState(() => {
    return heayWork(); /* 콜백 함수로 값을 넣어주면 처음 한번만 렌더링 된다. */
  });

  function plus() {
    setCount((prev) => {
      return prev + 1;
    });
  }

  function minus() {
    setCount((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  }

  return (
    <>
      <div className="container">
        <button
          className="button-design"
          type="button" 
          onClick={plus}
        >
          더하기
        </button>

        <div className="count-display">{count}</div>

        <button
          className="button-design"
          type="button" 
          onClick={minus}
        >
          빼기
        </button>
      </div>
    </>
  );
}

export default App;
```
