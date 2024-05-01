# useState의 조건을 넣어보자.

<br />

```
useState는 상태 값을 업데이트할 때 함수를 통해 이전 상태 값을 받아 새로운 상태 값을 반환하는 방식으로 작동한다.
즉, 콜백 함수로 값을 설정할 때도 같은 개념이 적용된다.
```

```javascript
const [time, setTime] = useState(0);

setTime(prevTime => {
  let newTime;
  if (prevTime >= 12) {
    newTime = 1;
  } else {
    newTime = time + 1;
  }
  setTime(newTime);
};
```
```
예를 들면 위와 같이 조건을 넣을 수도 있다.
```
