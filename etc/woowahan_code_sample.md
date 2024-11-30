# 우아한 기술 블로그 샘플

<br />
<br />

* 실무에서 사용되는 수준의 코드(참고용)
---

```
공부용 예시보다는,
실무용에 가까운 참고용 코드이다.
(코드 작성 240529 쉬운 버전)
```

<br />
<br />
<br />

1. dependencies

```
react@18.X.X + typescript@5.X.X
@tanstack/react-query@5.X.X
zustand@4.X.X
msw@2.X.X
```

<br />
<br />

2. components

```tsx
const Identification = ({ referrer, onFinish }) => {
  const [someText, setSomeText] = useState('');

  /* zustand 스토어 */
  const { needExtraAuthentication } = useMemberStore();

    /* React Query API 호출 */
  const { data, error, isFetching } = useQuery({
    // ...
    queryFn: () =>
      fetchIdentificationInfo({
        // ...
      }),
    // ...
  });

  // ...

  const showExtraInformation = referrer === 'something' || needExtraAuthentication;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) {
      // ...
    } else {
      // ...
      setSomeText(e.target.value);
    }
  };

  const handleClickButton = () => {
    // ...
    onFinish(someText);
  };

    // ...  

  useEffect(() => {
    if (error) {
      // ...
      window.location.replace('https://HOST/fail');
    }
  }, [error]);

  if (isFetching) return <Loading aria-label="화면을 불러오는 중" />;

  return (
    <div>
      <h1>인증을 시작합니다</h1>
      {/* 컴포넌트 코드 ... */}
      <label id="comment-label">Comment</label>
      <input type="text" value={someText} onChange={handleChangeInput} aria-labelledby="comment-label"></input>
      {/* 컴포넌트 코드 ... */}
      {showExtraInformation && <ExtraInfomation>부가 정보</ExtraInforamtion>}
      {/* 컴포넌트 코드 ... */}
      <button type="button" onClick={handleClickButton}>
        확인
      </button>
    </div>
  );
};
```

<br />
<br />
<br />

```
코드 작성자 배민근
출처 https://techblog.woowahan.com/17721
```
