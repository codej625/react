# React Hook Form

<br />
<br />

* 리액트 훅 폼을 사용해서 요소 추가하기 예제
---

```
리액트로 화면 설계를 하다 보면,
버튼을 사용하여 화면을 추가하거나
삭제해야 하는 경우가 있다.

이럴 때 참고(만) 할 수 있는 예시 코드이다.
```

<br />
<br />
<br />
<br />

1. 코드 예시

```tsx
import React, { memo } from 'react';
// Material UI Core Components
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText,
  Box, Stack, IconButton, Typography, Divider,
  Grid // 레이아웃을 위해 Grid 컴포넌트 사용
} from '@mui/material';
// Material UI Icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// React Hook Form
import {
  useForm, // 폼 상태 및 유효성 검사 관리
  SubmitHandler, // 제출 성공 핸들러 타입
  SubmitErrorHandler, // 제출 실패 핸들러 타입
  useFieldArray, // 동적 배열 필드 관리
  Controller, // MUI와 같은 제어 컴포넌트를 react-hook-form과 연결
  Control // useFieldArray와 Controller에 필요
} from 'react-hook-form';

// 유효성 검사 스키마 (선택 사항 - 복잡한 유효성 검사 시 사용)
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup'; // 예시: Yup 라이브러리 사용 시

// 기타 훅/라이브러리 (사용자의 코드에 맞춰 가정)
import { useTranslation } from 'react-i18next'; // 다국어 처리
import { enqueueSnackbar } from 'notistack'; // 스낵바 알림

// 데이터 쿼리 훅 (사용자의 코드에 맞춰 가정)
import { usePostCapecCreate } from "../../queries/cve-query";

// 인터페이스 (사용자의 코드에 맞춰 가정)
// ZDialogProps는 필요하다면 Dialog 컴포넌트 prop에 직접 매핑
import { ZDialogProps } from "../../common/interfaces";
// ExecutionFlow와 Mitigation 인터페이스는 해당 파일에서 임포트
// 이 인터페이스들에 step, phase, description, mitigation 속성이 정의되어 있다고 가정
import { ExecutionFlow, Mitigation } from "./CapecListDetails";

// 옵션 데이터 (사용자의 코드에 맞춰 가정)
import {
  ABSTRACTION, // 추상화 레벨 옵션 (또는 Status?)
  EXECUTION_FLOW_STEP, // 실행 흐름 순서 옵션
  LIKELI_HOOD_OF_ATTACK, // 공격 가능성 옵션
  TYPICAL_SEVERITY, // 일반적 심각도 옵션
  // Status에 대한 별도의 옵션 데이터가 필요할 수 있습니다.
} from "../../sample-data/external-sample-codes";

// Select 컴포넌트 옵션 데이터 타입 정의
interface SelectOption {
  code: string;
  i18n: string; // 번역 키를 담는다고 가정
}


///////////////////////////////////////////////////////////////////////////////
// 인터페이스
///////////////////////////////////////////////////////////////////////////////

// ZDialogProps의 open, onClose를 직접 사용
interface RegisterCpeDialogProps {
  open: boolean;
  onClose?: () => void;
}

// 폼 데이터 구조 인터페이스
interface IRegisterCapecData {
  capecId: string; // API 요구사항에 따라 number일 수도 있습니다. 확인 필요.
  name: string;
  abstraction: string;
  status: string; // Status에 맞는 옵션 데이터 확인 필요
  likelihoodOfAttack: string;
  typicalSeverity: string;
  description: string;
  executionFlows: ExecutionFlow[]; // useFieldArray 사용하므로 선택 사항 아님
  mitigations: Mitigation[]; // useFieldArray 사용하므로 선택 사항 아님
}

// (선택 사항) 유효성 검사 스키마 정의 (Yup 예시)
// const schema = yup.object().shape({
//   capecId: yup.string().required('CAPEC ID는 필수입니다.'),
//   name: yup.string().required('이름은 필수입니다.'),
//   abstraction: yup.string().required('추상화 레벨은 필수입니다.'),
//   status: yup.string().required('상태는 필수입니다.'),
//   likelihoodOfAttack: yup.string().required('공격 가능성은 필수입니다.'),
//   typicalSeverity: yup.string().required('일반적 심각도는 필수입니다.'),
//   description: yup.string().required('설명은 필수입니다.'),
//   executionFlows: yup.array().of(
//     yup.object().shape({
//       step: yup.string().required('순서는 필수입니다.'),
//       phase: yup.string().required('단계는 필수입니다.'),
//       description: yup.string().required('설명은 필수입니다.'),
//     })
//   ).min(1, '실행 흐름은 최소 하나 이상 있어야 합니다.'), // 최소 항목 수 검증
//   mitigations: yup.array().of(
//     yup.object().shape({
//       mitigation: yup.string().required('완화 방안은 필수입니다.'),
//     })
//   ), // 최소 항목 수 검증 등 필요 시 추가
// });


///////////////////////////////////////////////////////////////////////////////
// 컴포넌트
///////////////////////////////////////////////////////////////////////////////

// React.FC를 사용하여 함수형 컴포넌트 정의
const RegisterCapecDialogPureMui: React.FC<RegisterCpeDialogProps> = memo(({ open, onClose }) => {
  const { t } = useTranslation(); // 다국어 훅 사용
  const { enqueueSnackbar } = useSnackbar(); // 스낵바 훅 사용

  // 1. useForm 훅 초기화
  const methods = useForm<IRegisterCapecData>({
    // 폼의 기본값 설정
    defaultValues: {
      capecId: '',
      name: '',
      abstraction: '',
      status: '',
      likelihoodOfAttack: '',
      typicalSeverity: '',
      description: '',
      // useFieldArray로 관리할 배열 필드는 기본값에 빈 항목을 포함
      executionFlows: [
        { step: '', phase: '', description: '' }
      ], // 최소 1개 항목으로 시작
      mitigations: [
        { mitigation: '' }
      ], // 최소 1개 항목으로 시작
    },
    // (선택 사항) 외부 유효성 검사 스키마 사용 시 resolver 설정
    // resolver: yupResolver(schema),
  });

  // useForm에서 필요한 함수와 상태 가져오기
  const { handleSubmit, control, register, formState: { errors } } = methods;


  // 2. useFieldArray 훅 호출 (executionFlows 배열 관리)
  const {
    fields: executionFlowFields, // 렌더링할 실행 흐름 항목 배열
    append: appendExecutionFlow, // 실행 흐름 항목 추가 함수
    remove: removeExecutionFlow, // 실행 흐름 항목 삭제 함수
  } = useFieldArray({
    control, // useForm에서 받은 control 객체 전달
    name: 'executionFlows', // 폼 데이터의 속성 이름
  });

  // 3. useFieldArray 훅 호출 (mitigations 배열 관리)
   const {
     fields: mitigationFields, // 렌더링할 완화 방안 항목 배열
     append: appendMitigation, // 완화 방안 항목 추가 함수
     remove: removeMitigation, // 완화 방안 항목 삭제 함수
   } = useFieldArray({
     control, // useForm에서 받은 control 객체 전달
     name: 'mitigations', // 폼 데이터의 속성 이름
   });


  // 데이터 등록 뮤테이션 훅 (사용자의 훅 그대로 사용)
  const createMutation = usePostCapecCreate();


  // 폼 제출 성공 시 실행될 콜백
  // data 객체에는 useFieldArray로 관리되는 배열 데이터도 포함되어 있습니다.
  const onSubmitSuccess: SubmitHandler<IRegisterCapecData> = (data) => {
    console.log("Final Payload:", data);

    // 뮤테이션 실행
    createMutation.mutate(data, { // 최종 데이터(data)를 바로 페이로드로 사용
      onSuccess: () => {
        console.log("등록 성공");
        onClose?.(); // 다이얼로그 닫기
        enqueueSnackbar("등록 성공", { variant: "success" }); // 성공 알림
      },
      onError: (error: any) => { // 에러 타입 필요 시 명시
        console.error("등록 실패:", error);
        enqueueSnackbar(`등록 실패: ${error.message || '알 수 없는 오류'}`, { variant: "error" }); // 실패 알림
      },
    });
  };

  // 폼 제출 실패 시 (유효성 검사 오류) 실행될 콜백
   const onSubmitError: SubmitErrorHandler<IRegisterCapecData> = (errors) => {
     console.error("Form validation errors:", errors);
     // errors 객체에 유효성 검사 오류 정보가 상세히 담겨 있습니다.
     // 여기에 특정 필드에 대한 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
     enqueueSnackbar("폼 입력값을 확인해주세요.", { variant: "warning" }); // 경고 알림
   };


  // Select 컴포넌트 옵션 데이터 변환 (번역 적용)
  const getTranslatedOptions = (options: SelectOption[]): { value: string; label: string }[] => {
      // options 배열이 SelectOption 타입을 따른다고 가정
      return options.map(option => ({
          value: option.code, // valueKey에 해당하는 값
          label: t(option.i18n) // labelKey에 해당하는 값 (번역 적용)
      }));
  }

  // 각 Select 필드에 필요한 옵션 데이터 준비
  const abstractionOptions = getTranslatedOptions(ABSTRACTION as SelectOption[]);
  // Status 옵션 데이터 (ABSTRACTION을 사용하셨으나, Status에 맞는 별도 데이터 필요 가능성 높음)
  const statusOptions = getTranslatedOptions(ABSTRACTION as SelectOption[]); // TODO: 실제 Status 옵션 데이터로 변경 필요
  const likelihoodOptions = getTranslatedOptions(LIKELI_HOOD_OF_ATTACK as SelectOption[]);
  const severityOptions = getTranslatedOptions(TYPICAL_SEVERITY as SelectOption[]);
  const executionStepOptions = getTranslatedOptions(EXECUTION_FLOW_STEP as SelectOption[]);


  // 렌더링
  return (
    // 4. Material UI Dialog 컴포넌트 사용 (ZDialog 대체)
    <Dialog
      open={open} // 부모 컴포넌트로부터 open 상태 받음
      onClose={onClose} // 닫기 요청 시 부모의 onClose 함수 호출
      maxWidth="sm" // 최대 너비 설정
      fullWidth // Dialog 콘텐츠가 maxWidth까지 확장되도록 설정
      disableEscapeKeyDown // Esc 키로 닫기 비활성화 (modal prop과 유사한 제어)
      // BackdropProps={{ invisible: !modal }} // modal prop 처리가 필요하다면
    >
      {/* Dialog 제목 */}
      <DialogTitle>{"CAPEC 등록"}</DialogTitle> {/* 제목 텍스트 */}

      <Divider /> {/* 제목과 콘텐츠 사이 구분선 */}

      {/* Dialog 콘텐츠 영역 - 폼 입력 필드들이 들어갑니다. */}
      <DialogContent dividers> {/* 상단/하단 구분선 있는 콘텐츠 영역 */}
        {/* 5. HTML form 태그 사용 및 react-hook-form의 handleSubmit 연결 */}
        {/* 버튼이 form 태그 밖에 있으므로 onSubmit 이벤트 핸들러 자체는 필요 없을 수 있습니다. */}
        {/* 하지만 useFormContext를 사용하는 자식 컴포넌트를 위해 FormProvider는 여전히 필요합니다. */}
        {/* FormContainer 컴포넌트가 onSubmit을 handleSubmit(onSuccess, onError)로 연결해 주므로, */}
        {/* 여기서는 form 태그는 생략하고 FormProvider만 사용해도 될 것 같습니다. */}
        {/* FormContainer 구현을 보면 formContext가 있으면 <form> 태그를 렌더링하므로, */}
        {/* 여기서 별도의 form 태그는 필요 없습니다. */}

        {/* FormContainer가 FormProvider를 제공하므로, 내부 필드들은 context에 접근 가능 */}
        {/* useForm()으로 생성한 methods를 formContext prop으로 전달 */}
        {/* onSuccess와 onError prop도 FormContainer의 구현에 따라 전달 */}
        {/* submit 버튼은 DialogActions에 별도로 있으므로, onSubmit 핸들러를 연결하지 않음 */}
        {/* handleSubmit 호출은 아래 DialogActions의 버튼 onClick에서 수행 */}


          {/* Form Layout using Material UI Grid */}
          <Grid container spacing={2}> {/* 메인 Grid 컨테이너 (컬럼 간 간격 설정) */}

            {/* 기본 정보 섹션 */}
            <Grid item xs={12}> {/* 전체 너비 (xs=12) 사용 */}
                <Typography variant="h6" gutterBottom>기본 정보</Typography> {/* 섹션 제목 */}
                <Grid container spacing={2}> {/* 기본 정보 필드들을 위한 내부 Grid (2컬럼 등) */}
                    {/* capecId 필드 */}
                    <Grid item xs={12} sm={6}> {/* 작은 화면 12컬럼, 중간 화면 이상 6컬럼 */}
                        {/* Controller를 사용하여 react-hook-form과 MUI 입력 컴포넌트 연결 */}
                        <Controller
                            name="capecId" // 폼 데이터의 필드 이름
                            control={control} // useForm에서 받은 control 객체 전달
                            rules={{ required: 'CAPEC ID는 필수입니다.' }} // 유효성 검사 규칙 정의
                            render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태를 받아옴
                                <TextField
                                    {...field} // onChange, onBlur, value 등 필드 기본 속성 연결
                                    label={t("TisCapecInfoM.CAPEC_ID")} // 라벨
                                    fullWidth // 부모 Grid item 너비에 맞춤
                                    required // 필수 입력 시각적 표시
                                    error={!!error} // 에러 상태 여부
                                    helperText={error ? error.message : null} // 에러 메시지 표시
                                    variant="outlined" // 디자인 형태
                                />
                            )}
                        />
                    </Grid>
                     {/* name 필드 */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: '이름은 필수입니다.' }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    label={t("TisCapecAttackpattern.name")}
                                    fullWidth
                                    required
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                     variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    {/* abstraction 필드 (Select 사용) */}
                     <Grid item xs={12} sm={6}>
                         <Controller
                            name="abstraction"
                            control={control}
                             rules={{ required: '추상화 레벨은 필수입니다.' }}
                            render={({ field, fieldState: { error } }) => (
                                 // Select를 사용하려면 FormControl, InputLabel, Select, MenuItem 필요
                                <FormControl fullWidth required error={!!error} variant="outlined">
                                    <InputLabel>{t("TisCapecAttackpattern.abstraction")}</InputLabel>
                                     <Select
                                         {...field} // value, onChange 등 연결
                                         label={t("TisCapecAttackpattern.abstraction")} // 라벨
                                    >
                                         {/* 옵션 데이터 매핑 */}
                                         {abstractionOptions.map(option => (
                                             <MenuItem key={option.value} value={option.value}>
                                                 {option.label}
                                             </MenuItem>
                                         ))}
                                     </Select>
                                    {/* 에러 발생 시 HelperText 표시 */}
                                    {error && <FormHelperText>{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                     </Grid>
                    {/* status 필드 (Select 사용) */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="status"
                            control={control}
                            rules={{ required: '상태는 필수입니다.' }}
                            render={({ field, fieldState: { error } }) => (
                                 // Select를 사용하려면 FormControl, InputLabel, Select, MenuItem 필요
                                <FormControl fullWidth required error={!!error} variant="outlined">
                                    <InputLabel>{t("TisCapecAttackpattern.status")}</InputLabel>
                                    <Select
                                        {...field} // value, onChange 등 연결
                                        label={t("TisCapecAttackpattern.status")} // 라벨
                                    >
                                        {/* TODO: Status에 맞는 실제 옵션 데이터 사용 */}
                                        {statusOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                   {/* 에러 발생 시 HelperText 표시 */}
                                   {error && <FormHelperText>{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                    </Grid>
                     {/* likelihoodOfAttack 필드 (Select 사용) */}
                    <Grid item xs={12} sm={6}>
                         <Controller
                            name="likelihoodOfAttack"
                            control={control}
                            rules={{ required: '공격 가능성은 필수입니다.' }}
                            render={({ field, fieldState: { error } }) => (
                                 // Select를 사용하려면 FormControl, InputLabel, Select, MenuItem 필요
                                 <FormControl fullWidth required error={!!error} variant="outlined">
                                    <InputLabel>{t("TisCapecAttackpattern.likelihood_of_attack")}</InputLabel>
                                     <Select
                                         {...field} // value, onChange 등 연결
                                         label={t("TisCapecAttackpattern.likelihood_of_attack")} // 라벨
                                    >
                                         {likelihoodOptions.map(option => (
                                             <MenuItem key={option.value} value={option.value}>
                                                 {option.label}
                                             </MenuItem>
                                         ))}
                                     </Select>
                                    {/* 에러 발생 시 HelperText 표시 */}
                                    {error && <FormHelperText>{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                     </Grid>
                     {/* typicalSeverity 필드 (Select 사용) */}
                    <Grid item xs={12} sm={6}>
                         <Controller
                            name="typicalSeverity"
                            control={control}
                            rules={{ required: '일반적 심각도는 필수입니다.' }}
                            render={({ field, fieldState: { error } }) => (
                                 // Select를 사용하려면 FormControl, InputLabel, Select, MenuItem 필요
                                 <FormControl fullWidth required error={!!error} variant="outlined">
                                    <InputLabel>{t("TisCapecAttackpattern.typical_severity")}</InputLabel>
                                     <Select
                                         {...field} // value, onChange 등 연결
                                         label={t("TisCapecAttackpattern.typical_severity")} // 라벨
                                    >
                                         {severityOptions.map(option => (
                                             <MenuItem key={option.value} value={option.value}>
                                                 {option.label}
                                             </MenuItem>
                                         ))}
                                     </Select>
                                    {/* 에러 발생 시 HelperText 표시 */}
                                    {error && <FormHelperText>{error.message}</FormHelperText>}
                                </FormControl>
                            )}
                        />
                     </Grid>

                </Grid> {/* 기본 정보 내부 Grid 끝 */}
            </Grid> {/* 기본 정보 섹션 끝 */}


            {/* Description 필드 섹션 (전체 너비) */}
            <Grid item xs={12}> {/* 전체 너비 사용 */}
                <Typography variant="h6" gutterBottom>{t("TisCapecAttackpattern.description")}</Typography> {/* 섹션 제목 */}
                 <Controller
                    name="description"
                    control={control}
                     rules={{ required: '설명은 필수입니다.' }} // 유효성 검사 규칙
                    render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태
                        <TextField
                            {...field} // onChange, onBlur, value 등 연결
                            label={t("TisCapecAttackpattern.description")} // 라벨
                            fullWidth // 부모 Grid item 너비에 맞춤
                            multiline // 여러 줄 입력
                            rows={4} // 기본 행 수
                            required // 필수 입력 표시
                            error={!!error} // 에러 상태 여부
                            helperText={error ? error.message : null} // 에러 메시지 표시
                            variant="outlined"
                        />
                    )}
                />
            </Grid>

            {/* Execution Flows 섹션 (useFieldArray 사용) */}
            <Grid item xs={12}> {/* 전체 너비 사용 */}
                <Typography variant="h6" gutterBottom>Execution Flows</Typography> {/* 섹션 제목 */}
                <Stack spacing={2}> {/* 각 실행 흐름 항목 간 간격 설정 */}
                    {/* executionFlowFields 배열을 map 순회하며 항목 렌더링 */}
                    {executionFlowFields.map((field, index) => (
                         // 각 실행 흐름 항목 컨테이너
                         // useFieldArray에서 제공하는 field.id를 key로 사용 (가장 안정적)
                         <Box key={field.id} sx={{ border: '1px dashed #ccc', p: 2, position: 'relative' }}>
                             {/* 항목 내부 레이아웃을 위한 Grid */}
                             <Grid container spacing={2}> {/* 항목 내부 필드 간 간격 */}
                                {/* "순서" 필드 (Select 사용) */}
                                 <Grid item xs={12} sm={6}> {/* 항목 내부 Grid에서의 크기 */}
                                    <Typography variant="body1" component="label" sx={{ display: 'block', mb: 1 }}>순서</Typography> {/* 라벨 */}
                                    <Controller
                                        name={`executionFlows.${index}.step`} // useFieldArray 필드 이름 규칙: 배열이름[인덱스].필드이름
                                        control={control} // control 전달
                                        rules={{ required: '순서는 필수입니다.' }} // 유효성 검사 규칙
                                        render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태
                                             <FormControl fullWidth required error={!!error} variant="outlined">
                                                <InputLabel>순서</InputLabel>
                                                <Select
                                                     {...field} // value, onChange 등 연결
                                                     label="순서"
                                                >
                                                     {/* 실행 흐름 순서 옵션 매핑 */}
                                                     {executionStepOptions.map(option => (
                                                         <MenuItem key={option.value} value={option.value}>
                                                             {option.label}
                                                         </MenuItem>
                                                     ))}
                                                </Select>
                                               {/* 에러 발생 시 HelperText 표시 */}
                                               {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                 </Grid>
                                 {/* "단계" 필드 */}
                                 <Grid item xs={12} sm={6}>
                                   <Typography variant="body1" component="label" sx={{ display: 'block', mb: 1 }}>단계</Typography> {/* 라벨 */}
                                   <Controller
                                      name={`executionFlows.${index}.phase`} // useFieldArray 필드 이름
                                      control={control} // control 전달
                                      rules={{ required: '단계는 필수입니다.' }} // 유효성 검사 규칙
                                      render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태
                                          <TextField
                                              {...field} // onChange, onBlur, value 등 연결
                                              label="단계" // 라벨 (Typography가 라벨 역할 시 생략 가능)
                                              fullWidth
                                              required
                                              error={!!error}
                                              helperText={error ? error.message : null}
                                              variant="outlined"
                                          />
                                      )}
                                  />
                                 </Grid>
                                {/* "설명" 필드 (항목 내부에서 전체 너비) */}
                                 <Grid item xs={12}>
                                   <Typography variant="body1" component="label" sx={{ display: 'block', mb: 1 }}>설명</Typography> {/* 라벨 */}
                                   <Controller
                                      name={`executionFlows.${index}.description`} // useFieldArray 필드 이름
                                      control={control} // control 전달
                                      rules={{ required: '설명은 필수입니다.' }} // 유효성 검사 규칙
                                      render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태
                                          <TextField
                                              {...field} // onChange, onBlur, value 등 연결
                                              label="설명" // 라벨 (Typography가 라벨 역할 시 생략 가능)
                                              fullWidth
                                              multiline
                                              rows={2} // 기본 행 수
                                              required
                                              error={!!error}
                                              helperText={error ? error.message : null}
                                              variant="outlined"
                                          />
                                      )}
                                  />
                                 </Grid>
                             </Grid> {/* 항목 내부 Grid 끝 */}

                            {/* 항목 삭제 버튼 */}
                            {/* 항목 Box 컨테이너의 우측 상단에 절대 위치 */}
                             <IconButton
                                 size="small"
                                 onClick={() => removeExecutionFlow(index)} // useFieldArray remove 함수 호출
                                 aria-label={`remove execution flow ${index + 1}`} // 접근성 라벨
                                 sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }} // 절대 위치 설정
                                 color="error" // 아이콘 색상
                             >
                                 <RemoveCircleOutlineIcon /> {/* 삭제 아이콘 */}
                             </IconButton>
                         </Box>
                    ))}
                    {/* 실행 흐름 항목 추가 버튼 */}
                    {/* 목록 아래에 별도로 배치 */}
                    <Button
                      startIcon={<AddCircleOutlineIcon />} // 추가 아이콘
                      onClick={() => appendExecutionFlow({ step: '', phase: '', description: '' })} // useFieldArray append 함수 호출 (새 항목 기본값)
                      variant="outlined" // 버튼 스타일
                      size="small" // 버튼 크기
                      sx={{ alignSelf: 'flex-start' }} // Flex 컨테이너(Stack)에서 왼쪽 정렬
                    >
                      실행 흐름 추가
                    </Button>
                </Stack>
            </Grid> {/* Execution Flows 섹션 끝 */}


            {/* Mitigations 섹션 (useFieldArray 사용) */}
            <Grid item xs={12}> {/* 전체 너비 사용 */}
                 <Typography variant="h6" gutterBottom>Mitigations</Typography> {/* 섹션 제목 */}
                 <Stack spacing={2}> {/* 각 완화 방안 항목 간 간격 설정 */}
                     {/* mitigationFields 배열을 map 순회하며 항목 렌더링 */}
                     {mitigationFields.map((field, index) => (
                          // 각 완화 방안 항목 컨테이너
                          // useFieldArray에서 제공하는 field.id를 key로 사용
                          <Box key={field.id}
                               sx={[
                                   {
                                      // Item specific border and background
                                      border: "1px solid #CCC",
                                      borderRadius: 1,
                                      backgroundColor: "#F2F2F2",
                                      py: 1,
                                      px: 2,
                                      // 항목 내부 레이아웃을 위한 Flexbox (라벨 | 입력 | 삭제 버튼)
                                      display: "flex",
                                      alignItems: "center", // 세로 중앙 정렬
                                      gap: 1, // 요소 간 간격
                                   },
                                    // Dark mode styles (예시)
                                    (theme) =>
                                      // @ts-ignore // applyStyles가 theme 타입에 없으면 무시
                                      (theme as any).applyStyles?.("dark", {
                                         backgroundColor: "#434343",
                                         borderColor: "#696969",
                                       }),
                               ]}
                          >
                               {/* "대응책" 라벨 (첫 번째 Flex 아이템) */}
                               {/* ZGridRows subjectWidth와 비슷하게 고정 너비 설정 */}
                                <Typography variant="body1" component="label" sx={{ flexShrink: 0, width: '85px' }}>
                                   대응책
                                </Typography>
                                {/* 입력 필드 (두 번째 Flex 아이템) */}
                                {/* 남은 공간 모두 차지 */}
                                <Controller
                                    name={`mitigations.${index}.mitigation`} // useFieldArray 필드 이름
                                    control={control} // control 전달
                                    rules={{ required: '완화 방안은 필수입니다.' }} // 유효성 검사 규칙
                                    render={({ field, fieldState: { error } }) => ( // 필드 및 에러 상태
                                        <TextField
                                            {...field} // onChange, onBlur, value 등 연결
                                            label="완화 방안" // 라벨 (Typography가 라벨 역할 시 생략 가능)
                                            fullWidth // Flex item 내에서 전체 너비 시도
                                            multiline // 여러 줄 입력
                                            rows={2} // 기본 행 수
                                            required // 필수 입력 표시
                                            error={!!error} // 에러 상태 여부
                                            helperText={error ? error.message : null} // 에러 메시지 표시
                                            variant="outlined"
                                            sx={{ flexGrow: 1 }} // 남은 공간 차지
                                        />
                                    )}
                                />
                                {/* 항목 삭제 버튼 (세 번째 Flex 아이템) */}
                                {/* IconButton 사용, 크기 변하지 않도록 설정 */}
                                <IconButton
                                    size="small"
                                    onClick={() => removeMitigation(index)} // useFieldArray remove 함수 호출
                                    aria-label={`remove mitigation ${index + 1}`} // 접근성 라벨
                                    color="error" // 아이콘 색상
                                    sx={{ flexShrink: 0 }} // 축소 방지
                                >
                                    <RemoveCircleOutlineIcon /> {/* 삭제 아이콘 */}
                                </IconButton>
                           </Box>
                     ))}
                    {/* 완화 방안 항목 추가 버튼 - 목록 아래 별도 배치 */}
                     <Button
                       startIcon={<AddCircleOutlineIcon />} // 추가 아이콘
                       onClick={() => appendMitigation({ mitigation: "" })} // useFieldArray append 함수 호출 (새 항목 기본값)
                       variant="outlined" // 버튼 스타일
                       size="small" // 버튼 크기
                        sx={{ alignSelf: 'flex-start' }} // Flex 컨테이너(Stack)에서 왼쪽 정렬
                     >
                       대응책 추가
                     </Button>
                 </Stack>
            </Grid> {/* Mitigations 섹션 끝 */}


          </Grid> {/* 메인 Grid 컨테이너 끝 */}

          {/* 실제 폼 제출은 DialogActions의 버튼 클릭으로 이루어집니다. */}
          {/* FormContainer는 FormProvider를 제공하고 useFormContext를 쓰는 자식들이 작동하게 합니다. */}
          {/* <form> 태그가 FormContainer 내부에 렌더링된다고 가정하고 여기서는 생략합니다. */}


      </DialogContent> {/* Dialog 콘텐츠 끝 */}

      <Divider /> {/* 콘텐츠와 버튼 영역 사이 구분선 */}

      {/* Dialog 버튼 영역 */}
      <DialogActions sx={{ p: 2, justifyContent: 'center' }}> {/* 패딩 및 중앙 정렬 */}
        {/* "취소" 버튼 */}
        <Button onClick={onClose} startIcon={<HighlightOffIcon />} color="secondary">
          취소
        </Button>
        {/* "등록" 버튼 */}
        {/* 이 버튼 클릭 시 useForm의 handleSubmit 함수 호출하여 폼 제출 로직 실행 */}
        {/* type="submit" 속성은 필요 없습니다. */}
        <Button
          onClick={handleSubmit(onSubmitSuccess, onSubmitError)} // handleSubmit 연결
          startIcon={<CheckCircleOutlineIcon />} // 아이콘
          variant="contained" // 채워진 버튼 스타일
          color="primary" // 기본 색상
          // disabled={createMutation.isLoading || methods.formState.isSubmitting} // 제출 중 비활성화 (선택 사항)
        >
          등록
        </Button>
      </DialogActions> {/* Dialog Actions 끝 */}

    </Dialog> // Dialog 컴포넌트 끝
  );
});

export default RegisterCapecDialogPureMui;
```
