# 객체를 배열처럼 사용해보자.

<br />
<br />

* 자바스크립트에서 객체는 반복문을 사용할 수 없을까?
---

```
종종 배열이 아닌 객체를 순회하면서
반복문을 사용하고 싶을 때가 있다.

간단하게 map() 메서드를 사용하는 방법을 알아보자.
```

<br />
<br />
<br />
<br />

1. map() 사용 예시

```
객체의 값들 중 null이나 undefined 값이 있을 때,
해결하는 예시이다.

대부분 이를 활용하면 해결할 수 있을 것이다.
```

```tsx
// 삼항 연산자와 옵셔널 체이닝을 사용한 방어 로직
const detailData: RowData = data?.rows ? data.rows[0] : {};

// 렌더링이 끝나면 작동
useEffect(() => {
  const resetData = Object.fromEntries(
    Object.entries(detailData).map(([key, value]) => [
      key,
      // 값이 null 이거나 undefined이면 "" 빈 스트링 값을 넣기
      value === null || value === undefined ? "" : value,
    ])
  );

  ... 추가로직
}, [detailData]);
```
