# useState의 조건을 넣어보자.

<br /><br />

```
useState는 상태 값을 업데이트할 때 Setter 역할을 하는 함수를 통해
이전 상태 값을 받아 새로운 상태 값을 반환하는 방식으로 작동한다.

Setter로 사용되는 함수의 첫 번째 파라미터는 현재의 상태를 반환한다.
```

<br /><br /><br />

* 예시
---

```jsx
const [time, setTime] = useState(0);

setTime(prevTime => { // 첫번째 파라미터 현재 상태를 반환한다.
  let newTime;
  if (prevTime >= 12) {
    newTime = 1;
  } else {
    newTime = time + 1;
  }
  setTime(newTime);
};
```
