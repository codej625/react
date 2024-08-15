# React Router

<br /><br />

* React Router 설명
---

```
리액트 라우터(React Router)는
싱글 페이지 애플리케이션(SPA)에서 사용되는 라우팅을 관리하는 라이브러리이다.
SPA는 페이지 전환 없이 동적으로 콘텐츠를 변경할 수 있게 해준다.

리액트 라우터를 사용하면 URL을 기반으로,
다른 컴포넌트를 렌더링하여 사용자 경로를 관리할 수 있다.
```

<br /><br /><br />

1. BrowserRouter

```
가장 일반적으로 사용되는 라우터 컴포넌트이다.
HTML5의 history API를 사용하여 클라이언트 사이드에서 라우팅을 관리한다.
```

```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}
```


<br /><br /><br />

2. Route

```
경로와 그에 따른 컴포넌트를 정의하는 데 사용된다.
path 속성에는 경로를,
component 속성에는 해당 경로에 매칭되었을 때 렌더링할 컴포넌트를 지정한다.
```

```javascript
<Route path="/about" component={About} />
```


<br /><br /><br />

3. Switch

```
여러 Route를 감싸서 첫 번째로 매칭되는 경로만 렌더링하도록 한다.
Switch를 사용하면 라우팅이 중첩되지 않고 예상대로 작동할 수 있다.

예를 들면,
Switch 없이 Route들을 나열했을 때는
/about이 /about과 /about/:id 둘 다에 매칭되어 두 Route 모두 렌더링될 수 있다.
Switch를 사용하면 이러한 중첩된 렌더링이 발생하지 않고, 예상대로 라우팅이 작동하게 된다.
```

```javascript
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/users" component={Users} />
  <Route component={NotFound} />
</Switch>
```


<br /><br /><br />

4. Link

```javascript
페이지 간의 링크를 생성하는 컴포넌트.
클릭 시 브라우저의 URL을 변경하고,
해당 경로의 컴포넌트를 렌더링한다.
```

```
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </div>
  );
}
```

<br /><br /><br />

5. 그 외

```
1) exact 속성

경로와 정확히 일치할 때만 컴포넌트를 렌더링하도록 한다.
```
```javascript
<Route exact path="/" component={Home} />
```

<br />

```
2) Nested Routes

중첩된 라우트를 사용하여 복잡한 페이지 구조를 정의할 수 있다.
```

<br />

```
3) History 객체

브라우저의 history API를 사용하여 페이지 이동을 관리할 수 있다.
(history.push, history.replace 등).
```
