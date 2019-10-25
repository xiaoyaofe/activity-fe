const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;
const compressing = require('compressing');

async function main() {
  /* 拿到当前所有的压缩文件 */
  function getFolders(path) {
    var folders = [];
    if (fs.existsSync(path)) {
      zipFileNames = fs.readdirSync(path);
      zipFileNames.forEach(function (zipFileName, index) {
        folders.push(zipFileName.split('.')[0])
      });
    }
    return folders;
  };
  const folderNameArr = getFolders(path.resolve(__dirname, `../src/common/images`));
  folderNameArr.forEach(unzip);
  
  function unzip(folderName) {
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
}
main();