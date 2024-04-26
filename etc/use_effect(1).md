# useEffect에 대해 알아보자!

<br />

```
어떤 component를
Mount(화면에 첫 렌더링), Update(다시 렌더링), Unmount(화면에서 사라질 때) 단계에서
특정 작업을 처리할 코드를 실행시키고 싶을 때 사용한다.

밑에서 useEffect의 몇가지 특징을 알아보자.
```

<br /><br />

1. useEffect는 크게 두 가지 형태가 있다.

```javascript
/* 1) 첫번째 인수로 받은 콜백 함수가 작동한다. */

useEffect(() => {
  /* 작업 ... */
});
```
```

렌더링 될 때마다 useEffect의 첫번째 인수인 콜백 함수가 실행된다.

```

<br />

```javascript
/* 2) 두 번째 인수인 배열 값이 렌더링을 제어한다. */

useEffect(() => {
  /* 작업 ... */
}, [value]);
```
```
첫 렌더링이 실행 될 때와 [value] 값이 바뀔 때 첫번째 인수인 콜백 함수가 실행된다.
두 번째 인수인 배열은 dependency array라고 불리며,
useEffect(() => {}, []); 처럼 빈값을 넣을 시 화면이 첫 렌더링이 될 때만 콜백함수가 작동하고 그 후로는 작동하지 않는다.
```

<br /><br />

2. useEffect의 메모리 누수 방지(Clean-up)
```
Component는 Mounting(Render) -> Updating(Render) -> Unmounting(Clean-up) 순서로 생명주기를 갖는다.
만약 Component를 Unmount(화면에서 Component가 사라지면) 시,
Mount 되면서 실행된 로직은 Unmount(화면에서 Component가 사라져도) 되어도 계속 작동할 수 있다.
이렇게 되면 의도와는 다른 상황이 발생하므로 작동 중인 로직을 정리(Clean-up)해줘야 한다.

밑에 예시를 보자.
```

```javascript
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      console.log('로직 수행');
    }, 1000);

    /* 컴포넌트가 언마운트될 때 타이머를 클리어 한다. */
    return () => {
      clearTimeout(timerId);
      console.log('컴포넌트가 언마운트될 때 타이머를 클리어한다.');
    };
  }, []);

  return (
    <>
      {/* 컴포넌트의 내용 */}
    </>
  );
}

export default MyComponent;
```

```
useEffect의 return(반환)으로 클린업 함수를 하나 만들어주고 로직을 정리하면 된다.
클린업은 컴포넌트의 생명 주기를 관리하고 메모리 누수를 방지하기 위해 중요한 개념이니 꼭 이해가 필요하다.
```
