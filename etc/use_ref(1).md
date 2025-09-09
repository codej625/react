# useRef

<br />
<br />

* React에서는 DOM을 어떻게 조작할까?

---

```
JavaScript는 DOM에 접근하기 위해,
getElementById, querySelector 와 같은 Selector 사용한다.

물론 리액트 라이브러리를 사용하는 프로젝트에서도 DOM을 직접 선택해야 하는 상황이 발생 할 수 있다.

예를 들어, 특정 엘리먼트의 크기를 가져와야 한다든지,
스크롤 바 위치를 가져오거나 설정해야 한다든지,
또는 포커스를 설정해 줘야 한다든지...등등

이때 리액트에서는 useRef() 이라는 훅을 사용한다.
```

<br />
<br />
<br />
<br />

`기본적인 사용 방법`

```
리액트의 useRef 훅을 사용하여,
특정 DOM 요소에 접근하는 간단한 예제이다.
```

```tsx
import React, { useRef } from 'react';

const FocusInput = () => {
  // HTMLInputElement 타입의 input 요소에 접근하기 위한 참조(ref)를 생성
  const inputRef = useRef<HTMLInputElement | null>(null); // 초기값은 null로 설정하며, <HTMLInputElement | null> 제네릭을 사용해 타입을 명시


  // 해당 요소의 focus() 메서드를 호출하여 커서를 이동시킨다.
  const onReset = () => {
    // inputRef.current로 해당 DOM 요소에 접근할 수 있게 된다.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {/* useRef로 생성한 참조(ref)를 input 요소에 연결 */}
      <input
        ref={inputRef}
        name="name"
        type="text"
        placeholder="이름을 입력하세요"
      />

      <button
        onClick={onReset}
      >
        초기화
      </button>
    </>
  );
};

export default FocusInput;
```

<br />
<br />

```
useRef() 훅을 사용하여 Ref 훅을 만들고,
선택하고 싶은 DOM 에 Ref 값으로 설정해준다.

그러면 Ref.current 는 원하는 DOM 을 가리키게 된다.
```
