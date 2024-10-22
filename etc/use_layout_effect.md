# useLayoutEffect

<br /><br />


* useLayoutEffect
---

```
컴포넌트가 DOM에 그려진 후에 동기적으로 실행되는 효과를 관리하는 데 사용된다.
주로 DOM 요소의 크기나 위치와 같은 레이아웃 측정이 필요할 때 유용하다.
```

<br /><br /><br />

1. 동기적 실행

```
useLayoutEffect는 브라우저가 화면을 업데이트하기 전에 실행되므로,
DOM 변화를 즉시 반영할 수 있다.

이로 인해 사용자에게 더 부드러운 경험을 제공할 수 있다.
```

<br /><br />

2. 렌더링 후 실행

```
컴포넌트가 렌더링된 후에 실행되므로,
상태 업데이트나 레이아웃 측정이 필요할 때 적합하다.
```

<br /><br />

3. cleanup 함수

```
useEffect와 마찬가지로,
useLayoutEffect도 cleanup 함수를 반환할 수 있다.
(컴포넌트가 언마운트될 때 정리 작업을 수행할 수 있다.)
```

<br /><br /><br />

* 예시
---

```jsx
import React, { useLayoutEffect, useRef } from 'react';

function LayoutComponent() {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    const div = divRef.current;
    // DOM에 접근하여 레이아웃을 조정하거나 측정
    console.log(div.getBoundingClientRect());
  }, []); // 의존성 배열에 빈 배열을 전달하면 마운트 시 한 번만 실행됨

  return <div ref={divRef}>Hello, world!</div>;
}
```

<br />

```
* 언제 사용해야 할까?

1. DOM 크기나 위치를 측정해야 할 때
2. CSS 애니메이션을 적용하기 전에 DOM을 수정해야 할 때
3. 화면 깜빡임을 방지하고 싶은 경우
```

<br /><br /><br />

* useEffect, useLayoutEffect 비교
---

| 특징          | `useEffect`                                         | `useLayoutEffect`                                        |
|--------------|-----------------------------------------------------|----------------------------------------------------------|
| **실행 시점**  | 브라우저가 화면을 그린 후 비동기적으로 실행                    | DOM 업데이트가 완료된 직후, 브라우저가 화면을 그리기 전에 동기적으로 실행 |
| **용도**      | 데이터 fetching, 구독 설정, 타이머 등 비동기 작업에 적합       | 레이아웃 측정, DOM 조작, 애니메이션 초기화 등 DOM 관련 작업에 적합    |
| **사용 예**   | 사용자 경험을 저해하지 않고 성능을 고려한 비동기 작업             | 레이아웃에 영향을 주는 작업으로 깜빡임 없이 수정 가능                |
