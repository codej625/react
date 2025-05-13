# key

<br />
<br />


* Key를 사용하는 이유
---

```
React에서 key는 심화 기능인 ref와 동일하게 특별하고 미리 지정된 prop이다.

key는 리스트 내의 형제(sibling) 엘리먼트들 사이에서 반드시 고유해야 한다.

React는 리스트를 렌더링할 때 key prop을 사용하여 각 엘리먼트를 고유하게 식별하는데,
이는 리스트가 업데이트될 때(항목 추가, 삭제, 순서 변경) 어떤 엘리먼트가 변경되었는지 효율적으로 파악하고,
최소한의 DOM 조작으로 UI를 업데이트하기 위함이다.
```

<br />
<br />
<br />
<br />

1. Array에 Key가 없다면?

```
데이터 원천 자체에서 고유하고 안정적인 ID를 제공하지 않는 상황에서 React 리스트에 사용할 고유 키를 생성해야 한다면,
일반적으로 UUID (Universally Unique Identifier)를 생성하여 데이터 항목에 추가하는 방식을 가장 많이 사용하고 권장한다.

이러한 UUID를 생성하기 위해 사용할 수 있는 라이브러리나 내장 API는 여러 가지가 있다.

가장 좋은 방법은 데이터를 처음 가져오거나 생성할 때 각 항목에 고유 ID를 할당하고,
이 값을 데이터와 함께 저장하여 리스트 렌더링 시 key로 사용하는 것이다.

렌더링할 때마다 매번 다른 ID를 생성하면 key의 안정성이 깨져 문제가 발생한다.
```

<br />


`nanoid 라이브러리 예시`

```ts
import { nanoid } from 'nanoid';

const processFetchedData = (data: DataItemWithoutId[]): DataItemWithId[] => {
  return data.map(item => ({
    ...item,
    id: nanoid() // nanoid로 짧은 ID 생성
  }));
};
// 사용 방식은 Web Crypto API 예시와 동일
```

<br />

```
ID는 리스트를 렌더링하는 .map() 호출 내부에서 생성하는 것이 아니라,
데이터를 준비하는 단계에서 각 항목에 부여되어야 한다.

부여된 ID는 데이터와 함께 저장되고, 이 값을 key prop으로 사용한다.
```

<br />
<br />
<br />

2. 컴포넌트 인스턴스 내에서 고유한 ID를 생성 시 (리스트 X)

```
1) label과 input 요소를 연결하기 위한 htmlFor 및 id 속성 값

2) 접근성 관련 aria-* 속성 값

3) CSS 또는 다른 목적으로 컴포넌트 내에서 고유한 식별자가 필요할 때
```

<br />

`useId 예시`

```tsx
// 잘못된 사용 예시
// items.map(item => {
//   const id = useId(); // 매 렌더링 시 다른 값일 수 있고, 데이터 항목과 무관
//   return <ListItem key={id} data={item} />;
// })

// 올바른 사용 예시
items.map(item => (
  // key는 데이터 항목의 고유 ID 사용
  <ListItem key={item.id} data={item} />
))

////////////////////////////////////////////////////////////////////////////////////

// ListItem 컴포넌트 내부에서의 useId 사용 예시
const ListItem = (data: DataItemWithId) => {
  const inputId = useId(); // 이 useId는 이 ListItem 컴포넌트 인스턴스 내에서만 유효하고 안정적
  const checkboxId = useId();

  return (
    <li>
      {data.name}
      <label htmlFor={inputId}>Enter Value:</label>
      <input id={inputId} type="text" />

      <input id={checkboxId} type="checkbox" />
      <label htmlFor={checkboxId}>Select</label>
    </li>
  );
};
```
