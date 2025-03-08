# Props Drilling

<br />
<br />

* Props Drilling과 결합도란?
---

```
Props Drilling은 부모 컴포넌트가 자식 컴포넌트로 props(데이터나 함수)를 계속 전달하는 상황을 말한다.

예를 들어, name이라는 props가 있다고 가정하고,
이걸 부모에서 자식, 또 그 자식으로 계속 내려보내야 한다면,
중간에 있는 컴포넌트들은 그 props를 실제로 사용하지 않더라도 전달 역할만 하게 된다.

이렇게 되면 결합도가 높아진다.

결합도는 컴포넌트들이 서로 얼마나 의존하는지를 나타내는 개념이다.

결합도가 높으면 한 가지를 바꿀 때(예: name을 firstName으로 변경) 그 props를 전달받는 모든 컴포넌트를 수정해야 한다.
```

<br />
<br />
<br />
<br />

1. 예시

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody
        items={items}
        keyword={keyword}
        onKeywordChange={setKeyword}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </Modal>
  );
}

function ItemEditBody({ keyword, onKeywordChange, items, recommendedItems, onConfirm, onClose }) {
  return (
    <>
      <Input value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
      <Button onClick={onClose}>닫기</Button>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </>
  );
}

function ItemEditList({ keyword, items, recommendedItems, onConfirm }) {
  // 아이템 목록 렌더링 로직
}
```

```
여기서 items, recommendedItems, onConfirm 같은 props가
ItemEditModal → ItemEditBody → ItemEditList로 계속 전달된다.

그런데 ItemEditBody는 이 props를 직접 사용하지 않고,
그냥 ItemEditList로 넘겨줄 뿐이다.

Props Drilling이 발생한 것
```

```
만약 recommendedItems가 필요 없어져서 삭제된다면?
ItemEditModal, ItemEditBody, ItemEditList 모두 수정해야 한다.

중간 컴포넌트(ItemEditBody)가 불필요하게 props를 전달하는 역할만 해서
결합도가 높아져서 한 부분을 바꾸면 연쇄적으로 다른 부분도 고쳐야 한다.
```

<br />
<br />
<br />

2. 해결

```
조합(Composition) 패턴

많이 쓰이는 해결책은 조합 패턴을 사용하는 것이다.

이 방법은 컴포넌트를 더 작게 나누고,
부모에서 필요한 자식 컴포넌트를 직접 전달하는 방식이다.

그러면 중간에서 props를 내려보낼 필요가 줄어든다.
```

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList
          keyword={keyword}
          items={items}
          recommendedItems={recommendedItems}
          onConfirm={onConfirm}
        />
      </ItemEditBody>
    </Modal>
  );
}

function ItemEditBody({ children, onClose }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>닫기</Button>
      </div>
      {children}
    </>
  );
}

function ItemEditList({ keyword, items, recommendedItems, onConfirm }) {
  // 아이템 목록 렌더링 로직
}
```

```
ItemEditBody가 ItemEditList를 직접 받는 대신, children으로 전달받는다.

ItemEditModal에서 ItemEditList를 바로 넣어줘서 ItemEditBody는 onClose만 관리하면 된다.

items, recommendedItems, onConfirm 같은 props는 ItemEditBody를 거치지 않고 ItemEditList로 바로 전달된다.
```

```
하지만 컴포넌트 구조가 깊어지면(예: ItemEditList 아래에 또 자식이 많아지면) 여전히 Props Drilling이 생길 수 있다.

이럴때는 Zustand같은 전역 상태 관리 라이브러리를 사용해보자.
```
