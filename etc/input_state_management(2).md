# input 상태 관리

<br />
<br />

* 리액트에서 여러개의 input을 관리해보자.

---

```
리액트에서는 하나의 input이던
여러 개의 input이든 하나의 상태를 사용해서
관리할 수 있다.

밑에서 예시를 살펴보자.
```

<br />
<br />
<br />
<br />

```javascript
import React, { useState } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

<br/>

```
리액트 상태에서 객체를 수정해야 할 때에는,
이런식으로 직접 수정하면 안된다.

밑에는 잘못된 예시이다.
```

```js
inputs[name] = value; (X)

// 상태가 업데이트되지 않으므로 리렌더링이 발생하지 않는다.
```

<br/>

```js
// 새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 한다.

setInputs({
  ...inputs,
  [name]: value
});
```

```
여기서 사용한 ... 문법은 spread 문법이다.
객체의 내용을 모두 펼쳐서 기존 객체를 복사한다.
이러한 작업을, "불변성을 지킨다" 라고 하고, 
불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트가 됐음을 감지 할 수 있고 이에 따라 필요한 리렌더링이 진행된다. 
만약에 inputs[name] = value 이런식으로 기존 상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다.
```

<br/>

```
추가로

[name]: value 부분은 Computed Property Names(계산된 속성 이름)라는 JavaScript의 문법이다. 
이것은 객체의 속성 이름을 동적으로 설정할 수 있게 해준다.
예를 들어, 만약 <input> 요소에서 name 속성의 값이 "codej625"이라면, name 변수의 값은 "codej625"이 된다.
만약 name 속성이 "nickname"이라면, { "nickname": value }와 같이 생성된다.

이렇게 함으로써 여러 개의 입력 필드에서 이벤트 핸들러를 하나의 함수로 관리하면서, 해당 입력 필드의 이름을 기반으로 상태를 업데이트할 수 있게 된다.
```
