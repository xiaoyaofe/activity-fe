const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;
const compressing = require('compressing');

async function main() {
  /* 拿到当前的目录 */
  const folderName = await fsPromises.readFile(path.resolve(__dirname, '../.env'), { encoding: 'utf-8', flag: 'r' })
    .then((res) => {
      const result = /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res) && /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res)[1];
      console.log('解压目录: ' + result);
      return result;
    })
    .catch((e) => { console.log(e) });
  /* 没有配置页面目录退出 */
  if (!folderName) process.exit(1);
  const compressFilePath = path.resolve(__dirname, `../src/common/images/${ folderName }.zip`);
  const outPath = path.resolve(__dirname, `../src/pages/${ folderName }`);

  function deleteall(path) {
    var files = [];
    console.log(fs.existsSync(path))
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        var curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteall(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };
  deleteall(path.resolve(outPath + '/images'))
  // 解压缩
  compressing.zip.uncompress(compressFilePath, outPath)
    .then(() => {
      console.log('success');
    })
    .catch(err => {
      console.error(err);
    });
}
main();