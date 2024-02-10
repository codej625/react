# 배열 메서드를 알아보자!

<br />

##### 설명
```
map()
배열 내의 각 요소에 대해 주어진 함수를 호출한 결과를 모아서 새로운 배열을 반환한다.
기존 배열을 변경하지 않고 새로운 배열을 생성한다.
```
```
find()
주어진 판별 함수를 만족하는 배열의 첫 번째 요소의 값을 반환한다.
만족하는 요소가 없으면 undefined를 반환한다.
```
```
findIndex()
주어진 판별 함수를 만족하는 배열의 첫 번째 요소의 인덱스를 반환한다.
만족하는 요소가 없으면 -1을 반환한다.
```
```
filter()
주어진 함수로 필터링한 결과를 모아서 새로운 배열을 반환한다.
함수의 반환값이 true인 요소만 선택된다.
```
```
reduce()
배열의 각 요소에 대해 주어진 리듀서 함수를 실행하여 하나의 결과값을 반환한다.
리듀서 함수는 누적값과 현재 요소를 인수로 받는다.
```
```
concat()
기존 배열에 하나 이상의 배열 또는 값들을 합쳐서 새로운 배열을 반환한다.
기존 배열을 변경하지 않고 새로운 배열을 생성한다.
```
```
slice() 배열의 일부분을 선택하여 새로운 배열을 반환한다.
시작 인덱스부터 끝 인덱스 전까지의 요소를 선택한다.
기존 배열을 변경하지 않고 새로운 배열을 생성한다.
```
```
splice()
배열의 요소를 추가하거나 삭제하고, 필요한 경우 요소를 교체하여 기존 배열을 변경한다.
시작 인덱스부터 제거할 요소의 개수를 지정하고, 선택적으로 새로운 요소를 추가할 수 있다.
```

<br />

##### 예시
```javascript
/* map() */
const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(num => num * 2); /* 각 요소를 두 배로 변환한 새로운 배열을 생성한다. */
console.log(doubledNumbers); /* [2, 4, 6, 8, 10] */
```
```javascript
/* find() */
const numbers = [1, 2, 3, 4, 5];
const foundNumber = numbers.find(num => num > 3); /* 3보다 큰 첫 번째 요소를 찾는다. */
console.log(foundNumber); /* 4 */
```
```javascript
/* findIndex() */
const numbers = [1, 2, 3, 4, 5];
const foundIndex = numbers.findIndex(num => num > 3); /* 3보다 큰 첫 번째 요소의 인덱스를 찾는다. */
console.log(foundIndex); /* 3 */
```
```javascript
/* filter() */
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0); /* 짝수만 필터링하여 새로운 배열을 생성한다. */
console.log(evenNumbers); /* [2, 4] */
```
```javascript
/* reduce() */
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, cur) => acc + cur, 0); /* 모든 요소를 누적하여 합산한다. */
console.log(sum); /* 15 */
```
```javascript
/* concat() */
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = arr1.concat(arr2); /* 두 배열을 합쳐서 새로운 배열을 생성한다. */
console.log(combinedArray); /* [1, 2, 3, 4, 5, 6] */
```
```javascript
/* slice() */
const numbers = [1, 2, 3, 4, 5];
const slicedArray = numbers.slice(1, 4); /* 인덱스 1부터 4 이전까지의 요소를 선택하여 새로운 배열을 생성한다. */
console.log(slicedArray); /* [2, 3, 4] */
```
```javascript
/* splice() */
const numbers = [1, 2, 3, 4, 5];
const removedElements = numbers.splice(1, 2); /* 인덱스 1부터 2개의 요소를 제거하고, 제거된 요소들을 반환한다. */
console.log(removedElements); /* [2, 3], numbers 배열은 이제 [1, 4, 5] */
```
