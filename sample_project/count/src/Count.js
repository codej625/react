// 1. 리액트 컴포넌트를 만들 땐 리액트를 import 해야한다.
import React, { useState } from 'react';
// 2. 함수를 하나 만들고 내용을 return.
function Count() {
  // 함수는 이 위치 혹은 return안에 위치한다.
  const [count, setCount] = useState(0);
  const onIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };
  const onDecrease = () => {
    setCount(prevCount => prevCount - 1);
  };
  const reset = () => {
    setCount(prevCount => prevCount = 0);
  };

  return (
    <>
      <p>COUNT</p>
      <span>{count}</span>
      <br/><br/>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={reset}>reset</button>
    </>
  )
}
// 3. Count라는 컴포넌트를 내보내겠다는 의미.(코드의 최하단에 적어야 한다.)
export default Count;