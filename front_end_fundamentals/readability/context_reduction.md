# 코드의 가독성을 높이기 (1)

<br />
<br />

* 맥락 줄이기 1 (같이 실행되지 않는 코드 분리하기)
---

```
같이 실행되지 않는 코드를 분리한다.

동시에 실행되지 않는 코드가 하나의 함수 또는 컴포넌트에 있으면,
동작을 한눈에 파악하기 어렵다.

구현 부분에 많은 숫자의 분기가 들어가서,
어떤 역할을 하는지 이해하기 어렵기도 하다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 <SubmitButton /> 컴포넌트는 사용자의 권한에 따라서 다르게 동작한다.

사용자의 권한이 보기 전용("viewer")이면,
초대 버튼은 비활성화되어 있고, 애니메이션도 재생하지 않는다.

사용자가 일반 사용자이면, 초대 버튼을 사용할 수 있고, 애니메이션도 재생한다.
```

```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  useEffect(() => {
    if (isViewer) {
      return;
    }
    showButtonAnimation();
  }, [isViewer]);

  return isViewer ? (
    <TextButton disabled>Submit</TextButton>
  ) : (
    <Button type="submit">Submit</Button>
  );
}
```

<br />

```
<SubmitButton /> 컴포넌트에서는,
사용자가 가질 수 있는 2가지의 권한 상태를 하나의 컴포넌트 안에서 한 번에 처리하고 있다.

그래서 코드를 읽는 사람이 한 번에 고려해야 하는 맥락이 많게 된다.

동시에 실행되지 않는 코드가 교차되어서 나타나서 코드를 이해할 때 부담을 준다.
```

<br />
<br />
<br />

2. `개선`

```
다음 코드는 사용자가 보기 전용 권한을 가질 때와,
일반 사용자일 때를 완전히 나누어서 관리하도록 하는 코드이다.
```

```tsx
function SubmitButton() {
  const isViewer = useRole() === "viewer";

  return isViewer ? <ViewerSubmitButton /> : <AdminSubmitButton />;
}

function ViewerSubmitButton() {
  return <TextButton disabled>Submit</TextButton>;
}

function AdminSubmitButton() {
  useEffect(() => {
    showAnimation();
  }, []);

  return <Button type="submit">Submit</Button>;
}
```

<br />

```
1) <SubmitButton /> 코드 곳곳에 있던 분기가 단 하나로 합쳐지면서,
   분기가 줄어들었다.

2) <ViewerSubmitButton />과 <AdminSubmitButton /> 에서는 하나의 분기만 관리하기 때문에,
   코드를 읽는 사람이 한 번에 고려해야 할 맥락이 적다.
```

<br />
<br />
<br />
<br />

* 맥락 줄이기 2 (구현 상세 추상화하기)
---

```
한 사람이 코드를 읽을 때 동시에 고려할 수 있는 총 맥락의 숫자는 제한되어 있다고 한다.

내 코드를 읽는 사람들이 코드를 쉽게 읽을 수 있도록 하기 위해서,
불필요한 맥락을 추상화할 수 있다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 <LoginStartPage /> 컴포넌트는 사용자가 로그인되었는지 확인하고,
로그인이 된 경우 홈으로 이동시키는 로직을 가지고 있다.
```

```tsx
function LoginStartPage() {
  useCheckLogin({
    onChecked: (status) => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }
  });

  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}
```

<br />

```
"가독성"

예시 코드에서는 로그인이 되었는지 확인하고,
사용자를 홈으로 이동시키는 로직이 추상화 없이 노출되어 있다.

그래서 useCheckLogin, onChecked, status, "LOGGED_IN"과 같은 변수나 값을
모두 읽어야 무슨 역할을 하는 코드인지 알 수 있다.

이 코드와 더불어서, 실제로 로그인과 관련된 코드가 밑에 이어지는데,
읽는 사람이 LoginStartPage가 무슨 역할을 하는지 알기 위해서 한 번에 이해해야 하는 맥락이 많다.
```

<br />
<br />
<br />

2. `개선`

```
사용자가 로그인되었는지 확인하고 이동하는 로직을
HOC(Higher-Order Component) 나 Wrapper 컴포넌트로 분리하여,
코드를 읽는 사람이 한 번에 알아야 하는 맥락을 줄여요. 그래서 코드의 가독성을 높일 수 있다.

또한, 분리된 컴포넌트 안에 있는 로직끼리 참조를 막음으로써,
코드 간의 불필요한 의존 관계가 생겨서 복잡해지는 것을 막을 수 있다.
```

```tsx
// 옵션 A Wrapper 컴포넌트 사용하기

function App() {
  return (
    <AuthGuard>
      <LoginStartPage />
    </AuthGuard>
  );
}

function AuthGuard({ children }) {
  const status = useCheckLoginStatus();

  useEffect(() => {
    if (status === "LOGGED_IN") {
      location.href = "/home";
    }
  }, [status]);

  return status !== "LOGGED_IN" ? children : null;
}

function LoginStartPage() {
  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}
```

<br />

```tsx
// 옵션 B HOC(Higher-Order Component) 사용하기

function LoginStartPage() {
  /* ... 로그인 관련 로직 ... */

  return <>{/* ... 로그인 관련 컴포넌트 ... */}</>;
}

export default withAuthGuard(LoginStartPage);

// HOC 정의
function withAuthGuard(WrappedComponent) {
  return function AuthGuard(props) {
    const status = useCheckLoginStatus();

    useEffect(() => {
      if (status === "LOGGED_IN") {
        location.href = "/home";
      }
    }, [status]);

    return status !== "LOGGED_IN" ? <WrappedComponent {...props} /> : null;
  };
}
```

<br />
<br />
<br />

3. `예시 2`

```
다음 <FriendInvitation /> 컴포넌트는 클릭하면 사용자에게 동의를 받고,
사용자에게 초대를 보내는 페이지 컴포넌트이다.
```

```tsx
function FriendInvitation() {
  const { data } = useQuery(/* 생략.. */);

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  const handleClick = async () => {
    const canInvite = await overlay.openAsync(({ isOpen, close }) => (
      <ConfirmDialog
        title={`${data.name}님에게 공유해요`}
        cancelButton={
          <ConfirmDialog.CancelButton onClick={() => close(false)}>
            닫기
          </ConfirmDialog.CancelButton>
        }
        confirmButton={
          <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
            확인
          </ConfirmDialog.ConfirmButton>
        }
        /* 중략 */
      />
    ));

    if (canInvite) {
      await sendPush();
    }
  };

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  return (
    <>
      <Button onClick={handleClick}>초대하기</Button>
      {/* UI를 위한 JSX 마크업... */}
    </>
  );
}
```

<br />

```
"가독성"

가독성을 지키려면 코드가 한 번에 가지고 있는 맥락이 적어야 한다.

하나의 컴포넌트가 가지고 있는 맥락이 다양하면 컴포넌트의 역할을 한눈에 파악하기 어려워진다.

<FriendInvitation /> 컴포넌트는 실제로
사용자에게 동의를 받을 때 사용하는 자세한 로직까지 하나의 컴포넌트에 가지고 있어,
코드를 읽을 때 따라가야 할 맥락이 많아 읽기 어려워진다.
```

```
"응집도"

사용자에게 동의를 받는 로직과 실제로 그 로직을 실행하는 로직인 <Button /> 사이에 거리가 멀어서,
실제로 어디에서 이 로직을 실행하는지 확인하려면 스크롤을 밑으로 많이 내려야 한다.

그래서 자주 함께 수정되는 코드인 버튼과 클릭 핸들러가 미처 함께 수정되지 못할 가능성이 있다.
```

<br />
<br />
<br />

4. `개선 2`

```
사용자에게 동의를 받는 로직과 버튼을
<InviteButton /> 컴포넌트로 추상화했다.
```

```tsx
export function FriendInvitation() {
  const { data } = useQuery(/* 생략.. */);

  // 이외 이 컴포넌트에 필요한 상태 관리, 이벤트 핸들러 및 비동기 작업 로직...

  return (
    <>
      <InviteButton name={data.name} />
      {/* UI를 위한 JSX 마크업 */}
    </>
  );
}

function InviteButton({ name }) {
  return (
    <Button
      onClick={async () => {
        const canInvite = await overlay.openAsync(({ isOpen, close }) => (
          <ConfirmDialog
            title={`${name}님에게 공유해요`}
            cancelButton={
              <ConfirmDialog.CancelButton onClick={() => close(false)}>
                닫기
              </ConfirmDialog.CancelButton>
            }
            confirmButton={
              <ConfirmDialog.ConfirmButton onClick={() => close(true)}>
                확인
              </ConfirmDialog.ConfirmButton>
            }
            /* 중략 */
          />
        ));

        if (canInvite) {
          await sendPush();
        }
      }}
    >
      초대하기
    </Button>
  );
}
```

<br />

```
<InviteButton /> 컴포넌트는 사용자를 초대하는 로직과 UI만 가지고 있으므로,
한 번에 인지해야 하는 내용을 적게 유지해서 가독성을 높일 수 있다.

또한, 버튼과 클릭 후 실행되는 로직이 아주 가까이에 있다.
```

<br />
<br />
<br />
<br />

* 맥락 줄이기 3 (로직 종류에 따라 합쳐진 함수 쪼개기)
---

```
쿼리 파라미터, 상태, API 호출과 같은 로직의 종류에 따라서 함수나 컴포넌트, Hook을 만들지 말아야한다.

한 번에 다루는 맥락의 종류가 많아져서 이해하기 힘들고 수정하기 어려운 코드가 된다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 usePageState() Hook은,
페이지 전체의 URL 쿼리 파라미터를 한 번에 관리한다.
```

```tsx
import moment, { Moment } from "moment";
import { useMemo } from "react";
import {
  ArrayParam,
  DateParam,
  NumberParam,
  useQueryParams
} from "use-query-params";

const defaultDateFrom = moment().subtract(3, "month");
const defaultDateTo = moment();

export function usePageState() {
  const [query, setQuery] = useQueryParams({
    cardId: NumberParam,
    statementId: NumberParam,
    dateFrom: DateParam,
    dateTo: DateParam,
    statusList: ArrayParam
  });

  return useMemo(
    () => ({
      values: {
        cardId: query.cardId ?? undefined,
        statementId: query.statementId ?? undefined,
        dateFrom:
          query.dateFrom == null ? defaultDateFrom : moment(query.dateFrom),
        dateTo: query.dateTo == null ? defaultDateTo : moment(query.dateTo),
        statusList: query.statusList as StatementStatusType[] | undefined
      },
      controls: {
        setCardId: (cardId: number) => setQuery({ cardId }, "replaceIn"),
        setStatementId: (statementId: number) =>
          setQuery({ statementId }, "replaceIn"),
        setDateFrom: (date?: Moment) =>
          setQuery({ dateFrom: date?.toDate() }, "replaceIn"),
        setDateTo: (date?: Moment) =>
          setQuery({ dateTo: date?.toDate() }, "replaceIn"),
        setStatusList: (statusList?: StatementStatusType[]) =>
          setQuery({ statusList }, "replaceIn")
      }
    }),
    [query, setQuery]
  );
}
```

<br />

```
"가독성"

이 Hook이 가지고 있는 책임이 "페이지가 필요한 모든 쿼리 파라미터를 관리하는 것" 임을 고려했을 때,
이 Hook이 담당할 책임이 무제한적으로 늘어날 가능성이 있다.

새로운 쿼리 파라미터가 추가되면, 무의식적으로 이 Hook이 관리하게 된다.

점점 Hook이 담당하고 있는 영역이 넓어지면서,
구현이 길어지고, 어떤 역할을 하는 Hook인지 파악하기 힘들어진다.
```

```
"성능"

이 Hook을 쓰는 컴포넌트는, 이 Hook이 관리하는 어떤 쿼리 파라미터가 수정되더라도 리렌더링이 발생한다.

예를 들어서, 한 컴포넌트에서 cardId만 참고해도,
dateFrom이나 dateTo가 변경되면 리렌더링 된다.

좋은 성능을 위해서는 특정한 상태 값이 업데이트되었을 때 최소한의 부분이 리렌더링되도록 설계해야 한다.

* 이 Hook은 "결합도" 관점으로도 볼 수 있다.
```

<br />
<br />
<br />

2. `개선`

```
다음 코드와 같이 각각의 쿼리 파라미터별로
별도의 Hook을 작성할 수 있다.
```

```tsx
import { NumberParam, useQueryParam } from "use-query-params";

export function useCardIdQueryParam() {
  const [cardId, _setCardId] = useQueryParam("cardId", NumberParam);

  const setCardId = useCallback((cardId: number) => {
    _setCardId({ cardId }, "replaceIn");
  }, []);

  return [cardId ?? undefined, setCardId] as const;
}
```

<br />

```
Hook이 담당하는 책임을 분리했기 때문에,
기존 usePageState() Hook보다 명확한 이름을 가진다.

또한 Hook을 수정했을 때 영향이 갈 범위를 좁혀서,
예상하지 못한 변경이 생기는 것을 막을 수 있다.
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
