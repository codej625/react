# Hook들을 배치하는 일반적인 관례

<br />
<br />

* Hook들을 배치하는 가장 적합한 위치?
---

```
useState와 useEffect를 포함한 모든 React Hook은
React의 Hooks 규칙 (Rules of Hooks)을 따라야 하므로,
함수 컴포넌트의 최상위 레벨에서만 호출해야 한다.

즉, 반복문, 조건문, 중첩된 함수 안에서는 호출하면 안 된다.

이 규칙을 지킨다는 전제 하에,
컴포넌트 내부에서 useState와 useEffect를 포함한 Hook들을 배치하는
일반적인 관례 및 가장 적합한 위치가 있다.

밑에서 상세하게 알아보자.
```

<br />
<br />
<br />
<br />

1. 컴포넌트 함수 본문의 시작 부분

```
모든 Hook 호출은 컴포넌트 함수의 시작 부분,
즉 return 문 이전에 와야 한다.
```

<br />
<br />
<br />

2. 다른 변수 선언이나 로직보다 먼저

```
useState, useEffect 등 Hook 호출은 컴포넌트 상태나 효과를 설정하는 가장 기본적인 부분이므로,
일반적으로 컴포넌트 내부에서 필요한 다른 변수를 선언하거나 복잡한 로직을 수행하기 전에 배치한다.
```

<br />
<br />
<br />

3. Hook 종류별 그룹화 (권장)

```
가독성을 위해 비슷한 종류의 Hook들을 함께 묶는 것이 좋다.
흔히 사용되는 순서는 다음과 같다.
```

<br />

`순서`

```
1) State Hooks (useState): 컴포넌트의 상태 변수를 선언하는 부분들을 모은다.

2) Context Hooks (useContext): 컨텍스트를 사용하는 부분들을 모은다.

3) Ref Hooks (useRef): Ref를 사용하는 부분들을 모은다.

4) Effect Hooks (useEffect, useLayoutEffect): 사이드 이펙트를 처리하는 부분들을 모은다.

5) Other Hooks (useReducer, 커스텀 훅 등): 그 외의 훅들을 배치한다.
```

<br />

`요약`

```
1) 컴포넌트 함수 시작

2) useState 그룹

3) useEffect 그룹

4) 다른 변수, 핸들러 함수, 로직

5) return (JSX or TSX)
```

```tsx
// 예시 코드

import React, { useState, useEffect, useRef } from 'react';

// data 상태의 형태를 정의하는 인터페이스
interface FetchedData {
  message: string;
}

const ExComponent = () => {
  // 1. State Hooks 그룹 (타입 명시)
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // data는 FetchedData 형태이거나 null일 수 있음을 union type으로 명시
  const [data, setData] = useState<FetchedData | null>(null);

  // 2. Ref Hooks 그룹 (HTMLElement 또는 null이 될 수 있음을 명시)
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 3. Effect Hooks 그룹
  useEffect(() => {
    // 컴포넌트 마운트 시 데이터를 불러오는 효과
    // async 함수에 반환 타입 명시
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: FetchedData = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // 클린업 함수
    };
  }, []);

  useEffect(() => {
    // count 값이 변경될 때마다 실행되는 효과
    document.title = `Count: ${count}`;
  }, [count]);

  // 4. 그 외 변수, 핸들러 함수, 로직
  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  // 5. return (TSX)
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        data && <p>Data loaded: {data.message}</p>
      )}

      <input type="text" ref={inputRef} placeholder="Type something..." />
    </div>
  );
}

export default ExComponent;
```
