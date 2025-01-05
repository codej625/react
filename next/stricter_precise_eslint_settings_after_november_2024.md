# Stricter Precise ESLint Settings After November 2024.

<br />
<br />

* 24년 11월 이후 엄밀해진 ESLint 설정에 대해 알아보자
---

```
ESLint 관련 설정이 기존보다 조금 더 엄밀하게 변경되었다.

구체적으로는 any 타입을 명시적으로 지정하거나 또는
사용하지 않는 변수를 선언해 둘 경우 오류가 발생한다.

이런 엄밀한 규칙은 공부중 실습에 오히려 방해가 될 수 있기 때문에,
ESLint 옵션 파일의 규칙을 수정한 다음 공부를 진행하시는 걸 추천한다.
```

<br />
<br />
<br />
<br />

1. ".eslintrc.json" 설정 수정하기

```
해당 파일의 설정 값을 수정하여,
공부 진행 시 원활한 환경을 만들어보자.
```

```json
// .eslintrc.json

{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

<br />

```
* rules에 추가한 옵션 별 의미

@typescript-eslint/no-unused-vars: "warn" -> 사용하지 않는 변수가 있을 때 경고로 표시
"@typescript-eslint/no-explicit-any": "off" -> any 타입을 명시적으로 정의할 수 있도록 허용
```
