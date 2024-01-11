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

<br/>

3. map 
```javascript
const result = hobbies.map(element => `${element}!`); /* 기존 배열값을 가공하여 새로운 배열을 리턴한다. */
console.log(result); /* 모든 원소값에 !가 붙어있는 새로운 배열 */

const result = hobbies.map(element => ({})); /* 객체로 만들어 값을 리턴하고 싶다면 중괄호를 소괄호로 감싸 함수 본문 내용이 아닌 객체임을 알려준다. */ 
```
map 활용 테스트 문제
```
여러분이 해야 할 작업은 숫자 목록을 자바스크립트 객체 목록으로 변환하는transformToObjects() 함수에 빠진 로직을 추가하는 것입니다.
새로 반환되는 배열에서, 모든 객체는 val키와 입력 배열의 숫자를 값으로 가져야 합니다.
예를 들어, [1, 2, 3] 이 입력된 경우,  transformToObjects([1, 2, 3]) 함수는 [{val: 1}, {val: 2}, {val: 3}]을 변환해야 합니다.
```
정답: 
```javascript
function transformToObjects(numberArray) {
  const result = numberArray.map(element=>({val: element}));
  return result;
}
```

<br/>

4. filter
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = numbers.filter(number => { /* 짝수만 걸러내기 */
  return number % 2 === 0;
});
console.log(evenNumbers);
```
