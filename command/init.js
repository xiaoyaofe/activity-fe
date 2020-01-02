/* 
  初始化所有的文件 当开始一个新的页面时复制所有的基础文件,并生成所有的需要的文件

*/
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
  // 新建config/pages中的配置文件, 活动id已经拿到,需要写入js文件


  // 创建pages文件夹,复制需要的app.vue 这些文件夹

  // 第三步添加打包上传测试服加 map 这些
  