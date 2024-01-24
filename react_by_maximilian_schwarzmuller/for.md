# for문을 알아보자!

<br />

```
일반적인 for문은 많이 사용해봤으니
for of문과 for in문을 활용해보자!
```

<br />

```
for of문은 기본적으로 iterable 속성을 가지고 있어야 사용이 가능하다.
```
```javascript
const hobbies = ['sports', 'cooking'];

for (const hobby of hobbies) {
  console.log('hobby => ', hobby);
}
```

<br />

```
for in문은 객체의 모든 열거 가능한 속성에 대해 반복이 가능하다.
```
```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
};

for (const prop in obj) {
  console.log('prop => ', prop);
}
```
