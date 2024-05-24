# JSX에 대해 알아보자!

<br /><br />

* JSX
---
1. JSX는 무엇일까?
```
JSX 는 리액트에서 생김새를 정의할 때, 사용하는 문법이다. 
얼핏보면 HTML 같이 생겼지만 실제로는 JavaScript 이다.
리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX 를 JavaScript 로 변환해준다.
```

<br /><br /><br />

2. JSX의 규칙
```
JSX 가 JavaScript 로 제대로 변환이 되려면 지켜주어야 하는 몇가지 규칙이 있다.
```

<br />

1\) 태그를 열었으면 꼭 닫아주어야 한다.
```html
<!-- ex) -->
<div></div> 

<!-- ex) input 또는 br같이 닫는 태그가 없을경우 Self Closing 태그를 사용해야 한다. -->
<input />
<br />
```

<br />

2\) 한개 이상의 태그는 무조건 하나의 태그로 감싸져 있어여 한다.
```html
<!-- ex) -->
<div>
  <div>1</div>
  <div>2</div>
</div>

<!-- ex) Fragment(프래그먼트)를 사용하여 태그를 감싸는 걸 추천한다. -->
<>
  <div></div>
</>

or

<Fragment>
  <div></div>
</Fragment>
```

<br />

3\) JSX 안에 자바스크립트 값 사용하기
```javascript
/* ex) JSX 내부에 자바스크립트 변수를 보여줘야 할 때에는 {} 으로 감싸서 보여준다. */

function App() {
  const name = 'react';

  return (
    <>
      <div>이름</div>
      <div>{name}</div>
    </>
  );
}
```

<br />

4\) style 과 className 설정하기
```
JSX 에서 태그에 style 과 CSS class 를 설정하는 방법은 HTML 에서 설정하는 방법과 다르다.
우선, 인라인 스타일은 객체 형태로 작성을 해야 하며, 
background-color 처럼 - 로 구분되어 있는 이름들은 backgroundColor 처럼 camelCase 형태로 네이밍을 해주어야 한다.
```

<br />

```javascript
/* ex) 인라인 스타일 적용 */
function App() {
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, /* 기본 단위 px */
    padding: '1rem' /* 다른 단위 사용 시 문자열로 설정 */
  }

  return (
    <>
      <Hello />
      <div style={style}>CSS</div>
    </>
  );
}

/* ex) CSS class 를 설정 할 때에는 class= 가 아닌 className= 으로 설정을 해주어야 한다. */
function App() {

  return (
    <>
      <Hello />
      <div className="gray-box"></div>
    </>
  );
}
```

<br />

5\) return 시 주의사항
```
* 여러 줄로 구성된 JSX를 반환할 때는 소괄호가 필요하다.

return (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```
```
* 여러줄이 아니라면 () 소괄호로 묶을 필요가 없다.

return <div>Hello World</div>;
```
