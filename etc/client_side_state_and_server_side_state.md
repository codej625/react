# 리액트에서 사용하는 두 가지의 상태

<br />
<br />

* 두 가지 종류의 상태

```
리액트에서 상태는 크게 Client에서 사용하는 상태와
Server에서 받아오는 상태로 나뉜다.

위에 두 가지 상태를 이해하고,
무엇을 이용해 state의 관리를 하는지 알아보자.
```

<br />
<br />
<br />
<br />

1. Client side state

```
클라이언트에서 발생하는 상태 값이다.

일반적으로 지역 상태(Local state)는 useState() 훅을 사용해서 관리하고,
전역 상태(Global state)는 Context API 혹은
Redux, Mobx, Zustand, jotai 등과 같은 State management library를 사용한다.
```

<br />
<br />
<br />

2. Server side state

```
서버에서 받아오는 상태 값이다.

일반적으로 API 서버 호출하여 받아오는 데이터(로그인 데이터, 기타 DB 데이터)를 말한다.

React query를 사용하는 것이 대세가 되고 있다.(비동기 처리와 로딩, 에러 핸들링이 간편하다.)
```

<br />
<br />
<br />

`간단 요약`

```
오랜 기간 Redux, Mobx를 사용하여 전역 상태관리로 상태를 처리하면서 
여러 상태가 효율적으로 관리되지 못했다.

하지만 더 가볍고 러닝 커브가 낮은 라이브러리의 등장과
React Query를 사용하여 비동기 처리의 방법이 효율적으로 변하면서
서버 상태 관리를 손쉽게 관리 할 수 있게 되었다.

결과적으로 클라이언트의 (전역)상태는 Zustand,
서버의 상태는 React Query를 사용하는 추세이다.
```

<br />

| Client side state | Server side state |
|-------------------|-------------------|
| useState() Hook + Context API or State management library | React Query |
