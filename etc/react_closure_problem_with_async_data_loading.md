# React 클로저 문제 해결방법

<br />
<br />

* 비동기로 로드되는 데이터를 사용 시, 생기는 문제?

---

```
이런 경우는 거의 없지만 간혹,
비동기로 로드되는 데이터를 사용하는 컴포넌트에서,
초기 빈 상태를 참조하는 클로저 문제가 발생하는 경우가 발생한다.

예시를 보자
```

<br />
<br />
<br />
<br />

1. 문제 상황

```
비동기 데이터를 로드하지만,
클로저 문제로 초기 빈 배열을 참조하는 상황이다.
```

<br />

`문제가 있는 코드`

```ts
const ClosureComponent = () => {
  const [data, setData] = useState([]); // 초기값: 빈 배열
  
  const columns: GridColDef[] = useMemo(() => [
    {
      field: "status",
      valueFormatter: (value) => {
        // 클로저 문제 -> 초기 빈 배열을 계속 참조
        console.log("data ", data); // 항상 []
        return value;
      }
    }
  ], []); // data가 의존성 배열에 없음

  useEffect(() => {
    // 비동기로 데이터 로드
    fetchData().then(result => setData(result));
  }, []);

  return <DataGrid columns={columns} />;
};
```

<br />
<br />
<br />

2. 해결 방법

<br />

`1) Key를 사용한 강제 리렌더링`

```ts
const KeyComponent = () => {
  const [data, setData] = useState([]);
  const [gridKey, setGridKey] = useState(0);
  
  const columns: GridColDef[] = useMemo(() => [
    {
      field: "status",
      valueFormatter: (value) => {
        console.log("data ", data); // 최신 데이터
        return value;
      }
    }
  ], [data]);

  useEffect(() => {
    if (data.length > 0) {
      setGridKey(prev => prev + 1); // 그리드 강제 리렌더링
    }
  }, [data]);

  return <DataGrid key={gridKey} columns={columns} />;
};
```

<br />

`2) useCallback 사용하여 컬럼 자체를 함수로 생성`

```ts
const CallbackComponent = () => {
  const [data, setData] = useState([]);
  
  // 컬럼을 생성하는 함수
  const createColumns = useCallback((data) => [
    {
      field: "status",
      valueFormatter: (value) => {
        console.log("data ", data); // 최신 데이터
        return value;
      }
    },
    {
      field: "category",
      valueFormatter: (value) => value;
    }
  ], [data]);

  // 현재 데이터로 컬럼 생성
  const columns = createColumns(data);

  return <DataGrid columns={columns} />;
};
```

<br />

`3) length를 사용`

```ts
{data.length > 0 && (
  <Component>
    ...
  </Component>
)}
```
