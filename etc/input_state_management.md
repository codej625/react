# input 상태 관리하기

<br />
<br />

* Input 상태를 어떻게 관리할까?
---

```
input은 이벤트 객체(e)를 파라미터로 받아와 사용 할 수 있는데,
이 객체의 target은 이벤트가 발생한 DOM 속에 input을 가리키게 된다. 

해당 input의 value 값, 즉 e.target.value를 조회하면 현재 input에 입력한 값이 무엇인지 알 수 있다.

이 값을 useState 를 통해서 관리를 해주면 된다.
```

<br />
<br />
<br />
<br />

1. 이벤트 객체와 상태(state)를 사용한 예시

```javascript
import React, { useState } from 'react';

function InputTest() {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onReset = () => {
    setInputValue('');
  };

  return (
    <div>
      <button onClick={onReset}>reset</button>
      <br />
      <input onChange={onChange} value={inputValue} />

      <div>
        <b>value: {inputValue}</b>
      </div>
    </div>
  );
}

export default InputTest;
```

```
input 의 상태를 관리할 때에는 input 태그의 value 값도 설정해주는 것이 중요하다.

그렇게 해야 상태가 바뀌었을때 input 의 내용도 업데이트 된다.
```
