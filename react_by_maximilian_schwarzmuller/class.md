# 자바스크립트의 class를 알아보자!

<br />

##### 기본적인 형태
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

/* 클래스를 인스턴스화하여 객체 생성 */
const person1 = new Person('Alice', 30);
const person2 = new Person('Bob', 25);

person1.greet(); /* Hello, my name is Alice and I am 30 years old. */
person2.greet(); /* Hello, my name is Bob and I am 25 years old. */
```

```
자바스크립트의 클래스에서는 constructor 메서드 내에서 this 키워드를 사용하여 멤버 변수를 정의한다. 
이는 생성자를 통해 객체를 초기화하는 과정에서 멤버 변수를 설정하는 방식이다.
```

<br />

##### 객체를 json으로 변환
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person('Alice', 30);

/* 객체를 JSON 문자열로 변환 */
const jsonPerson = JSON.stringify(person);
console.log(jsonPerson); /* {"name":"Alice","age":30} */
/* 여기서 메서드는 있어도 무시 된다. */
```

##### 객체로 다시 변환
```javascript
/* ex) */
const jsonString = '{"name":"Bob","age":25}';

/* JSON 문자열을 객체로 변환 */
const parsedPerson = JSON.parse(jsonString);
console.log(parsedPerson); /* { name: 'Bob', age: 25 } */
/* 여기서 메서드는 있어도 무시 된다. */
```

<br />

##### 자바의 유사 빌더패턴 구현 
```javascript
class PersonBuilder {
  constructor(name) {
    this.name = name;
    this.age = null;
    this.gender = null;
  }

  setAge(age) {
    this.age = age;
    return this; /* 체이닝을 위해 this를 반환 */
  }

  setGender(gender) {
    this.gender = gender;
    return this; /* 체이닝을 위해 this를 반환 */
  }

  build() {
    return new Person(this.name, this.age, this.gender);
  }
}

class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

/* 빌더를 사용하여 객체를 생성 */
const person = new PersonBuilder('Alice')
  .setAge(30)
  .setGender('female')
  .build();

console.log(person.name); // "Alice"
console.log(person.age); // 30
console.log(person.gender); // "female"
```
