# Data fetching 예시

<br /><br />

```jsx
function Note(props) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/notes/${props.id}`)
      .then(res => res.json())
      .then(result => setNote(result))
  }, [props.id]])

  if (note == null) {
    return "Loading";
  }
  else {
    return (/* render note here... */);
  }
}
```

<br />

```
위 방식으로 데이터를 불러오는 부모와 자식 컴포넌트가 있다고 가정.

각 컴포넌트에서 데이터를 요청하는 경우
실제 컴포넌트가 렌더링 될 때 필요한 데이터만 가져와 보여줄 수 있다는 장점이 있지만,
클라이언트와 서버 사이의 API 요청은 늘어나게 된다.

또한 부모 컴포넌트는 컴포넌트 렌더링 후
필요한 데이터를 받아오기 시작하고 이 과정이 끝나기 전까지
자식 컴포넌트의 렌더링과 API 호출이 지연되며 불필요한 렌더링이 발생한다.
```

<br /><br /><br />

* 출처

```
https://tech.kakaopay.com/post/react-server-components/#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%84%9C%EB%B2%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8rsc%EC%99%80-%EC%84%9C%EB%B2%84-%EC%82%AC%EC%9D%B4%EB%93%9C-%EB%A0%8C%EB%8D%94%EB%A7%81ssr
```
