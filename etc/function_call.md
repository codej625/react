# 리액트의 함수 호출 시 주의사항

<br /><br />

```
html과 jsx는 같은 문법을 사용하여 함수를 호출 시,
큰 문제가 생긴다.

예시를 보면서 알아보자.
```

<br /><br /><br />

1. html에서 함수 호출

```html
<button
  onclick="func();"  
>
  click
</button>
```

<br />

```
이벤트 핸들러를 설정할 때
함수 호출을 직접적으로 쓸 수 있다.
```

<br /><br />

2. react에서 함수 호출

```jsx
<button
  onClick={func()}
>
  click
</button>
```

<br />

```
리액트에서는 컴포넌트가 렌더링 되는 순간에 함수가 "즉시" 실행되기 때문에,
화살표 함수를 사용하여 함수의 "참조"하게 만들어야 클릭 시 에만 함수가 호출된다.
```

<br />

```jsx
<button
  onClick={()=> func()}
>
  click
</button>
```
