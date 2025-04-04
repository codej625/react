# 상태 끌어올리기와 상태 그룹화

<br />
<br />

* 리액트에서 사용하면 좋은 스킬들
---

```
리액트에서 state를 만들다 보면
리 렌더링 최적화하는 게 쉽지 않다.

이럴 때 사용하는 상태에 관련된 스킬들을 알아보자.
```

<br />
<br />
<br />
<br />

1. 상태 끌어올리기 (Lifting State Up)

```
상태 끌어올리기는 하위 컴포넌트에서 관리하던 상태를 상위 컴포넌트로 이동시켜,
여러 컴포넌트가 해당 상태를 공유하거나 조작할 수 있게 하는 기법이다.

리액트는 단방향 데이터 흐름을 따르기 때문에,
공통 부모 컴포넌트에서 상태를 관리하고 이를 props로 하위 컴포넌트에 전달한다.
```

```tsx
import { useState } from "react";

// 하위 컴포넌트 1
const InputA = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

// 하위 컴포넌트 2
const InputB = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

// 상위 컴포넌트
const ParentComponent = () => {
  const [sharedValue, setSharedValue] = useState("");

  const handleChange = (e) => setSharedValue(e.target.value);

  return (
    <div>
      <InputA value={sharedValue} onChange={handleChange} />
      <InputB value={sharedValue} onChange={handleChange} />
    </div>
  );
};

export default ParentComponent;
```

<br />

```
sharedValue 상태를 ParentComponent에서 관리하고, InputA와 InputB가 이를 공유한다.

한쪽에서 값이 변경되면 다른 쪽도 즉시 반영된다.

컴포넌트 계층이 깊어지면 props drilling(깊은 props 전달)이 발생할 수 있기에,
Context API나 Redux 같은 전역 상태 관리 도구로 대체되기도 한다.
```

<br />
<br />
<br />

2. 상태 그룹화 (State Grouping)

```
상태 그룹화는 여러 개의 관련된 상태를 하나의 객체로 묶거나,
논리적으로 연관된 상태를 함께 관리하는 방식을 의미한다.

명시적인 용어는 아니지만,
실무에서 상태를 구조화(structured state)하거나 관련 상태를 묶는 패턴으로 사용한다.

상태가 많아지거나, 상태 간 의존성이 있을 때,
복잡한 폼 데이터나 상호작용이 많은 UI에서 유용하다.
```

```tsx
import { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormComponent;
```
