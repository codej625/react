# 코드의 결합도 낮추기 (3)

<br />
<br />

* Props Drilling 지우기
---

```
Props Drilling은 부모 컴포넌트와 자식 컴포넌트 사이에 결합도가 생겼다는 것을 나타내는 명확한 표시이다.

만약에 Drilling되는 name prop의 이름이 firstName으로 변경되면,
해당 prop을 참조하는 모든 컴포넌트를 수정해야 한다.
```

<br />
<br />
<br />
<br />

1. `예시`

```
다음 코드는 사용자가 item을 선택할 때 사용하는 <ItemEditModal /> 컴포넌트이다.

사용자가 키워드를 입력해서 아이템 목록을 검색하고,
찾고 있었던 아이템을 선택하면 onConfirm이 호출된다.

사용자가 입력한 키워드는 keyword, 선택할 수 있는 아이템은 items,
추천 아이템의 목록은 recommendedItems prop으로 전달된다.
```

```tsx
function ItemEditModal({ open, items, recommendedItems, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  // 다른 ItemEditModal 로직 ...

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
      {/* ... 다른 ItemEditModal 컴포넌트 ... */}
    </Modal>
  );
}

function ItemEditBody({
  keyword,
  onKeywordChange,
  items,
  recommendedItems,
  onConfirm,
  onClose
}) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>닫기</Button>
      </div>
      <ItemEditList
        keyword={keyword}
        items={items}
        recommendedItems={recommendedItems}
        onConfirm={onConfirm}
      />
    </>
  );
}

// ...
```

<br />

```
"결합도"

이 컴포넌트는 부모인 ItemEditModal과 자식인 ItemEditBody,
ItemEditList 등이 동일한 값인 recommendedItems, onConfirm, keyword 등을 prop으로 공유하고 있다.

부모 컴포넌트가 prop을 그대로 자식 컴포넌트에게 넘겨주는 Props Drilling이 발생하고 있다.

Props Drilling이 발생하면, prop을 불필요하게 참조하는 컴포넌트의 숫자가 많아진다.

그런데 prop이 변경되면 prop을 참조하는 모든 컴포넌트가 수정되어야 한다.

예를 들어, 더 이상 아이템에 대한 추천 기능이 사라져서 recommendedItems 를 삭제해야 한다면,
연관된 모든 컴포넌트에서 삭제해야 하고,
코드 수정범위가 필요 이상으로 넓고, 결합도가 높아진다.
```

<br />
<br />
<br />

2. `개선`

```
"A. 조합(Composition) 패턴 활용"

조합 패턴을 사용하면 부모 컴포넌트가 자식 컴포넌트에
Props를 일일이 전달해야 하는 Props Drilling 문제를 해결할 수 있다.

더 나아가, 조합 패턴은 불필요한 중간 추상화를 제거하여,
개발자가 각 컴포넌트의 역할과 의도를 보다 명확하게 이해할 수 있다.
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
      <div style="display: flex; justify-content: space-between;">
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>닫기</Button>
      </div>
      {children}
    </>
  );
}
```

<br />

```
위의 예시처럼 children을 사용해 필요한 컴포넌트를 부모에서 작성하도록 하면 불필요한 Props Drilling을 줄일 수 있다.

하지만, 조합 패턴만으로는 해결되지 않는 경우도 있고,
컴포넌트 트리 구조가 깊어지면 여전히 문제가 발생한다.

위의 예시에서 ItemEditModal 컴포넌트는 여전히,
items와 recommendedItems를 Props Drilling하고 있다.
```

<br />
<br />

```
"B. ContextAPI 활용"

Context API를 활용하면, 데이터의 흐름을 간소화하고 계층 구조 전체에 쉽게 공유할 수 있다.

조합 패턴을 사용해도, 컴포넌트가 복잡하고 깊다면,
ContextAPI를 사용함으로써 불필요한 Props Drilling을 제거할 수 있다.
```

```tsx
function ItemEditModal({ open, onConfirm, onClose }) {
  const [keyword, setKeyword] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <ItemEditBody onClose={onClose}>
        <ItemEditList keyword={keyword} onConfirm={onConfirm} />
      </ItemEditBody>
    </Modal>
  );
}

function ItemEditList({ children, onClose }) {
  const { items, recommendedItems } = useItemEditModalContext();

  return (
    <>
      <div style="display: flex; justify-content: space-between;">
        <Input
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
        <Button onClick={onClose}>닫기</Button>
      </div>
      {children}
    </>
  );
}
```

<br />

```
* TIP

ContextAPI를 사용하면 매우 쉽게 Props Drilling을 해결할 수 있지만,
Props Drilling이 되는 모든 값을 ContextAPI로 관리해야 하는 것은 아니다.


1) 컴포넌트는 props를 통해서 어떤 데이터를 사용할지 명확하게 표현한다.
   컴포넌트의 역할과 의도를 담고 있는 props라면 문제가 되지 않을 수 있다.

2) ContextAPI를 사용하기 전, children prop을 이용해서 컴포넌트를 전달해 depth를 줄일 수 있다.
   데이터를 사용하지 않는 단순히 값을 전달하기 위한 용도의 컴포넌트는,
   props가 컴포넌트의 역할과 의도를 나타내지 않을 수 있다.
   이러한 경우에 조합(Composition) 패턴을 사용한다면 불필요한 depth를 줄일 수 있다.


위 내용을 먼저 고려를 해보고 접근 방법이 모두 맞지 않을 때 최후의 방법으로 ContextAPI를 사용해야 한다.

불필요한 Props Drilling을 제거하게 되면,
불필요한 중간 추상화를 제거하여 개발자가 컴포넌트의 역할과 의도를 명확히 이해할 수 있도록 도와준다.
```

<br />
<br />
<br />

```
출처 https://github.com/toss/frontend-fundamentals
```
