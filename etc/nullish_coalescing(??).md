# Nullish coalescing

<br /><br />

```
Nullish coalescing을 활용하여,
Component props 값이 null이나 undefined 인지 체크하는 예시
```

<br /><br /><br />

```jsx
const Greeting = ({ message }) => {
  const displayMessage = message ?? 'Hello';

  return <h1>{displayMessage}</h1>
}
```
