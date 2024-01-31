# useState의 렌더링을 한 번만 실행되게 만들자!

<br />

1. App.css
```css
.container {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
}

.btn-nomal {
  width: 200px;
  border: 2px solid;
  border-radius: 10px;
}

.btn-reset {
  width: 200px;
  margin-top: 20px;
  background: rgb(255, 157, 157);
  border: 2px solid;
  border-radius: 10px;
}

.count-display {
  padding: 20px;
  font-size: 20px;
}
```

2. App.js
```jsx
import "./App.css";
import React, { useState } from "react"; /* useState import */

function App() {
  /* 매우 무거운 값을 가져오는 함수라고 가정. */
  const heayWork = () => {
    console.log("data");
    return 0;
  };

  /* 콜백 함수로 값을 넣어주면 처음 한번만 렌더링 된다. */
  const [count, setCount] = useState(() => {
    return heayWork();
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

  function reset() {
    setCount((prev) => {
      return prev = 0;
    });
  }

  return (
    <>
      <div className="container">
        <button
          className="btn-nomal"
          type="button" 
          onClick={plus}
        >
          더하기
        </button>

        <div className="count-display">{count}</div>

        <button
          className="btn-nomal"
          type="button" 
          onClick={minus}
        >
          빼기
        </button>
        <br />
        <button
          className="btn-reset"
          type="button" 
          onClick={reset}
        >
          리셋
        </button>
      </div>
    </>
  );
}

export default App;
```
