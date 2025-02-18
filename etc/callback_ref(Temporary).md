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

보통 컴포넌트가 렌더링 될 때 useEffect를 사용하는데,
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
        }}
      />
      <button onClick={onClick}>버튼</button>
    </>
  )
```
