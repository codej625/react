# Arrow Function에 대해 알아보자!

<br />

```
Arrow function은 JavaScript 환경에서함수를 생성하는 또 다른 방법이다.
더 짧은 구문 외에도 this 키워드의 범위를 유지하는데 있 이점을 제공한다.
```
```javascript
/* Arrow function 구문은 낯설게 보일 수 있으나 사실 간단하다. */

function callMe(name) { 
  console.log(name);
}

/* 또한 다음과 같이 작성할 수도 있다. */
const callMe = function(name) { 
  console.log(name);
}

/* arrow function을 사용하면 */
const callMe = (name) => { 
  console.log(name);
}
/* 혹은(파라미터가 하나라면) */
const callMe = name => { 
  console.log(name);
}
/* 이렇게 표현할 수 있다. */
```

<br />


##### 참고
```javascript
/* arguments가 없는 경우, 함수 선언시 빈 괄호를 사용해야 한다. */
const callMe = () => { 
    console.log('Max!');
}

/* 정확히 하나의 argument가 있는 경우, 괄호를 생략할 수 있다. */
const callMe = name => { 
    console.log(name);
}

/* 'value'를 return할 때, 다음과 같은 숏컷을 사용할 수 있다. */
const returnMe = name => name

이것은 다음과 같다.
const returnMe = name => { 
  return name;
}
```
