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
