# props에 대해 알아보자!

```
props 는 properties 의 줄임말이다. 
어떠한 값을 컴포넌트에게 전달해줘야 할 때, props 를 사용한다.
```
<br/>

### props의 기본 사용법
ex) App 컴포넌트에서 Hello 컴포넌트를 사용 할 때 name 이라는 값을 전달해주고 싶다고 가정해보자.
```
App.js

import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;
```
```
Hello.js

import React from 'react';

function Hello(props) {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```

<br/>

```
컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다. 
props 는 객체 형태로 전달되며, 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 된다.
```

<br/>

### 여러개의 props, 비구조화 할당
ex) Hello 컴포넌트에 또 다른 props 를 전달해보자. (color 라는 값을 추가)
```
App.js

import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <Hello name="react" color="red"/>
  );
}

export default App;
```
```
Hello 컴포넌트에서 color 값을 조회해서 폰트의 색상으로 설정을 해보자.

import React from 'react';

function Hello(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
```

<br/>

```
props 내부의 값을 조회 할 때마다 props. 를 입력하고 있지만, 
함수의 파라미터에서 비구조화 할당 (혹은 구조 분해라고도 불린다.) 문법을 사용하면 조금 더 코드를 간결하게 작성 할 수 있다.
```
ex)
```
Hello.js

import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```

<br/>

### defaultProps 로 기본값 설정
ex) 컴포넌트에 props 를 지정하지 않았을 때 기본적으로 사용 할 값을 설정하고 싶다면 컴포넌트에 defaultProps 라는 값을 설정하면 된다.
```
Hello.js

import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

```
App 에서 name 이 없는 Hello 컴포넌트를 렌더링해보자

import React from 'react';
import Hello from './Hello';

function App() {
  return (
    <>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </>
  );
}

export default App;
```

<br/>

### props.children
```
props.children은 컴포넌트(Components) 간에 데이터나 요소를 전달할 때 사용되는 특별한 props이다. 
이 props를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터나 JSX 요소를 전달할 수 있다. 
props.children은 자식 컴포넌트가 부모 컴포넌트에서 래핑(Wrapper) 없이 내용을 포함하고 있는지 확인할 때 주로 사용된다.
```
```
Wrapper.js

import React from 'react';

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
App.js

import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red"/>
      <Hello color="pink"/>
    </Wrapper>
  );
}

export default App;
```