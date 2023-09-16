# 여러개의 input 상태 관리해보자!

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
리액트 상태에서 객체를 수정해야 할 때에는, 이런식으로 직접 수정하면 안된다.
밑에는 잘못된 예시이다.
```
```javascript
inputs[name] = value;
```

<br/>

```
새로운 객체를 만들어서 새로운 객체에 변화를 주고, 이를 상태로 사용해주어야 한다.
```
```javascript
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