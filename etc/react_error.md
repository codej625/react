# 에러 해결 방법을 모아보자!

```
밑에 에러코드는 'C:\Users\user\AppData\Roaming\' 경로에 npm이 없기 때문에 발생하는 에러이다.
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
