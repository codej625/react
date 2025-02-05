# 코드의 응집도 높이기 (2)

<br />
<br />

* 매직 넘버 없애기
---

```
매직 넘버(Magic Number)란 정확한 뜻을 밝히지 않고 소스 코드 안에 직접 숫자 값을 넣는 것을 말한다.

예를 들어, 찾을 수 없음(Not Found)을 나타내는 HTTP 상태 코드로 404 값을 바로 사용하는 것이나,
하루를 나타내는 86400초를 그대로 사용하는 것이 있다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 코드는 좋아요 버튼을 눌렀을 때,
좋아요 개수를 새로 내려받는 함수이다.
```

```tsx
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

<br />

```
"응집도"

300이라고 하는 숫자를 애니메이션 완료를 기다리려고 사용했다면,
재생하는 애니메이션을 바꿨을 때 조용히 서비스가 깨질 수 있는 위험성이 있다.

충분한 시간동안 애니메이션을 기다리지 않고 바로 다음 로직이 시작될 수도 있다.

같이 수정되어야 할 코드 중 한쪽만 수정된다는 점에서,
응집도가 낮은 코드라고도 할 수 있다.
```

<br />
<br />
<br />

2. `개선`

```
숫자 300의 맥락을 정확하게 표시하기 위해서,
상수 ANIMATION_DELAY_MS로 선언할 수 있다.
```

```tsx
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
