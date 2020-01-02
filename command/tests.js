const buf = Buffer.from("Node.js 技术栈", "utf-8");

console.log(buf);
console.log(buf.length);
const log = console.log;
log(buf.toString('utf-8', 0, 9));
log(buf.toString('utf-8', 0, 11));

const fs = require('fs');

const inputStream = fs.createReadStream('input.txt'); // 创建可读流
const outputStream = fs.createWriteStream('output.txt'); // 创建可写流

inputStream.pipe(outputStream); // 管道读写
