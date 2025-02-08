# Composition Pattern VS Compound Component Pattern

<br />
<br />

* 가장 많이 사용하는 리액트 패턴
---

`Composition Pattern`

```
기본적이고 일반적인 패턴이다.

컴포넌트들을 조합해서 새로운 컴포넌트를 만드는 방식으로,
children prop을 통한 기본적인 컴포넌트 조합이다.
```

<br />

`Compound Component Pattern`

```
Composition 패턴을 기반으로 하되, 더 발전된 형태이다.

부모-자식 컴포넌트 간에 암묵적인 상태 공유하고,
정해진 하위 컴포넌트들이 있고, 이들이 부모 컴포넌트와 강하게 결합된다.

주로 Context API를 통해 상태와 로직을 공유한다.
```

<br />
<br />
<br />
<br />

1. `Composition Pattern 예시` 

```tsx
const Card = ({ children }) => (
  <div className="card">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="card-title">{children}</h2>
);

// 사용
<Card>
  <CardTitle>제목</CardTitle>
  <p>내용</p>
</Card>
```

<br />
<br />
<br />

2. `Compound Pattern 예시`

```tsx
const Select = ({ children }) => {
  const [value, setValue] = useState(null);
  
  return (
    <SelectContext.Provider value={{ value, setValue }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
};

Select.Option = ({ value, children }) => {
  const { setValue, value: selectedValue } = useSelectContext();
  
  return (
    <div 
      className={selectedValue === value ? 'selected' : ''} 
      onClick={() => setValue(value)}
    >
      {children}
    </div>
  );
};

// 사용
<Select>
  <Select.Option value="1">옵션 1</Select.Option>
  <Select.Option value="2">옵션 2</Select.Option>
</Select>
```

<br />
<br />
<br />

3. `정리 및 요약`

<br />

| 구분       | Composition                                                                 | Compound Components                                                                 |
|------------|------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **결합도** | 느슨한 결합. 컴포넌트들이 독립적으로 존재하며 서로 간섭하지 않습니다.        | 강한 결합. 하위 컴포넌트들이 부모 컴포넌트에 의존적이며, 함께 동작합니다.             |
| **상태 공유** | 명시적인 props 전달을 통해 상태를 공유합니다.                                 | Context API 등을 사용하여 암묵적으로 상태를 공유합니다.                               |
| **유연성** | 더 유연하고 범용적으로 사용될 수 있으며, 다양한 조합이 가능합니다.             | 특정 목적을 위한 제한된 사용 사례에 적합하며, 구조가 고정적입니다.                   |
| **사용 목적** | 일반적인 컴포넌트 조합에 사용되며, 재사용성과 확장성이 높습니다.               | 복잡한 UI 컴포넌트의 일관된 동작을 보장하기 위해 사용됩니다.                          |
