# useRef에 대해 알아보자!

```
JavaScript 를 사용 할 때에는,
우리가 특정 DOM 을 선택해야 하는 상황에 getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM 을 선택한다.

리액트를 사용하는 프로젝트에서도 가끔씩 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있다.

예를 들어서 특정 엘리먼트의 크기를 가져와야 한다던지,
스크롤바 위치를 가져오거나 설정해야된다던지,
또는 포커스를 설정해줘야된다던지...등등
그럴 땐, 리액트에서 ref 라는 것을 사용한다.
```

```javascript
import React, { useState, useRef } from 'react';

function Ref() {

  const nameInput = useRef();

  const onReset = () => {
    nameInput.current.focus();
  };

  return (
    <>
      <input
        name="name"
        type="text"
        placeholder="이름"
        ref={nameInput}
      />
  
      <button onClick={onReset}>초기화</button>
    </>
  );
}

export default InputSample;
```

```
useRef() 를 사용하여 Ref 객체를 만들고,
이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 한다.
그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 된다.

위 예제에서는 onReset 함수에서 input 에 포커스를 하는 focus() DOM API 를 호출해주었다.
```
