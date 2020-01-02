const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;
const compressing = require('compressing');
/*
  对图片进行处理,缓解后期图片太多导致文件太大,最后清除一些页面
*/
async function main() {
  /* 拿到当前的目录 */
  const folderName = await fsPromises.readFile(path.resolve(__dirname, '../.env'), { encoding: 'utf-8', flag: 'r' })
    .then((res) => {
      const result = /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res) && /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res)[1];
      console.log('压缩目录: ' + result);
      return result;
    })
    .catch((e) => { console.log(e) });
  /* 没有配置页面目录退出 */
  if (!folderName) process.exit(1);
  const compressPath = path.resolve(__dirname, `../src/pages/${ folderName }/images`);
  const outPath = path.resolve(__dirname, `../src/common/images/${ folderName }.zip`);
  // 如果已经压缩过删除文件
  fs.unlink(outPath, (err) => {
    if (err) return;
    console.log('已成功删除 ' + outPath);
  });
  // 压缩
  compressing.zip.compressDir(compressPath, outPath)
    .then(() => {
      console.log(`${ compressPath } compress success!`);
    })
    .catch(err => {
      console.log(`${ compressPath } compress filed!`);
      console.error(err);
    });
}
main();
