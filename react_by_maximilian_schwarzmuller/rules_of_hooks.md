# 리액트 훅의 가장 기본적인 규칙

<br />

1. 컴포넌트 함수 안에서 호출해야 한다.

ex O)
```javascript
function App() {
  const [val, setVal] = useState(0);
}
```
ex X)
```javascript
const [val, setVal] = useState(0);
function App() { ... }
```

<br /><br />

2. 컴포넌트 함수의 최상위에서 호출해야 한다.

ex O)
```javascript
function App() {
  const [val, setVal] = useState(0);
}
```
ex X)
```javascript
function App() {
  if ( ... ) {
    const [val, setVal] = useState(0);
    /* 조건문, 반복문 안에서 호출도 안 된다. */
  }
}
```
