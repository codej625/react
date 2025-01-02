# CSS Module

<br />
<br />

* Next에서 CSS Module을 사용하는 이유
---

```
Next는 _app 컴포넌트를 제외한 다른 컴포넌트에서
개별적으로 CSS를 Import 하는 것을 금지하고 있다.

여러개의 CSS에서 클래스 명이 겹쳐,
생길 수 있는 오류를 원천적으로 방지하기 위함이다.

그래서 글로벌(전역) CSS 적용이 가능한 컴포넌트는
모든 컴포넌트의 부모 컴포넌트인 _app뿐인 것이다.

그럼 컴포넌트마다 개별적인 CSS를 사용하려면 어떻게 해야 할까?

Next에서는 CSS Module이라는 걸 지원하는데,
Next에서 내부적으로 여러 개의 CSS가 겹치지 않게 관리해주는 기능이다.
```

<br />
<br />
<br />
<br />

1. CSS Module 사용

```
일반적으로 CSS 파일을 만들고 import ＂{경로명}＂을 적어주면 끝이지만,
CSS Module은 컴포넌트가 속해있는 경로에 {컴포넌트명}.module.css라고
이름을 지어주는 게 일반적이다.

(다시 한 번 말하지만, Next에서 글로벌 CSS를 Import 하는 것은 _app에서만 가능하다.)
```

```css
// 에시 index.module.css

.h1 {
  color: red;
}
.h2 {
  color: blue;
}
```

```ts
// 예시 index.tsx

// CSS Moudle을 Import하고 이름을 준다.
import style from "./index.module.css";

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>Index</h1>
      <h2 className={style.h2}>Index</h2>
    </>
  );
}
```
