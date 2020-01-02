const http = require('http');
const fs = require('fs');
const path = require("path");
const chalk = require("chalk");

const templete1 = `
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
  <title>Test</title>
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
  </noscript>
  <%content%>
  <!-- built files will be auto injected -->
</body>

</html>
`;

var server = http.createServer(function (req, res) {

  //   //设置响应头
  res.writeHead(200, { "Content-Type": "text/html" });
  //检测服务器状态
  res.writeHead(200, 'Okay')
  // const static = path.resolve(__dirname, "../dist/");
  // const files = fs.readdirSync(static);
  try {   //可能会导致错误的代码
    // var fileContent = fs.readFileSync(__dirname + '/static' + req.url)
    res.write(templete1, 'string')
    // res.body = templete1;
  } catch (error) {   //在错误发生时怎么处理
    res.writeHead(404, 'not Found')
  }
  //结束传输
  res.end()
});

server.listen(9000);

console.log('Server running at ' + chalk.green('http://127.0.0.1:9000'))
// const static = path.resolve(__dirname, "../dist/");
// const files = fs.readdirSync(static);
// var content = {};
// files.forEach((item, index) => {
//   // 拼接绝对路径
//   const filePath = path.join(static, item);
//   //拿到文件信息对象
//   const stats = fs.statSync(filePath);
//   if (stats.isDirectory()) {
//     content += `<a href="/${}"></a>`
//   } else {
//     result.children.push({
//       path: filePath,
//       name: path.basename(filePath),
//       type: 'file',
//       deep: depth
//     });
//     jsonObj.children.push({
//       // 文件名
//       name: path.basename(filePath),
//       description: '',
//     });
//   }
// });