# 비구화 할당을 해보자!

<br/>

```javascript
const userNameData = ['lee', 'jinwoo'];

const firstName = userNameData[0];
const lastName = userNameData[1];
console.log(firstName, lastName);
/* 배열을 사용하려면 위와 같이 인덱스를 지정해줘야 한다. */

const [firstName, lastName] = ['lee', 'jinwoo'];
console.log(firstName, lastName);
/* 하지만 비구조화 할당을 통해 인덱스를 순서대로 한번에 받을 수 있다. */

/* 물론 객체도 가능하다. */
const {firstName, lastName} = {
  firstName: 'lee',
  lastName: 'jinwoo'
};
console.log(firstName, lastName);

/* 객체는 정의된 프로퍼티 이름을 가져오기 때문에 변경하고 싶다면 콜론을 사용해서 별칭을 지어준다.  */
const {firstName: 첫번째이름, lastName: 두번째이름} = {
  firstName: 'lee',
  lastName: 'jinwoo'
};
console.log(첫번째이름, 두번째이름);
```
