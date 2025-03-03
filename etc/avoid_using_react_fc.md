# Avoid using React.FC

<br />
<br />

* React.FC?
---

```
Function Component 타입의 줄임말로,
React + Typescript 조합으로 개발할 때 사용하는 타입이다.

함수형 컴포넌트 사용 시 타입 선언에 쓸 수 있도록 React에서 제공하는 타입이다.

그럼 어떤 문제가 있어서 사용을 지양하라는 건지 알아보자.
```

<br />
<br />
<br />
<br />

1. `문제`

```
타입스크립트를 이용해서 리액트로 작업을 하다보면,
아래의 형태로 작업을 하는 경우가 많다.
```

```ts
import React from 'react';

type GreetingsProps = {
  name: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
);

export default Greetings;
```

```
React.FC를 사용하는 경우에는 다음과 같이 props의 타입을 Generics으로 넣어서 사용하는데,
하지만 이렇게 React.FC로 타입을 지정하는 것을 지양하는 이유는 대표적으로 children 때문이다.
```

<br />
<br />
<br />


2. `예시`

```
React.FC를 사용하면 props에 기본적으로,
children이 들어가 있다는 것을 확인할 수 있다.
```

```ts
// React.FC 사용
export const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello {name}</h1>
}

const App = () => (
  <>
    <Greeting name="Stefan">
      <span>{"I can set this element but it doesn't do anything"}</span> // children 전달
    </Greeting>
  </>
)
```

```
이점을 장점이라고 생각할 수도 있는 부분이지만, 하지만 타입스크립트를 쓰는 이유중 하나가
정확한 타입을 지정을 해주면서 자바스크립트 코드의 안전성을 향상 시키는 부분이다.

FC를 사용하면 컴포넌트에 children이 있을 수 있다는 것을 가정하여,
언제든지 children의 타입 지정 없이 전달이 가능하기 때문에 타입이 명확하지 않다는 단점이 있다.
```
