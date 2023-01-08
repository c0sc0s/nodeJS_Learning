const express = require("express");
const path = require("path");

const app = express();
const port = 9527;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})

// CORS中间件
app.use(require("cors")());

// 静态资源处理中间件
const staticRoot = path.resolve(__dirname, "../public")
app.use(express.static(staticRoot));

// cookieParser中间件
// 1. 会在req对象中注入 cookies 属性
// 2. 会在res对象中注入 cookie  方法
app.use(require("cookie-parser")())

// token解析中间件
app.use(require("./api/tokenMiddleware"))

// Url处理中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json("cos"));

// Routes:
app.use("/api/student", require("./api/Student"));
app.use("/api/admin", require("./api/Admin"));
app.use("/api/class", require("./api/Class"));
app.use("/api/book", require("./api/Book"));


// 错误处理中间件
app.use(require("./errorMiddleware"));

