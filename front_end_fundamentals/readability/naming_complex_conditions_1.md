# 코드의 가독성을 높이기 (2)

<br />
<br />

* 복잡한 조건에 이름 붙이기 (1)
---

```
복잡한 조건식이 특별한 이름 없이 사용되면,
조건이 뜻하는 바를 한눈에 파악하기 어려워진다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 코드는 상품 중에서 카테고리와 가격 범위가
일치하는 상품만 필터링하는 로직이다.
```

```tsx
const result = products.filter((product) =>
  product.categories.some(
    (category) =>
      category.id === targetCategory.id &&
      product.prices.some(
        (price) => price >= minPrice && price <= maxPrice
      )
  )
);
```

<br />

```
이 코드에서는 익명 함수와 조건이 복잡하게 얽혀 있다.

filter와 some, && 같은 로직이 여러 단계로 중첩되어 있어서 정확한 조건을 파악하기 어려워졌다.

코드를 읽는 사람이 한 번에 고려해야 하는 맥락이 많아서, 가독성이 떨어진다.
```

<br />
<br />
<br />

2. `개선`

```
다음 코드와 같이 조건에 명시적인 이름을 붙이면,
코드를 읽는 사람이 한 번에 고려해야 할 맥락을 줄일 수 있다.
```

```tsx
const matchedProducts = products.filter((product) => {
  return product.categories.some((category) => {
    const isSameCategory = category.id === targetCategory.id;
    const isPriceInRange = product.prices.some(
      (price) => price >= minPrice && price <= maxPrice
    );

    return isSameCategory && isPriceInRange;
  });
});
```

<br />

```
명시적으로 같은 카테고리 안에 속해 있고,
가격 범위가 맞는 제품들로 필터링한다고 작성함으로써,
복잡한 조건식을 따라가지 않고도 코드의 의도를 명확히 드러낼 수 있다.
```

<br />
<br />
<br />

3. 조건식에 이름을 붙이는 기준

```
언제 조건식이나 함수에 이름을 붙이고 분리하는 것이 좋을까?

1) 복잡한 로직을 다룰 때

2) 재사용성이 필요할 때

3) 단위 테스트가 필요할 때
```

<br />

```
조건에 이름을 붙이지 않아도 괜찮을 때

1) 로직이 간단할 때

2) 한 번만 사용될 때
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
