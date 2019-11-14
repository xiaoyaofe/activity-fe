const baseParams = require("../baseConfig/3ds/th.js");

const activityParam = {
  groupId: "5dca57f1b5cb6715e856f596",
  // 活动ID
  actId: {
    // 登录
    login: "",
    // 预约
    reserve: "",
    //  许愿
    wish: "",
    // 有奖竞猜
    prize: "",
    // 转盘
    rotate: "5dca5838b5cb6715e856f599",
    // 積分
    score: "",
    // 宝箱
    box: "",
    // 翻翻乐
    flip: "",
    // 累计登录
    everyLogin: "5dca5811b5cb6715e856f597",
    // 累计充值
    paySum: "5dca5825b5cb6715e856f598",
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
    login: [],
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: [],
    // 有奖竞猜
    prize: [],
    // 转盘
    rotate: [
      '5dca6051b5cb6718ac9ccdf5',
      '5dca607cb5cb6718ac9ccdf6',
      '5dca60a4b5cb6718ac9ccdf7',
      '5dca60c8b5cb6718ac9ccdf8',
      '5dca60e6b5cb6718ac9ccdf9',
      '5dca610bb5cb6718ac9ccdfa',
      '5dca612eb5cb6718ac9ccdfb',
      '5dca614ab5cb6718ac9ccdfc',
    ],
    // 宝箱
    box: [

    ],
    // 翻翻乐
    flip: [],
    // 每日登录
    everyLogin: [
      '5dca5b8ab5cb6715e856f59c',
      '5dca5bb0b5cb6715e856f59f',
      '5dca5bdfb5cb6715e856f5a6',
      '5dca5c8eb5cb6718ac9ccdd2',
      '5dca5cc3b5cb6718ac9ccdd5',
      '5dca5d43b5cb6718ac9ccdd8',
      '5dca5d64b5cb6718ac9ccddb'
    ],
    // 累计充值
    paySum: [
      '5dca5debb5cb6718ac9ccdde',
      '5dca5e54b5cb6718ac9ccde5',
      '5dca5e7fb5cb6718ac9ccde8',
      '5dca5edfb5cb6718ac9ccdeb',
      '5dca5f10b5cb6718ac9ccdee',
      '5dca5f61b5cb6718ac9ccdf1',
      '5dca5fb6b5cb6718ac9ccdf4'
    ],
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