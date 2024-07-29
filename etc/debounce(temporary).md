# 리액트에서 Debounce를 구현해보자.

<br /><br />

* 예시
---

```jsx
import { useState, useEffect } from 'react'
import './App.css'

const searchUsers = (name) => {
  // 서버에서 응답받은 데이터라 가정
  const users = [
    { idx: 1, name: '창근', age: 37 },
    { idx: 2, name: '진우', age: 34 },
    { idx: 3, name: '진수', age: 0 },
    { idx: 4, name: '재국', age: 33 },
    { idx: 5, name: '정현', age: 33 },
    { idx: 6, name: '낙희', age: 27 },
  ];

  return name === '' ? (
    // name의 값이 ''이면 빈 배열 반환
    []
  ) : (
    // 배열을 필터링하고 user.name 값 중에 name으로 시작하는 값만 반환
    users.filter(user => user.name.startsWith(name))
  );
}

function App() {

  // input 값을 담고 보여주기 위한 useState()
  const [input, setInput] = useState('');
  // searchUsers 함수에서 필터링 된 값을 담는 useState() 
  const [search, setSearch] = useState([]);
  
  useEffect(() => {
    // setTimeout() 함수의 타이머 식별자를 변수에 담는다.
    const timerId = setTimeout(() => {
      const filteredData = searchUsers(input);
      // 필터링 된 값을 setSearch() 사용해 담는다.
      setSearch(filteredData);
    }, 1000);

    // 클린업 함수 작동 setTimeout() 이 실행 되기전에 clearTimeout() 실행 (debounce 효과)
    return () => clearTimeout(timerId);
  }, [input]);

  return (
    <>
      <input 
        type="text" 
        name="search-users" 
        id="search-users"
        className='search-users'
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <ul>
        {search.length === 0 ? (
          <li>검색 결과가 없습니다.</li>
        ) : (
          // return 키워드를 사용하지 않을 때 ()을 사용해 내용을 감싸준다.
          search.map(user => (
            <li key={user.idx}>{user.name}</li>
          ))
        )}
      </ul>
    </>
  )
}

export default App
```
