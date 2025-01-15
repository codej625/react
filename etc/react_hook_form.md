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

<br />
<br />
<br />

4. `Material UI` + `React Hook Form`

```tsx
import ReactDatePicker from "react-datepicker"
import { TextField } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"

// 폼의 데이터 타입을 정의
type FormValues = {
  ReactDatepicker: string
}

// App 컴포넌트를 정의
function App() {
  // useForm 훅을 사용하여 폼 상태를 관리 (handleSubmit 및 control을 사용)
  const { handleSubmit, control } = useForm<FormValues>()

  return (
    // 폼을 제출할 때 handleSubmit 함수가 호출
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* Controller 컴포넌트를 사용하여 폼 요소를 제어 */}
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          // ReactDatePicker 컴포넌트를 렌더링
          <ReactDatePicker
            onChange={onChange} // 값이 변경될 때 hook form에 값을 전송
            onBlur={onBlur} // 입력이 blur 될 때 알린다.
            selected={value} // 현재 선택된 값을 설정
          />
        )}
      />

      {/* 폼을 제출하는 버튼 */}
      <input type="submit" />
    </form>
  )
}

export default App;
```

<br />

| 객체 이름    | 이름         | 타입                     | 설명 |
|--------------|--------------|--------------------------|------|
| `field`      | `onChange`   | (value: any) => void     | 입력 값이 변경될 때 호출되는 함수. 이 함수는 `onChange` prop에 할당되어야 하며, 값을 라이브러리에 전달합니다. 폼 상태를 업데이트하므로 `setValue` 같은 API를 수동으로 호출하지 않아야 합니다. |
| `field`      | `onBlur`     | () => void               | 입력 요소가 포커스를 잃었을 때 호출되는 함수. 이 함수는 `onBlur` prop에 할당되어야 합니다. |
| `field`      | `value`      | unknown                  | 제어되는 컴포넌트의 현재 값. |
| `field`      | `disabled`   | boolean                  | 입력 요소의 비활성화 상태. |
| `field`      | `name`       | string                   | 등록된 입력 요소의 이름. |
| `field`      | `ref`        | React.ref                | 입력 요소를 hook form과 연결하기 위한 참조입니다. 오류가 있는 입력 요소로 포커스를 설정하려면 이 참조를 컴포넌트의 입력 참조에 할당합니다. |

<br />

| 객체 이름    | 이름         | 타입                     | 설명 |
|--------------|--------------|--------------------------|------|
| `fieldState` | `invalid`    | boolean                  | 현재 입력 요소의 유효하지 않은 상태. |
| `fieldState` | `isTouched`  | boolean                  | 현재 제어되는 입력 요소의 터치 상태. |
| `fieldState` | `isDirty`    | boolean                  | 현재 제어되는 입력 요소의 변경 상태. |
| `fieldState` | `error`      | object                   | 이 특정 입력 요소의 오류. |

<br />

| 객체 이름    | 이름         | 타입                     | 설명 |
|--------------|--------------|--------------------------|------|
| `formState`  | `isDirty`    | boolean                  | 사용자가 어떤 입력 요소든 수정한 후 true로 설정됩니다. 모든 입력 요소의 `defaultValues`를 `useForm`에 제공해야 폼 상태를 비교할 수 있습니다. |
| `formState`  | `dirtyFields`| object                   | 사용자가 수정한 필드의 객체. `defaultValues`를 `useForm`에 제공하여 폼 상태를 비교할 수 있습니다. |
| `formState`  | `touchedFields` | object               | 사용자가 상호작용한 모든 입력 요소를 포함하는 객체. |
| `formState`  | `defaultValues` | object               | `useForm`의 `defaultValues`에 설정된 값 또는 `reset` API를 통해 업데이트된 기본 값. |
| `formState`  | `isSubmitted` | boolean                | 폼이 제출된 후 true로 설정됩니다. `reset` 메서드가 호출될 때까지 유지됩니다. |
| `formState`  | `isSubmitSuccessful` | boolean        | 폼이 런타임 오류 없이 성공적으로 제출되었음을 나타냅니다. |
| `formState`  | `isSubmitting` | boolean               | 폼이 현재 제출 중인 경우 true, 그렇지 않은 경우 false. |
| `formState`  | `isLoading`  | boolean                  | 폼이 비동기 기본 값을 로드 중인 경우 true. 이 prop은 비동기 `defaultValues`에만 적용됩니다. |
| `formState`  | `submitCount`| number                   | 폼이 제출된 횟수. |
| `formState`  | `isValid`    | boolean                  | 폼에 오류가 없는 경우 true로 설정됩니다. `setError`는 `isValid` 상태에 영향을 미치지 않습니다. `isValid`는 항상 폼 전체의 유효성 검사 결과를 기반으로 합니다. |
| `formState`  | `isValidating` | boolean               | 유효성 검증 중인 경우 true로 설정됩니다. |
| `formState`  | `errors`     | object                   | 필드 오류를 포함하는 객체입니다. 오류 메시지를 쉽게 가져오기 위한 `ErrorMessage` 컴포넌트도 있습니다. |
