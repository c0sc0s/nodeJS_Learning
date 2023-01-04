const fs = require('fs');
const path = require('path');
const from = path.resolve(__dirname, "./files/abc.txt");
const to = path.resolve(__dirname, "./files/abc2.txt");

const rs = fs.createReadStream(from);
const ws = fs.createWriteStream(to);
rs.pipe(ws);