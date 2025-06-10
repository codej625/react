# 리액트에서 변경된 데이터를 비교하는 방법

<br />
<br />

* 리액트에서는 원본 데이터가 변경되면 어떤 식으로 비교할까?

---

```
웹 프론트엔드 개발 시 폼 데이터를 다루다 보면,
사용자가 입력한 값 중 변경된 내용만 추출하여 서버에 전송해야 하는 경우가 많다.

이는 불필요한 데이터 전송을 줄여 성능을 최적화하고,
서버의 부담을 줄이는 데 도움이 된다.

또한, 변경된 내용만을 명확히 파악하여 사용자에게 피드백을 제공하는 데도 유용하다.
```

<br />
<br />
<br />
<br />

1. ref를 이용한 원본 데이터 저장

```
폼 수정 시, 사용자가 수정하기 전의 원본 데이터를 보관하는 것이 중요하다.

이 원본 데이터는 수정 후 변경된 내용을 비교하는 기준이 된다.

React에서 이러한 상태를 관리하는 여러 방법이 있지만,
컴포넌트의 리렌더링과 독립적으로 값을 유지해야 할 때 useRef 훅을 사용하는 것이 효과적이다.

useRef는 .current 속성을 통해 값을 저장하며,
이 값의 변경이 컴포넌트의 리렌더링을 유발하지 않으므로,
불필요한 렌더링을 방지하면서 원본 데이터를 유지할 수 있다.
```

<br />
<br />
<br />

2. 간단한 사용 예시

```
아래는 Form을 Submit 했을때,
원본값과 비교하는 에시이다.
```

```ts
// 수정 시 로직

// 변경된 필드들을 저장할 객체 (예시)
const changedFields: Record<string, { oldValue: any; newValue: any }> = {};

// ...

const handleEditClick = () => {
  setIsEditing(true);

  // Form에 현재 값을 Set 한다.
  if (systemInfoData && asstInfoData) {
    setValue("systemId", systemInfoData?.systemId);
    setValue("systemNm", systemInfoData?.systemNm);

    setValue("assetId", asstInfoData?.assetId);
    setValue("assetNm", asstInfoData?.assetNm);

    // 수정 시, 값이 변경되었는지 확인하기 위한 Ref 값을 담는다.
    fieldDataRef.current = {
      ...systemInfoData,
      ...asstInfoData
    };
  }
};
```

```ts
// 폼 제출 시 로직

const handleSubmit = (data: SystemInfoData & AsstInfoData) => {
  const fieldData = fieldDataRef.current;

  // 변경된 필드들을 저장할 변수 (예시)
  const changedFields: Record<string, { oldValue: any; newValue: any }> = {};

  // 각 필드 비교
  Object.keys(data).forEach((key) => {
    const oldValue = fieldData?.[key as keyof typeof fieldData];
    const newValue = data[key as keyof typeof data];

    // 값이 변경되었는지 확인
    if (oldValue !== newValue) {
      changedFields[key] = {
        oldValue,
        newValue,
      };
    }
  });

  // 변경된 필드가 없으면 작동
  if (!!!(Object.keys(changedFields).length > 0)) {
    setIsEditing(false);
    // SNACKBAR OPEN
    enqueueSnackbar("변경된 항목이 없습니다.", { variant: "error" });
    return;
  }

  // ...

};
```
