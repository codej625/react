# express를 사용해서 front-end server를 구축해보자!

<br />

1) react와 express, cors를 설치 한다.

```node
npm install express react react-dom
npm install cors
```

<br />

2) server.js 파일을 만든다.

```javascript
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;
/* {port} 포트에서 서버 실행 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
const cors = require('cors');
app.use(cors());

/* 정적 파일을 제공할 디렉토리 설정 */
app.use(express.static(path.join(__dirname, '{project_name}/build')));

/* 리액트 앱 호스팅 */
app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, '{project_name}/build', 'index.html'));
});
```

<br />

3) react앱을 생성하고 빌드한다.

```node
npx create-react-app {project_name}
cd {project_name}
npm run build
```

<br />


4) 프로젝트 구조 참고

```
your-project/
  ├── client/
  │   ├── build/
  │   │   ├── (리액트 앱 빌드 파일들)
  │   ├── src/
  │   │   ├── (리액트 앱 소스 파일들)
  │   ├── package.json
  │   ├── ...
  ├── server.js
  ├── package.json
  └── ...
```

<br />

5) Express 서버 시작

```node
node server.js
```

<br />
<br />

```
리액트에서 라우팅을 담당하는 경우?

서버에서도, 리액트에서도 라우팅을 담당해줄 수 있다. 
(리액트는 react-router-dom을 설치하면 된다.) 

하지만 리액트 라우터로 ex) localhost:5000/list 이렇게 직접 URL을 입력하면 안 된다.

왜냐면 브라우저에서의 요청은 서버에게 요청하는 거지 리액트 라우터에게 라우팅 요청하는 게 아니기 때문이다. 

이걸 리액트가 라우팅하게 전권을 넘기고 싶다면 server.js 에 다음과 같은 코드를 추가한다.
```
```javascript
(server.js에 추가)

app.get('*', function (요청, 응답) {
  응답.sendFile(path.join(__dirname, '/react-project/build/index.html'));
});
```
```
이 코드는 항상 가장 하단에 놓아야 오류가 없다.
```