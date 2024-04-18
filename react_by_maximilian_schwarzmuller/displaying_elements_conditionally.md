# 조건에 따라 요소를 표시하는 여러가지 방법

<br />

```
리액트에서 많이 사용하는,
조건문에 따른 요소를 표시하는 방법이다.
정답은 없으니 본인이 편한 방법을 사용하면 된다.
```

<br /><br />

1. AND 연산자 사용
```javascript
/* check가 트루라면 요소를 보여준다. */
{ check && <p>true</p> }
```

<br /><br />

2. 삼항연산자 사용(1)
```javascript
/* check가 트루라면 true 아니면 false를 보여준다. */
{ check : <p>true</p> ? <p>false</p> }
```

<br /><br />

3. 삼항연산자 사용(2)
```javascript
/* boolean 타입 외에 타입에 사용 */
{ check === true : <p>true</p> ? <p>false</p> }
```

<br /><br />

4. null 사용
```javascript
const showElement = false;

return (
  /* JSX에서는 null을 표시하지 않는다. */
  { showElement ? <p>This element is visible</p> : null }
)
```

<br /><br />

* 참고
```javascript
{val ? (
  <p>true</p>
) : (
  <p>false</p>
)}
/* 이런 식으로 중괄호를 넣어주면 가독성이 향상된다. */
```
