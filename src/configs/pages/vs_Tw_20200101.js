const baseParams = require("../baseConfig/vs-tw");

const activityParam = {
  groupId: "5dd3544fb5cb6722a057a4e2",
  // 活动ID
  actId: {
    // 登录
    login: "5dd3544fb5cb6722a057a4e4",
    // 预约
    reserve: "",
    //  许愿
    wish: "",
    // 有奖竞猜
    prize: "",
    // 转盘
    rotate: "5dd3544fb5cb6722a057a4e3",
    // 積分
    score: "",
    // 宝箱
    box: "",
    // 翻翻乐
    flip: "",
    // 累计登录
    everyLogin: "",
    // 累计充值
    paySum: "",
    // 充值达成
    payReach: "",
    // 等级达成
    level: "",
    // 在线活跃
    active: "",
    // 老玩家回归
    oldPlayer: "",
    // 骰子
    dice: "",
    flightChess: ""
  },
  // 礼包ID
  rewardId: {
    // 登录
    login: ['5dd3544fb5cb6722a057a4f1'],
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: [],
    // 有奖竞猜
    prize: [],
    // 转盘
    rotate: [
      '5dd3544fb5cb6722a057a4e7',//1
      '5dd3544fb5cb6722a057a4e8',//2
      '5dd3544fb5cb6722a057a4e9',//3
      '5dd3544fb5cb6722a057a4ea',//4
      '5dd3544fb5cb6722a057a4eb',//5
      '5dd3544fb5cb6722a057a4ec',//6
      '5dd3544fb5cb6722a057a4ed',//7
      '5dd3544fb5cb6722a057a4ee',//8
      '5dd3544fb5cb6722a057a4ef',//9
      '5dd3544fb5cb6722a057a4f0',//10
      '5dd3544fb5cb6722a057a4e5',//11
      '5dd3544fb5cb6722a057a4e6' //12
    ],
    // 宝箱
    box: [],
    // 翻翻乐
    flip: [],
    // 每日登录
    everyLogin: [],
    // 累计充值
    paySum: [],
    // 充值达成
    payReach: [],
    // 等级达成
    level: [],
    // 在线活跃
    active: [],
    // 老玩家回归
    oldPlayer: [],
    // 骰子
    dice: [],
    flightChess: [

    ]
  }
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