/* 
  从测试的活动管理后台爬取活动信息并保存在 src/configs/pages/xxx.json 
  xxx对应js配置文件的文件名
  
  author: zongjiang.get
  time: 2019-12-23
*/
const axios = require('axios');
const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;

const groupId = process.argv[2];

axios({
  method: 'post',
  url: "http://172.16.3.144:8081/admin/group/get",
  headers: {
    "Authorization": "Basic em9uZ2ppYW5nLmdlOjEyM0BhYmM=",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  data: `actId=${ groupId }`
}).then(res => {
  const { title, appId, groupId } = res.data.state.activityGroupBase;
  const result = {
    title,
    appId,
    groupId,
    actId: {},
    rewardId: {}
  };
  res.data.state.activityDecoratorList.forEach((item, index) => {
    result.actId[item.activityBase.activityDescription || 'act' + (index + 1)] = item.activityBase.actId
    result.rewardId[item.activityBase.activityDescription || 'act' + (index + 1)] = item.activityBase.rewards
  });
  const activityInfo = JSON.stringify(result);
  fsPromises.readFile(path.resolve(__dirname, '../.env'), { encoding: 'utf-8', flag: 'r' })
    .then((res) => {
      // const result = /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res) && /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res)[1];
      // return result;
      const str = res.split(/[\n|\r]/).filter(item => /^VUE_APP_PATH=.+$/.test(item))[0];
      const name = str.split('=')[1];
      fs.writeFileSync(path.resolve(__dirname, `../src/configs/pages/${ name }.json`),
        activityInfo, { encoding: 'utf-8' });
    })
    .catch((e) => { console.log(e) });

})