# React의 서버 상태 관리를 위한 라이브러리

<br /><br />

* React query
---

<br />

```
- 클라이언트 상태와 서버 상태의 분리
클라이언트에서 사용하는 상태와 서버에서 가져온 상태를 혼합하여 사용할 경우
상태 관리와 로직 작성이 복잡해지고 유지보수가 어려워질 수 있는데,
이러한 경우에 React Query를 사용해 서버 상태를 따로 관리하면 프로젝트 관리가 편해집니다.

- 최신 상태 유지
쉽게 서버의 최신 상태를 가져오는 기능을 제공한다.
일정 시간마다 상태를 업데이트하거나 작 특정 동작 이후에 상태를 업데이트할 수 있다.

- 캐싱, 중복 요청 방지
API 요청 결과를 캐싱하여 관리한다.
서버에 API 요청하여 받아온 결과를 캐싱하며 중복 요청을 최소화할 수 있다.

- 비동기 요청에 대한 상태 핸들링
비동기 API 요청에 대한 로딩 상태,결과 값, 에러 상태와 같은 여러가지 상태를 확인하는 기능을 제공한다.
```

<br /><br /><br />

* Example
---

<br />

1. Install.
```node
npm i @tanstack/react-query
# or
pnpm add @tanstack/react-query
# or
yarn add @tanstack/react-query
# or
bun add @tanstack/react-query
```

<br />

```node
npm i -D @tanstack/eslint-plugin-query
# or
pnpm add -D @tanstack/eslint-plugin-query
# or
yarn add -D @tanstack/eslint-plugin-query
# or
bun add -D @tanstack/eslint-plugin-query
```

<br />

```
ESLint 설정 파일(일반적으로 .eslintrc.json, .eslintrc.js, 또는 .eslintrc.yaml)을 열어 플러그인을 추가한다.
다음은 .eslintrc.json 파일을 사용하는 예시이다.
```
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@tanstack/query/recommended"
  ],
  "plugins": [
    "@tanstack/query"
  ],
  "rules": {
    // 추가적인 규칙 설정
  }
}
```
```
"extends": @tanstack/query/recommended를 추가하여 TanStack의 추천 ESLint 규칙을 사용한다.

"plugins": ESLint에 @tanstack/query 플러그인을 사용하도록 설정.
```
```json
"rules": {
  "@tanstack/query/require-query-key": "warn", // 예: query key가 필요하다는 경고
  "@tanstack/query/consistent-query-hooks": "error" // 예: 일관된 query hook 사용 강제
}
```

<br /><br />

2. 앱의 최상위 컴포넌트에서 QueryClientProvider를 사용하여 React Query의 QueryClient를 Import 한다.
```jsx
/* index.js 또는 App.js */

import React from 'react';
import ReactDOM from 'react-dom';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@react-devtools/inspector'; /* React Query Devtools */
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} /> {/* React Query Devtools 추가 */}
    </QueryClientProvider>
  </React.StrictMode>
);
```

```
* Tip

QueryClientProvider를 앱의 최상위 컴포넌트로 감싸면 앱 전체에서 동일한 QueryClient 인스턴스를 사용할 수 있다.

이렇게 하면 React Query의 상태를 모든 하위 컴포넌트에서 공유할 수 있으며,
각 컴포넌트에서 필요한 경우 데이터를 쉽게 가져올 수 있다.

또한 React Query Devtools를 함께 사용하기 위해서도 최상위 컴포넌트에서 QueryClientProvider로 앱을 감싸는 것이 좋다.
```

<br /><br />

3. MyComponent를 만들어 React Query를 사용한 Component를 만든다.
```jsx
/* MyComponent.js */

import React from 'react';
import { useQuery } from 'react-query';

async function fetchData() {
  const response = await fetch('https://api.example.com/data');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: 'data',
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
}

export default App;
```

<br /><br />

3-1. GET 방식 다른 예시

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

function Todos() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {data.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

export default Todos;
```

<br /><br />

3-2. POST 방식 다른 예시

```jsx
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addTodo = async (newTodo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

function AddTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleAddTodo = () => {
    mutation.mutate({ title: 'New Todo', completed: false });
  };

  return (
    <div>
      <button onClick={handleAddTodo}>Add Todo</button>
      {mutation.isLoading && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred: {mutation.error.message}</div>}
    </div>
  );
}

export default AddTodo;
```

<br /><br />

3-3. PUT 방식(데이터 수정) 예시

```jsx
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateTodo = async (updatedTodo) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

function UpdateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleUpdateTodo = (id) => {
    mutation.mutate({ id, title: 'Updated Todo', completed: true });
  };

  return (
    <div>
      <button onClick={() => handleUpdateTodo(1)}>Update Todo</button>
      {mutation.isLoading && <div>Updating todo...</div>}
      {mutation.isError && <div>An error occurred: {mutation.error.message}</div>}
    </div>
  );
}

export default UpdateTodo;
```

<br /><br />

3-4. 데이터 동기화(데이터가 변경될 때 자동으로 업데이트되도록 하여 사용자 인터페이스를 최신 상태로 유지)

```jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const addPost = async (newPost) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function Posts() {
  const queryClient = useQueryClient();

  // Fetch posts using useQuery
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Mutation for adding a new post
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // Invalidate the 'posts' query to refetch data
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAddPost = () => {
    mutation.mutate({ title: 'New Post', content: 'This is a new post' });
  };

  return (
    <div>
      <button onClick={handleAddPost} disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Adding...' : 'Add Post'}
      </button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}: {post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
```

<br /><br />

4. 다른 컴포넌트에서 MyComponent를 가져와서 렌더링 한다.
```jsx
/* AnotherComponent.js */

import React from 'react';
import MyComponent from './MyComponent'; /* MyComponent 가져오기 */

function AnotherComponent() {
  return (
    <div>
      <h2>Another Component</h2>
      <MyComponent /> {/* MyComponent 사용 */}
    </div>
  );
}

export default AnotherComponent;
```

<br /><br /><br />

* Option
---

<br />

```
Queries option

1) enabled: 자동으로 query를 실행할지에 대한 여부

2) retry: query 동작 실패 시, 자동으로 몇번 만큼 retry를 시도할 지 결정

3) select: response 값에서 필요한 값만을 추출할 수 있도록 하는 옵션

4) refetchInterval: 주기적으로 refetch 하는 간격을 설정하는 옵션

5) throwOnError: error boundary를 에러로 전파할 지 결정하는 옵션
```
