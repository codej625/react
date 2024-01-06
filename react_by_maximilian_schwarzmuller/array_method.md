# 자바스크립트에 배열과 메소드를 알아보자!

<br/>

1. array 
```javascript
const hobbies = ['Sports', 'cooking', 'reading']; /* ,으로 값을 구분한다. */
console.log(hobbies[0]); /* index를 통해 값을 엑세스 한다. */

hobbies.push('working'); /* array에 값을 추가한다. */
console.log(hobbies); /* working이 추가 되었음을 확인 할 수 있다. */
```

<br/>

2. findIndex 
```javascript
const index = hobbies.findIndex((item) => { /* 특정 값의 index를 찾아주는 함수 */
  return item === 'Sports'; /* array에서 특정 값을 찾아내면 해당 index를 반환하고, 아니면 아무것도 하지 않는다. */
});
/* const index2 = hobbies.findIndex((item) => item === 'Sports'); 함축 버전 */
console.log(index); /* 0을 반환 한다. */
```
