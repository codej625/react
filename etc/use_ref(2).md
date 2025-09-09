# useRef 활용

<br />
<br />

* Ref를 조금 더 활용해 보자

---

```
Ref는 단일 값을 넣거나 DOM과 연결하는 것뿐만 아니라,
객체나 Map을 넣어 활용이 가능하다.
```

<br/>
<br/>
<br/>
<br/>

`활용 예시`

```tsx
import React, { useRef, useEffect, useState } from 'react';

// 값의 타입 정의
interface Item {
  id: number;
  name: string;
}

const Test = () => {
  // useRef에 Map 타입 명시
  const mapRef = useRef<Map<string, Item>>(new Map<string, Item>());

  // 키 존재 여부를 UI에 표시하기 위한 상태
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    // Map에 데이터 추가 (객체 대신 Map 사용)
    mapRef.current.set('item1', { id: 1, name: 'Apple' });
    mapRef.current.set('item2', { id: 2, name: 'Banana' });

    // Map 데이터 접근 및 콘솔 출력
    console.log(mapRef.current.get('item1')?.name); // 'Apple'
    console.log(mapRef.current.get('item2')?.id); // 2

    // 키 존재 여부 확인
    const keyExists = mapRef.current.has('item1');
    setHasKey(keyExists); // UI 업데이트를 위해 상태 설정

    console.log(`Does 'item1' exist? ${keyExists}`); // true
  }, []);

  return (
    <div>
      <p>Item1 Name: {mapRef.current.get('item1')?.name || 'Not set'}</p>
      <p>Item2 ID: {mapRef.current.get('item2')?.id || 'Not set'}</p>
      <p>Is 'item1' in Map? {hasKey ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Test;
```

<br />
<br />

```
위의 예시를 보면 일반 변수를 사용하는 것과 무슨 차이일까 싶을 수 있다.

seRef를 사용하는 이유는 React의 렌더링 메커니즘과 변수의 생명주기 관리 방식에 있다.
```

```
1) 일반 변수는 리렌더링 시 초기화 - useRef는 컴포넌트 생명주기 동안 값을 유지한다.

2) 리렌더링 트리거 없이 값 변경 - useState는 값 변경 시 리렌더링을 유발하지만,
   useRef는 .current를 변경해도 리렌더링이 발생하지 않음.

3) DOM 요소 참조 - useRef는 DOM 요소에 접근할 때 자주 사용 (input 포커스 등..)
```
