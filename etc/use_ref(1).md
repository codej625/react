# useRef

<br /><br />

* React에서는 DOM을 어떻게 조작할까?
---
```
JavaScript를 사용할 때, DOM을 선택해야 하는 상황이오면 당연히(?)
getElementById, querySelector 같은 DOM Selector 함수를 사용해서 DOM을 선택한다.

리액트 라이브러리를 사용하는 프로젝트에서도 DOM 을 직접 선택해야 하는 상황이 발생 할 때도 있다.

예를 들어 특정 엘리먼트의 크기를 가져와야 한다든지,
스크롤 바 위치를 가져오거나 설정해야 한다든지,
또는 포커스를 설정해줘야 한다든지...등등

그럴 때 리액트에서는 DOM을 직접 조작하는 게 아니라 useRef() 이라는 훅을 사용한다.
```

<br /><br /><br />

1. 예시

```javascript
import React, { useState, useRef } from 'react';

export default function Ref() {

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
```

```
useRef() 훅을 사용하여 Ref 객체를 만들고,
이 객체를 우리가 선택하고 싶은 DOM 에 Ref 값으로 설정해주어야 한다.
그러면, Ref 객체의 .current 는 원하는 DOM 을 가리키게 된다.

위 예제에서는 함수에서 input 에 포커스를 하는 focus() DOM API를 호출해주었다.
```
