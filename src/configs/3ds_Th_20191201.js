const baseParams = require("./baseConfig/3ds/th.js");

const activityParam = {
  groupId: "",
  // 活动ID
  actId: {
    // 登录
    login1: "",
    login2: "",
    // 预约
    reserve: "",
    //  许愿
    wish: "",
    // 有奖竞猜
    prize: "",
    // 转盘
    rotate: "",
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
    login1: [],
    login2: [],
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: [],
    // 有奖竞猜
    prize: [],
    // 转盘
    rotate: [],
    // 宝箱
    box: [

    ],
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
  // 设置<link rel="icon" href="<%= BASE_URL + favicon %>">默认favicon.ico
  favicon: ""
}, baseParams);
module.exports = {
  dev: activityParam,
  build: activityParam,
  params
}