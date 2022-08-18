const express = require("express"); //express -> 웹서버
const http = require("http"); // node에 기본탑재된 모듈
const path = require("path"); // node에 기본탑재된 모듈, 서버가 구동되는 폴더의 절대 경로를 알려주는 모듈
const moment = require("moment");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server); //여기서 클라이언트로 데이터 내려줌..
// (io ->input,output)
app.use(express.static(path.join(__dirname, "/public")));
// 정적 파일 서비스하는 폴더를 지정 - css,js..
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

io.on("connection", (socket) => {
  console.log("클라이언트 연결 되었습니다.");
  socket.on("chatting", (data) => {
    console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", { nickName: data.nickName, msg: data.msg, time: sendTime });
  });
  // socket.on("yaho", (data) => {
  //   console.log(data);
  //   io.emit("yaho", "나는 클라이언트가 야호로 보낸 이벤트를 받아서 다시 야호로 이벤트를 발송하는 것입니다.");
  // });
});
app.get("/", (req, res) => {
  // res.send("hello node");
  res.sendFile(path.join(__dirname, "public/html/chatting.html"));
});
app.get("/chatting", (req, res) => {
  // res.send("chatting room");
  res.sendFile(path.join(__dirname, "public/html/chatting.html"));
});

// app.listen -> 웹서버
server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중22`);
});
