# React Virtual DOM

<br />
<br />

* DOM(Document Object Model)
---

```
Virtual DOM을 알아보기 전에 DOM을 알아보자.

DOM은 웹 애플리케이션에서 DOM은 HTML 요소의 계층 구조(tree 형태로 표현)로,
이는 브라우저가 화면에 그리는 웹 페이지의 구조를 정의한다.

DOM은 JavaScript를 통해 동적으로 변경할 수 있다.
하지만 DOM 조작은 비용이 많이 들고,
특히 대규모 애플리케이션에서는 성능 문제를 초래할 수 있다.
```

<br />
<br />
<br />

* Virtual DOM ?
---

```
Virtual DOM은 실제 DOM과 같은 내용을 담고 있는 가볍고 빠른 복사본이다.
이는 메모리에 저장된 "JavaScript 객체" 형태로,
브라우저에 직접적으로 접근하지 않기 때문에 접근 및 수정이 빠르다.
```

<br />
<br />
<br />

1. 리액트의 Virtual DOM 활용 과정

```
리액트는 두 개의 가상 DOM 객체를 사용한다.
1)렌더링 이전의 가상 DOM과 2)렌더링 이후의 가상 DOM.

상태(state)가 변경될 때마다 새로운 가상 DOM이 생성되고,
이전 가상 DOM과 비교(diffing)하여 변경된 요소만 실제 DOM에 적용한다.

이 과정을 Reconciliation(재조정)이라고 하며,
Batch Update를 통해 여러 변경 사항을 한 번에 처리하여 효율성을 높인다.
```

<br />
<br />

2. 반복문을 사용할 때 key를 넣어주는 이유?

```
React는 각 요소에 고유한 key 값을 할당하여,
변경되지 않은 요소는 이전의 상태를 그대로 유지하면서 변경된 요소만 업데이트한다.
```
