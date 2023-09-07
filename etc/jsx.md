# JSX에 대해 알아보자!

1. JSX는 무엇일까?
```
JSX 는 리액트에서 생김새를 정의할 때, 사용하는 문법이다. 
얼핏보면 HTML 같이 생겼지만 실제로는 JavaScript 이다.
리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX 를 JavaScript 로 변환해준다.
```
ex)
```javascript
return <div>안녕하세요</div>;
```

2. Babel은 무엇일까?
```
Babel 은 자바스크립트의 문법을 확장해주는 도구이다.
아직 지원되지 않는 최신 문법이나, 편의상 사용하거나 실험적인 자바스크립트 문법들을 정식 자바스크립트 형태로 변환해줌으로서 
구형 브라우저같은 환경에서도 제대로 실행 할 수 있게 해주는 역할을 한다.
```

3. JSX의 규칙
```
JSX 가 JavaScript 로 제대로 변환이 되려면 지켜주어야 하는 몇가지 규칙이 있다.
```

첫번째로 태그를 열었으면 꼭 닫아주어야 한다.
ex)
```
<div></div> 
```
<br/>
ex) input 또는 br같이 닫는 태그가 없을경우 Self Closing 태그를 사용해야 한다.
```
<input />
<br />
```
<br/>
두번째로 한개 이상의 태그는 무조건 하나의 태그로 감싸져 있어여 한다.
ex)
```html
<div>
  <div>1</div>
  <div>2</div>
</div>
```
ex) Fragment(프래그먼트)를 사용하여 태그들을 감싸는 걸 추천한다.
```html
<>
  <div>
  </div>
</>
```
<br/>
세번째로 JSX 안에 자바스크립트 값 사용하기
ex) JSX 내부에 자바스크립트 변수를 보여줘야 할 때에는 {} 으로 감싸서 보여준다.
```
<>
  <div>이름</div>
  <div>{name}</div>
</>
```
<br/>
네번째로 style 과 className 설정하기
```
JSX 에서 태그에 style 과 CSS class 를 설정하는 방법은 HTML 에서 설정하는 방법과 다르다.
우선, 인라인 스타일은 객체 형태로 작성을 해야 하며, 
background-color 처럼 - 로 구분되어 있는 이름들은 backgroundColor 처럼 camelCase 형태로 네이밍 해주어야 한다.
```
ex)
```
function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
    </>
  );
}
```
ex) CSS class 를 설정 할 때에는 class= 가 아닌 className= 으로 설정을 해주어야 한다.
```
function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }

  return (
    <>
      <Hello />
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
    </>
  );
}
```