const net = require('net');
const fs = require('fs');
const path = require('path');

const server = net.createServer();
server.listen(9527);

server.on("listening", () => {
  console.log("server listening on port 9527");
})


const img = path.resolve(__dirname, "./img/01.png");
server.on("connection", socket => {
  console.log("客户端连接服务器");
  socket.on("data", async chunk => {
    const fileBuffer = await fs.promises.readFile(img);
    const headBuffer = Buffer.from(`HTTP1.1 200 OK
Content-Type: image/jpeg

`, "utf-8");
    const res = Buffer.concat([headBuffer, fileBuffer])

    socket.write(res)
    socket.end();
  });
  socket.on("end", () => {
    console.log("连接关闭");
  })
})

