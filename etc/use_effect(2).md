# useEffect에 대해 좀 더 알아보자!

<br />

```

간단 요약 3가지

```

<br />

```javascript
/* 컴포넌트가 렌더링 되면 실행 */

useEffect(() => {
  console.log('렌더링');
});
```

<br />

```javascript
/* 컴포넌트가 렌더링 되고 한번만 실행 */

useEffect(() => {
  console.log('렌더링');
}, []); /* dependency array에 array가 비어 있을 시 */
```

<br />

```javascript
/* 컴포넌트가 렌더링 되고 한번 실행 이후 dependency array 속에 value 상태가 변경될 때마다 실행 */

useEffect(() => {
  console.log('렌더링');
}, [value]);
```
