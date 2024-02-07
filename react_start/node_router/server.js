const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// 정적 파일을 제공할 디렉토리 설정
app.use(express.static(path.join(__dirname, "router/build")));

// 리액트 앱 호스팅
app.get("/react", (req, res) => {
  res.sendFile(path.join(__dirname, "router/build", "index.html"));
});

// 포트에서 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});