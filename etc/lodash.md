# Lodash

<br />
<br />

* Why Lodash?
---

```
Lodash는 배열, 숫자, 객체, 문자열 등과 같은 데이터 작업을 간편하게 만들어,
JavaScript를 더 쉽게 사용할 수 있게 해준다.

예시를 보면서 알아보자.
```

<br />
<br />
<br />
<br />

1. 중복 제거

```ts
import _ from 'lodash-es';

const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = _.uniq(numbers);

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
```

<br />
<br />
<br />

2. 배열의 값 정렬

```ts
import _ from 'lodash-es';

const numbers: number[] = [4, 2, 8, 6];
const sortedNumbers: number[] = _.sortBy(numbers);

console.log(sortedNumbers);  // [2, 4, 6, 8]
```

<br />
<br />
<br />

3. 배열의 합 계산

```ts
import _ from 'lodash-es';

const numbers: number[] = [1, 2, 3, 4];
const sum: number = _.sum(numbers);

console.log(sum);  // 10
```

<br />
<br />
<br />

4. 객체에서 특정 속성만 추출

```ts
import _ from 'lodash-es';

interface User {
  user: string;
  age: number;
}

const users: User[] = [
  { user: 'Alice', age: 25 },
  { user: 'Bob', age: 30 }
];
const names: string[] = _.map(users, 'user');

console.log(names);  // ['Alice', 'Bob']
```
