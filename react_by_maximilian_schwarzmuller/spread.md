# spread 문법에 대해 알아보자!

<br />

```
스프레드 문법은 객체나 배열앞에 ...을 붙여 모든 원소를 나열한다.
병합을 할때 주로 활용한다.
```

```javascript
const hobbies = ['sports', 'cooking'];
const newHobbies = ['english'];

/* Merge arrays */
const mergeHobbies = [...hobbies, ...newHobbies];
console.log('mergeHobbies => ', mergeHobbies); /* 두 배열이 병합 되었다. */
```

<br />

```javascript
const user = {
  name: 'codej625',
  age: 34
};
const extendedUser = {
  isBool: true,
  ...user
};

/* Merge objects */
console.log('extendedUser => ', extendedUser);
```
