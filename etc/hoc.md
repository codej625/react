# HOC

<br />
<br />

* 고차 컴포넌트(HOC)?
---

```
고차 컴포넌트는 컴포넌트를 인자로 받아,
새로운 기능을 추가한 컴포넌트를 반환하는 컴포넌트이다.

"고차"라는 이름은 함수형 프로그래밍에서 유래했으며,
함수를 인자로 받거나 함수를 반환하는 함수를 뜻한다.

React에서는 기존 컴포넌트에
로직(예: 데이터 fetching, 상태 관리, 스타일 적용 등)을 재사용 가능하게 추가할 때 사용된다.
```

<br />
<br />
<br />
<br />

1. `HOC의 형태`

```
HOC는 다음과 같은 형태를 가진다.

WrappedComponent: 기존 컴포넌트.
higherOrderComponent: 기존 컴포넌트를 감싸 새로운 기능을 추가하는 함수.
EnhancedComponent: 추가 기능이 포함된 새로운 컴포넌트.

HOC는 컴포넌트 자체를 수정하지 않고,
props나 상태를 통해 기능을 확장한다.

이는 "컴포넌트 합성"과는 다르며,
주로 로직 재사용에 초점이 맞춰져 있다.
```

```tsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

<br />
<br />
<br />

2. `예시`

```
// 인증 및 권한 관리

사용자가 로그인했는지 확인하거나,
특정 권한이 있는 경우에만 컴포넌트를 렌더링하도록 제어할 수 있다.
```

```tsx
function withAuth(WrappedComponent) {
  return function(props) {
    const isAuthenticated = checkAuth(); // 인증 상태 확인 로직
    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <div>로그인이 필요합니다.</div>
    );
  };
}

const SecretPage = () => <div>비밀 페이지입니다!</div>;
const AuthenticatedSecretPage = withAuth(SecretPage);
```

<br />

```
// 데이터 fetching

API 호출과 같은 데이터 로딩 로직을 HOC로 분리해 재사용할 수 있다.
```

```tsx
function withDataFetching(WrappedComponent, apiUrl) {
  return class extends React.Component {
    state = { data: null, loading: true };

    componentDidMount() {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => this.setState({ data, loading: false }));
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}

const UserList = ({ data, loading }) => (
  loading ? <div>로딩 중...</div> : <ul>{data.map(user => <li>{user.name}</li>)}</ul>
);
const UserListWithData = withDataFetching(UserList, "https://api.example.com/users");
```

<br />

```
// 로깅 및 디버깅

컴포넌트의 생명주기나 props 변화를 추적하기 위해,
HOC를 사용할 수 있다.
```

```tsx
function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(`${WrappedComponent.name}가 마운트되었습니다.`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

const SimpleComponent = () => <div>간단한 컴포넌트</div>;
const LoggedComponent = withLogging(SimpleComponent);
```

<br />

```
// 스타일링 및 테마 적용

특정 스타일이나 테마를 여러 컴포넌트에 적용할 때 유용하다.
```

```tsx
function withTheme(WrappedComponent, theme) {
  return function(props) {
    return <WrappedComponent {...props} theme={theme} />;
  };
}

const Button = ({ theme }) => <button style={theme}>클릭</button>;
const ThemedButton = withTheme(Button, { backgroundColor: "blue", color: "white" });
```

<br />
<br />
<br />

3. HOC의 장점

```
1) 재사용성: 공통 로직을 여러 컴포넌트에 쉽게 적용 가능.

2) 추상화: 반복 코드를 줄이고, 관심사를 분리(Separation of Concerns) 가능.

3) 유연성: 기존 컴포넌트를 수정하지 않고도 기능 확장 가능.
```

<br />
<br />
<br />

4. HOC의 단점

```
1) props 충돌: HOC가 추가한 props가 기존 props와 이름이 겹칠 수 있음.
              이를 해결하려면 hoist-non-react-statics 같은 라이브러리를 사용.

2) 복잡성 증가: HOC를 중첩(nesting)하면 코드가 복잡해지고 디버깅이 어려워질 수 있음.

3) 정적 타입 문제: TypeScript와 같은 정적 타입 시스템에서 타입 정의가 까다로울 수 있음.
```

<br />
<br />
<br />

5. HOC의 대안

```
React 16.8에서 Hooks가 도입되면서 HOC의 사용 빈도가 줄어들고 있다.

Hooks는 더 간결하고 직관적인 방식으로 로직 재사용을 가능하게 한다.

ex) withAuth 대신 useAuth 훅 사용.
ex) withDataFetching 대신 useEffect와 useState 조합 사용.
```
