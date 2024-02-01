import "./Count.css";
import React, { useState } from "react";

function Count() {

  const [count, setCount] = useState(() => {
    return 0;
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

export default Count;