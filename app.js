const express = require("express");
const app = express();
const port = 80;

// DB 연결, schemas/index.js를 통해 DB 연결 
const connect = require("./schemas");
connect();

// 미들웨어로 들어오는 http요청을 json으로 파싱
app.use(express.json());

// 라우터 구성
const indexRouter = require("./routes/index")
const postsRouter = require("./routes/posts");
app.use("/", indexRouter);
app.use("/api", postsRouter);

app.listen(port, () => {
  console.log("Server is running. PORT :", port);
});