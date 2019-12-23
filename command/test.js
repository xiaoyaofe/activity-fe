const fs = require('fs');
const path = require("path");
const fsPromises = fs.promises;

fsPromises.readFile(path.resolve(__dirname, '../src/configs/pages/vs_Tw_20200101.js'), { encoding: 'utf-8', flag: 'r' })
  .then((res) => {
    // const result = /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res) && /(?<!#)VUE_APP_PATH=(\S+)\s/.exec(res)[1];
    // return result;
    console.log(res)
    //   fs.writeFileSync(path.resolve(__dirname, `../src/configs/pages/${ name }.json`),
    //     activityInfo, { encoding: 'utf-8' });
  })
  .catch((e) => { console.log(e) });
// 第一步初始化整个内容 
// 配置文件中的内容
const test = `
  const baseParams = require("../baseConfig/vs-tw");
  const infoJsonStr = require("./${filename }.json")
  let info = {};
  try{
    info = JSON.parse("infoJsonStr");
  }catch(e){
    console.log(e);
  }
  const activityParam = {
    groupId: info.groupId,
    // 活动ID
    actId: info.actId,
    // 礼包ID
    rewardId:info.rewardId 
  };
  const params = Object.assign({
    fb: "",
    ga: "",
    // shareMeta: {
    //   "og:url": "https://pokeko.pocketgamesol.com/activity/20191001/index.html",
    //   "og:type": "website",
    //   "og:title": "神奇訓練師》國慶雙十大狂歡，限量萌寵神獸等你領~>",
    //   "og:image": "https://pokeko.pocketgamesol.com/activity/20191001/share.jpg"
    // },
    // 设置 : <link rel="icon" href="<%= BASE_URL + favicon %>">默认favicon.ico
    // favicon: "favicontw.ico"
  }, baseParams);
  module.exports = {
    dev: activityParam,
    build: activityParam,
    params
  }
  `