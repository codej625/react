# input 상태 관리하기

```
input 의 onChange 라는 이벤트는 이벤트 객체 e 를 파라미터로 받아와서 사용 할 수 있는데, 
이 객체의 e.target 은 이벤트가 발생한 DOM 인 input DOM 을 가르키게 된다. 
이 DOM 의 value 값, 즉 e.target.value 를 조회하면 현재 input 에 입력한 값이 무엇인지 알 수 있다.
이 값을 useState 를 통해서 관리를 해주면 된다.
```
```javascript
import React, { useState } from 'react';

function Input() {
  const [val, setVal] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={val} />
      <button onClick={onReset}>reset</button>
      <div>
        <b>value: {val}</b>
      </div>
    </div>
  );
}

export default Input;
```
```
input 의 상태를 관리할 때에는 input 태그의 value 값도 설정해주는 것이 중요하다.
그렇게 해야, 상태가 바뀌었을때 input 의 내용도 업데이트 된다.
```
