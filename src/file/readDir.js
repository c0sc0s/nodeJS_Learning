const fs = require('fs');
const path = require('path');
class File {
  constructor(filename, name, ext, isFile, size, createTime, updateTime) {
    this.filename = filename;
    this.name = name;
    this.ext = ext;
    this.isFile = isFile;
    this.size = size;
    this.createTime = createTime;
    this.updateTime = updateTime;
    this.isFile = isFile;
    this.createTime = createTime
  }

  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.filename);
      } else {
        return await fs.promises.readFile(this.filename, "utf-8")
      }
    }
    return null;
  }

  static async getFile(filename) {
    const stat = await fs.promises.stat(filename);
    const name = path.basename(filename);
    const ext = path.extname(filename);
    const isFile = stat.isFile();
    const size = stat.size;
    const createTime = new Date(stat.birthtime);
    const updateTime = new Date(stat.mtime);
    return new File(filename, name, ext, isFile, size, createTime, updateTime)
  }
}

async function getDir(filename) {
  let file = await File.getFile(filename);
  console.log(await file.getContent());
}

const fileName = path.resolve("./dist/index.dev.js")
getDir(fileName);
