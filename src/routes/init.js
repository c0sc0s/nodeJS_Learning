const express = require("express");
const path = require("path");

const app = express();
const port = 9527;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})

// 静态资源处理中间件
const staticRoot = path.resolve(__dirname, "../public")
app.use(express.static(staticRoot));

// Url处理中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes:
app.use("/api/student", require("./api/Student"));
app.use("/api/admin", require("./api/Admin"));
app.use("/api/class", require("./api/Class"));
app.use("/api/book", require("./api/Book"));


// 错误处理中间件
app.use(require("./errorMiddleware"));

