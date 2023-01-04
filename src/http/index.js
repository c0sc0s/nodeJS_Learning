const http = require('http');
const URL = require('url');
const path = require('path');
const fs = require('fs');


async function getStat(filename) {
  try {
    return await fs.promises.stat(filename)
  } catch {
    return null;
  }
}

async function handler(req, res) {
  const info = await getFileInfo(req.url);
  // console.log(info);
  res.write(info);
  res.end();
}

async function getFileInfo(url) {
  const { pathname } = URL.parse(url);
  let filename = path.resolve(__dirname, `./public${pathname}`);
  const stat = await getStat(filename);
  if (!stat) {
    console.log("文件不存在");
  } else if (stat.isDirectory()) {
    filename = path.resolve(__dirname, `./public${pathname}/index.html`);
    return await fs.promises.readFile(filename);
  } else {
    console.log("正常文件", filename);
    return await fs.promises.readFile(filename);
  }
}


const server = http.createServer(handler);
server.on("listening", () => {
  console.log("server listening on 1234");
})
server.listen(1234);


