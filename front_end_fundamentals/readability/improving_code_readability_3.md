# 코드의 가독성을 높이기 (3)

<br />
<br />

* 시점 이동 줄이기
---

```
코드를 읽을 때 코드의 위아래를 왔다갔다 하면서 읽거나,
여러 파일이나 함수, 변수를 넘나들면서 읽는 것을 시점 이동이라고 한다.

시점이 여러 번 이동할수록 코드를 파악하는 데에 시간이 더 걸리고,
맥락을 파악하는 데에 어려움이 있을 수 있다.

코드를 위에서 아래로, 하나의 함수나 파일에서 읽을 수 있도록 코드를 작성하면,
읽는 사람이 동작을 빠르게 파악할 수 있게 된다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 코드에서는 사용자의 권한에 따라서 버튼을 다르게 보여준다.

사용자의 권한이 관리자(Admin)라면, Invite와 View 버튼을 보여준다.
사용자의 권한이 보기 전용(Viewer)이라면, Invite 버튼은 비활성화하고, View 버튼을 보여준다.
```

```tsx
function Page() {
  const user = useUser();
  const policy = getPolicyByRole(user.role);

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}

function getPolicyByRole(role) {
  const policy = POLICY_SET[role];

  return {
    canInvite: policy.includes("invite"),
    canView: policy.includes("view")
  };
}

const POLICY_SET = {
  admin: ["invite", "view"],
  viewer: ["view"]
};
```

<br />

```
이 코드에서 Invite 버튼이 비활성화된 이유를 이해하려고 한다면,
policy.canInvite → getPolicyByRole(user.role) → POLICY_SET 순으로 코드를 위아래를 오가며 읽어야 한다.

이 과정에서 3번의 시점 이동이 발생해서,
코드를 읽는 사람이 맥락을 유지해 가며 읽기 어려워졌다.

POLICY_SET 같은 추상화를 사용해서 권한에 따라 버튼 상태를 관리하는 것은
권한 체계가 복잡한 경우에는 유용할 수 있지만,
지금처럼 간단할 때는 오히려 읽는 사람이 코드를 이해하기 어렵게 만든다.
```

<br />
<br />
<br />

2. `개선`

```
"조건을 펼쳐서 그대로 드러내기"

권한에 따른 조건을 요구사항 그대로 코드에 드러내는 방법이다.

이렇게 하면 Invite 버튼이 비활성화되는 때를 코드에서 바로 확인할 수 있다.

코드를 위에서 아래로만 읽으면 한눈에 권한을 다루는 로직을 파악할 수 있다.
```

```tsx
function Page() {
  const user = useUser();

  switch (user.role) {
    case "admin":
      return (
        <div>
          <Button disabled={false}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    case "viewer":
      return (
        <div>
          <Button disabled={true}>Invite</Button>
          <Button disabled={false}>View</Button>
        </div>
      );
    default:
      return null;
  }
}
```

<br />

```
"조건을 한눈에 볼 수 있는 객체로 만들기"

권한을 다루는 로직을 컴포넌트 안에서 객체로 관리해서,
여러 차례의 시점 이동 없이 한눈에 조건을 파악할 수 있게 수정할 수 있다.

canInvite와 canView의 조건을 Page 컴포넌트만 보면 확인할 수 있다.
```

```tsx
function Page() {
  const user = useUser();
  const policy = {
    admin: { canInvite: true, canView: true },
    viewer: { canInvite: false, canView: true }
  }[user.role];

  return (
    <div>
      <Button disabled={!policy.canInvite}>Invite</Button>
      <Button disabled={!policy.canView}>View</Button>
    </div>
  );
}
```

<br />
<br />
<br />

3. `삼항 연산자 단순하게 하기`

```
삼항 연산자를 복잡하게 사용하면,
조건의 구조가 명확하게 보이지 않아서 코드를 읽기 어려울 수 있다.
```

```tsx
// 예시

const status = (A조건 && B조건) ? "BOTH" : (A조건 || B조건) ? (A조건 ? "A" : "B") : "NONE";
```

<br />

```
이 코드는 여러 삼항 연산자가 중첩되어 사용되어서,
정확하게 어떤 조건으로 값이 계산되는지 한눈에 파악하기 어렵다.

다음과 같이 조건을 if 문으로 풀어서 사용하면,
보다 명확하고 간단하게 조건을 드러낼 수 있다.
```

```tsx
const status = (() => {
  if (A조건 && B조건) return "BOTH";
  if (A조건) return "A";
  if (B조건) return "B";
  return "NONE";
})();
```
