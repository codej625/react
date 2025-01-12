# React Hook Form

<br />
<br />

* Form의 사용을 편하게 하는 Library
---

```
React Hook Form 라이브러리를 사용하면,
제어 컴포넌트와 상태를 관리하는것보다
코드가 적어지고 성능이 더 좋다.
(React Hook Form은 비제어 컴포넌트 기반)

즉, React Hook Form은 불필요한 재렌더링을 제거하는 동시에,
작성해야 하는 코드 양을 줄여준다.
```

<br />
<br />
<br />
<br />


1. `패키지 설치`

```
// npm 사용

npm install react-hook-form
```

<br />
<br />
<br />

2. `패키지 Import`

```tsx
// 사용하려는 패키지에 Import

import { useForm, SubmitHandler } from "react-hook-form";
```

<br />
<br />
<br />

3. `예시 코드`

```tsx
import { useForm, SubmitHandler } from "react-hook-form";

// 폼 데이터의 타입을 정의
type Inputs = {
  example: string,
  exampleRequired: string,
};

export default function App() {
  // react hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("example")) // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}
```

<br />

|register|handleSubmit|watch|formState|
|-|-|-|-|
|폼 요소를 등록하는 함수|폼 제출을 처리하는 함수|폼 필드의 현재 값을 관찰하는 함수|폼 상태를 나타내는 객체로, 여기서는 errors를 사용|


