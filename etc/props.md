# React Props

<br/>
<br/>

* Props
---

```
props 는 properties 의 줄임말이다.
어떠한 값을 컴포넌트에게 전달해줘야 할 때, props 를 사용한다.
```

<br/>
<br/>
<br/>
<br/>

1. props의 기본 사용법

```
"App" 이라는 컴포넌트에서 Hello 컴포넌트로 "name" 이라는 값(props)을
전달한다고 가정
```

```js
// App.js

import Hello from './Hello';

function App() {
  return (
    <Hello name="codej625" />
  );
}

export default App;
```

```js
// Hello.js

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```

```
컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다.
(이름이 없다면 Index로 접근)
props 는 객체 형태로 전달되며, 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 된다.
```

<br/>
<br/>
<br/>

2. 여러개의 props 전달 (비구조화 할당)

```
App 컴포넌트에서 Hello 컴포넌트에 한 가지 이상 props 전달하기
("color" 라는 props 추가)
```

```js
// App.js

import Hello from './Hello';

function App() {
  return (
    <Hello name="codej625" color="red"/>
  );
}

export default App;
```

```js
// Hello

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
```

<br/>

```
비구조화 할당 (혹은 구조 분해라고도 불린다.) 문법을 사용하면,
조금 더 코드를 간결하게 작성 할 수 있다.
```

```js
// Hello.js

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```

<br/>
<br/>
<br/>

3. defaultProps 로 기본값 설정

```
전달할 props의 기본적으로 사용할 값을 설정하고 싶다면,
컴포넌트에 defaultProps 라는 값을 설정하면 된다.
```

```js
// Hello.js

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

```js
// App.js

import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="" color="red"/>
    </>
  );
}

export default App;
```

<br/>
<br/>
<br/>

4. props.children

```
props.children은 컴포넌트 간에 "데이터"나 "요소"를 전달할 때 사용되는 특별한 props이다.

이 props를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터나 JSX 요소를 전달할 수 있다.

props.children은 자식 컴포넌트가 부모 컴포넌트에서 래핑(Wrapper) 없이 내용을 포함하고 있는지 확인할 때 주로 사용된다.
```

```js
// Wrapper.js

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };

  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Wrapper;
```

```
// App.js

import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="codej625" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
```
