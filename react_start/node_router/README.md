# express를 사용해서 front-end server를 구축해보자!

<br />

1) react와 express를 설치 한다.

```node
npm install express react react-dom
```

<br />

2) server.js 파일을 만든다.

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

/* 정적 파일을 제공할 디렉토리 설정 */
app.use(express.static(path.join(__dirname, '{project_name}/build')));

/* 리액트 앱 호스팅 */
app.get('/react', (req, res) => {
  res.sendFile(path.join(__dirname, '{project_name}/build', 'index.html'));
});

/* 포트에서 서버 실행 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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