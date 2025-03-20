# 리액트 쿼리의 캐싱

<br />
<br />

* React Query의 기본 작동 원리
---

```
React Query는 데이터를 가져오는 라이브러리이다.

단순히 "요청을 보내고 데이터를 받아오는" 것뿐만 아니라 캐싱(cache)을 통해 효율적으로 관리한다.

캐싱이란, 한 번 가져온 데이터를 메모리에 저장해두고,
같은 요청이 다시 오면 네트워크 요청을 보내지 않고 저장된 데이터를 사용하는 걸 말한다.
```

<br />
<br />
<br />
<br />

1. `queryKey`

```
React Query는 어떤 데이터를 가져올지 식별하기 위해 queryKey라는 고유 키를 사용한다.

queryKey는 배열 형태로 정의되는데,
이 키가 같으면 "이건 같은 데이터야"라고 판단하고 캐시에서 데이터를 꺼내온다.

반대로 queryKey가 다르면 "새로운 데이터야"라고 보고 서버에 새 요청을 보낸다.
```

<br />
<br />
<br />

2. `queryKey를 사용하면서 생기는 문제 해결`

```
querystring에 따라 동적으로 변하는 url인 상황에서
queryKey의 값을 어떻게 해야 할까?

아래와 같이 키를 사용한다면,
queryString -> "id=1" 에서 "id=2"으로 변해도 새로운 요청을 하지 않는다.
```

```

queryKey: [`${endpoint}`]

```

<br />

```
하지만 아래와 같이 querystring을 key에 넣어주면,
동적으로 key의 값이 바뀌게 되고 새로운 요청을 한다.
```

```

queryKey: [`${endpoint}`, queryString]

```

<br />
<br />
<br />

3. 캐싱 된 데이터 공유

```
리액트 쿼리는 QueryClient라는 전역 캐시를 통해 데이터를 관리한다.

같은 queryKey를 사용하는 모든 useQuery 호출은 같은 캐시를 참조하기 때문에,
어떤 컴포넌트에서 데이터를 패칭(fetch)하면,
다른 컴포넌트에서도 추가 네트워크 요청 없이 그 데이터를 바로 사용할 수 있다.
```

```tsx
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

// 데이터 타입 정의
interface Data {
  value: string;
}

// 데이터 패칭 함수 (타입 명시)
const fetchData = async (): Promise<Data> => {
  const response = await axios.get<Data>('https://api.example.com/data');
  return response.data;
};

// 첫 번째 컴포넌트
const ComponentA: React.FC = () => {
  const { data, isLoading } = useQuery<Data, Error>({
    queryKey: ['sharedData'], // 고유한 키
    queryFn: fetchData,
  });

  if (isLoading) return <div>로딩 중...</div>;
  return <div>ComponentA 데이터: {data?.value}</div>;
};

// 두 번째 컴포넌트
const ComponentB: React.FC = () => {
  const { data, isLoading } = useQuery<Data, Error>({
    queryKey: ['sharedData'], // ComponentA와 동일한 키
    queryFn: fetchData,
  });

  if (isLoading) return <div>로딩 중...</div>;
  return <div>ComponentB 데이터: {data?.value}</div>;
};

// 앱 전체
const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ComponentA />
      <ComponentB />
    </QueryClientProvider>
  );
};

export default App;
```

<br />

`동작 원리`

```
공유된 queryKey -> ComponentA와 ComponentB가 같은 ['sharedData'] 키를 사용

캐시 활용 -> ComponentA에서 데이터가 먼저 패칭되면,
           리액트 쿼리가 그 데이터를 캐시에 저장.
           그럼 ComponentB에서는 네트워크 요청 없이 캐시에서 데이터를 바로 가져옴.

리렌더링 -> 한 컴포넌트에서 데이터가 갱신되면(예: refetch),
          같은 키를 사용하는 다른 compt도 자동으로 업데이트돼
```

<br />

`추가 팁`

```
동적 키 -> queryKey에 변수(예: ['user', userId])를 넣으면,
         특정 조건에 따라 다른 데이터를 공유할 수 있다.

수동 업데이트 -> useMutation으로 캐시를 갱신하면,
              같은 키를 사용하는 모든 컴포넌트가 영향을 받는다.
```
