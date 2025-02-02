# 코드의 예측 가능성을 높이기 (3)

<br />
<br />

* 숨은 로직 드러내기
---

```
함수나 컴포넌트의 이름, 파라미터, 반환 값에 드러나지 않는 숨은 로직이 있다면,
함께 협업하는 동료들이 동작을 예측하는 데에 어려움을 겪을 수 있다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 코드는 사용자의 계좌 잔액을 조회할 때 사용할 수 있는 fetchBalance 함수이다.

함수를 호출할 때마다 암시적으로 balance_fetched라는 로깅이 이루어지고 있다.
```

```tsx
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  logging.log("balance_fetched");

  return balance;
}
```

<br />
<br />
<br />

2. `개선`

```
fetchBalance 함수의 이름과 반환 타입만을 가지고는
balance_fetched 라는 로깅이 이루어지는지 알 수 없다.

그래서 로깅을 원하지 않는 곳에서도 로깅이 이루어질 수 있고,
로깅 로직에 오류가 발생했을 때 갑자기 계좌 잔액을 가져오는 로직이 망가질 수도 있다.
```

```tsx
// 함수의 이름과 파라미터, 반환 타입으로 예측할 수 있는 로직만 구현 부분에 남긴다.

async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>("...");

  return balance;
}
```

```tsx
// 로깅을 하는 코드는 별도로 분리한다.

<Button
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log("balance_fetched");

    await syncBalance(balance);
  }}
>
  계좌 잔액 갱신하기
</Button>
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
