# 에러 해결 방법을 모아보자!

<br />

1. 
```
'C:\Users\user\AppData\Roaming\' 경로에 npm이 없기 때문에 발생하는 에러이다.
해결 방법은
'C:\Users\user\AppData\Roaming\' 경로로 이동해서 npm 폴더를 만들어주면 해결 된다.
```
```node
npm ERR! code ENOENT
npm ERR! syscall lstat
npm ERR! path C:\Users\user\AppData\Roaming\npm
npm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory, lstat 'C:\Users\user\AppData\Roaming\npm'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent
```

<br />

2. 
```node
react-scripts 은(는) 내부 또는 외부 명령 실행할 수 있는 프로그램 또는 배치 파일이 아닙니다.
```
```
해결 방법은 "npm update" 명령어를 사용해서 npm을 업데이트 한다.
```