const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;

// 命令行传入页面名称, 
console.log(process.argv[2]);
// 第一步修改.env中的参数,如果有注释打开注释,如果没有就注释掉上一个,然后增加一个新的参数
fsPromises.readFile(path.resolve(__dirname, '../.env'), { encoding: 'utf-8', flag: 'r' })
  .then((res) => {
    // const result = /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res) && /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res)[1];
    // return result;
    console.log(res.split(/[\n|\r]/).filter(item => /^VUE_APP_PATH=.+$/.test(item)));
  })
  .catch((e) => { console.log(e) });
  // 新建config/pages中的配置文件, 最好是从数据库中跑出来活动id这些,

  // 创建pages文件夹,复制需要的app.vue 这些文件夹