# callback ref

<br />
<br />

* callback ref는 React에서 사용되는 특별한 형태의 ref이다.
---

```
일반적인 useRef와는 다르게,
DOM 노드가 마운트되거나 언마운트될 때,
알림을 받을 수 있는 기능을 제공한다.
```

<br />
<br />
<br />
<br />

1. 예시

```
HTML 태그에 ref를 넣는 거는

(node) => {
  ref.current = node;
}

이런 함수를 넣는것과 같다.
이런 ref를 callback ref라고 한다.
```

```tsx
export default function Example() {
  const ref = useRef();
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count => count + 1);
  };

  retunr (
    <>
      <input
        ref={(node) => {
          ref.current = node;
        }}
      />
      <button onClick={onClick}>버튼</button>
    </>
  )
}
```

<br />
<br />
<br />

2. 예시 2

```
보통 컴포넌트가 렌더링 되고 Focus를 주기 위해 useEffect를 사용하는데,
불필요한 useEffect를 줄일 수 있다.
```

```tsx
export default function Example() {
  const ref = useRef();
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count => count + 1);
  };

  retunr (
    <>
      <input
        ref={(node) => {
          ref.current = node;
          ref.current?.focus();
        }}
      />
      <button onClick={onClick}>버튼</button>
    </>
  )
}
```

```
다만 이 함수의 가장 큰 문제점은
컴포넌트가 리렌더링 될 때 함께 재실행 된다는 점이다.
```

<br />
<br />
<br />

3. 예시 3

```
그럴 때 해결 방법으로,
useCallback()을 사용하는것이다.

그러면 필요할 때만 이 함수가 실행되게끔 만들 수 있다.
```

```tsx
export default function Example() {
  const ref = useRef();
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count => count + 1);
  };

  retunr (
    <>
      <input
        ref={useCallback((node) => {
          ref.current = node;
          ref.current?.focus();
        }, [])} // Dependency array의 특정 값을 넣으면, 해당 값이 변할때마다 실행된다.
      />
      <button onClick={onClick}>버튼</button>
    </>
  )
}
```

<br />
<br />
<br />

4. 예시 4

```
useEffect와 callback ref중에 실행 순서는,

1) callbackRef
2) useEffect

위에 순서로 작동된다.

useEffect로 focus를 주면 안 좋은 이유는,
예를 들어 상태 값을 기준으로 focus를 준다면?
```

```tsx
export default function Example() {
  const ref = useRef();
  const [show, setShow] = useState(false);

  const onClick = () => {
    console.log('click');
    setShow(prev => !prev);
  }

  const callbackRef = () => useCallback((node)=> {
    console.log("ref ", node);
    ref.current = node;
  }, []);

  retunr (
    <>
      {show && <input ref={callbackRef} />}
      <button onClick={onClick}>버튼</button>
    </>
  )
}
```

```
show가 false일 때, useEffect를 사용했다면
focus를 바로 줄 수 없다.

안정적인 부분을 봤을 때는 직접 ref를 심어놓는 게 좋다.
(물론 useEffect도 상태가 바뀌면 리 렌더링 되기 때문에
focus가 작동하긴 한다.)
```

<br />
<br />
<br />

5. 예시 5

```
callback ref를 사용해도 show가 false로 변하면,
ref의 current의 값은 대상을 잃고 null이 된다.

하지만 리액트 18.3 버전부터는
클린업이 추가되었기 때문에 함수를 넣어두면,
node에 값이 null이 아닌 clean up 함수를 사용한다.

show가 false로 상태 값이 변해 input이 사라질 때,
어떤 동작을 할지 선택할 수 있게 된 것이다.
```

```tsx
export default function Example() {
  const ref = useRef();
  const [show, setShow] = useState(false);

  const onClick = () => {
    console.log('click');
    setShow(prev => !prev);
  }

  const callbackRef = () => useCallback((node)=> {
    console.log("ref ", node);
    ref.current = node;

    // 리액트 18.3 버전 이후
    return (
      console.log('clean up ', node);
    );
  }, []);

  retunr (
    <>
      {show && <input ref={callbackRef} />}
      <button onClick={onClick}>버튼</button>
    </>
  )
}
```

```
다만 show의 상태가 true가 되어
input이 다시 생길 때도 clean up 함수가 호출된다는 걸
꼭 알고 있자.
```
