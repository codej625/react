# 리액트에서 자주 사용하는 메서드와 연산자를 알아보자.

<br />
<br />

* 리액트의 내장 함수들(메서드)
---

```
리액트에서는 다양한 연산자와 메서드들이 있는데, 
특히 배열을 위한 메서드가 굉장히 많다.

많이 사용되는 메서드와 사용 방법을 알아보자.
```

<br />
<br />
<br />
<br />

1. spread (전개) 연산자

```
JavaScript의 전개 연산자인 spread operator는
배열이나 객체를 확장하여 그 안의 요소를 개별적으로 추출하는 데 사용된다.
(깊은 복사가 가능하다.)
```

```javascript
// 배열 복사하기
var arr1 = [1, 2, 3];
var arr2 = [...arr1]; // arr1을 복사하여 새로운 배열을 생성
console.log(arr2); // [1, 2, 3]

// 배열 합치기
var arr3 = [4, 5, 6];
var combinedArray = [...arr1, ...arr3]; // 두 배열을 합쳐서 새로운 배열 생성
console.log(combinedArray); // [1, 2, 3, 4, 5, 6]

// 배열에 요소 추가하기
var arr4 = [0, ...arr1]; // arr1 배열의 요소를 포함하여 새로운 요소 추가
console.log(arr4); // [0, 1, 2, 3]

// 배열의 일부 요소 변경하기
var modifiedArray = [...arr1.slice(0, 1), 10, ...arr1.slice(2)]; // 두 번째 요소를 변경하여 새로운 배열 생성 
console.log(modifiedArray); [1, 10, 3]
```

<br />
<br />
<br />

2. concat (추가)

```
배열의 요소를 결합하여 새로운 배열을 반환한다.

원본 배열을 변경하지 않고 새로운 배열을 생성한다.
```

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const result = arr1.concat(arr2);
console.log(result); // [1, 2, 3, 4, 5, 6]

// 여러 개의 배열을 결합하는 예제
const arr3 = [7, 8, 9];
const result = arr1.concat(arr2, arr3);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br />
<br />
<br />

3. filter 걸러내기(삭제시 사용)

```
filter 메서드는 주어진 함수의 조건을 만족하는요소들로 이루어진 새로운 배열을 생성한다.
(조건을 충족하는 요소만 남겨놓기)
```

```javascript
// 숫자 배열에서 짝수만 필터링하는 예제
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evenNumbers); // 2, 4, 6

// 문자열 배열에서 길이가 5 이상인 문자열만 필터링하는 예제
const words = ["apple", "banana", "orange", "strawberry", "kiwi"];
const longWords = words.filter(function(word) {
  return word.length >= 5;
});
console.log(longWords); // ["banana", "orange", "strawberry"]
```

<br />
<br />
<br />

4. slice (잘라내기)

```
인덱스는 0부터 시작하며,
첫 번째 매개변수는 추출을 시작할 인덱스이고,
두 번째 매개변수는 추출을 종료할 인덱스이다.
(종료 인덱스는 포함하지 않음)
```

```javascript
const array = [1, 2, 3, 4, 5];
const newArray = array.slice(1, 4);
console.log(newArray); // 2, 3, 4

const array = [1, 2, 3, 4, 5];
const newArray = array.slice(-3);
console.log(newArray); // 3, 4, 5
```

<br />
<br />
<br />

5. map (반복)

```
배열의 각 요소에 대해 주어진 함수를 호출하고,
그 함수가 반환하는 값을 모아서 새로운 배열을 생성한다.
```

```javascript
// 각 요소의 제곱을 계산하여 새로운 배열을 생성하는 예제
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(function(num) {
  return num * num;
});
console.log(squaredNumbers); // [1, 4, 9, 16, 25]

// 각 문자열의 길이를 계산하여 새로운 배열을 생성하는 예제
const words = ["apple", "banana", "orange", "strawberry", "kiwi"];
const wordLengths = words.map(function(word) {
  return word.length;
});
console.log(wordLengths); // [5, 6, 6, 10, 4]
```
