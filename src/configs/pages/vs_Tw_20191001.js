const baseParams = require("../baseConfig/vs-tw");

const activityParam = {
  groupId: "5d82d61bb5cb6717884d975d",
  // 活动ID
  actId: {
    // 登录
    login1: "5d82d6b9b5cb6717884d975e",
    login2: "5d82d7e9b5cb6717884d9762",
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
    box: "5d833242b5cb671600a69762",
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
    flightChess: "5d849adab5cb673424c63da9"
  },
  // 礼包ID
  rewardId: {
    // 登录
    login1: ["5d82d7b4b5cb6717884d9760", "5db291aab5cb6714cc3dbab4"],
    login2: ["5d82d813b5cb6717884d9764"],
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: [],
    // 有奖竞猜
    prize: [],
    // 转盘
    rotate: [],
    // 宝箱
    box: [
      "5d8332bfb5cb671600a69763", //1
      "5d8332f2b5cb671600a69764", //2
      "5d833304b5cb671600a69765", //3
      "5d83331ab5cb671600a69766", //4
      "5d833327b5cb671600a69767", //5
      "5d833383b5cb671600a6976e", //6
      "5d833394b5cb671600a69770", //7
      "5d8333a4b5cb671600a69772", //8
      "5d8333dfb5cb671600a69774", //9
      "5d8333ebb5cb671600a69775", //10
      "5d8333f9b5cb671600a69777", //11
      "5d833408b5cb671600a69779", //12
      "5d833418b5cb671600a6977b", //13
      "5d833425b5cb671600a6977d", //14
      "5d833432b5cb671600a6977f", //15
      "5d833441b5cb671600a69781", //16
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
      "5d849be7b5cb673424c63daa", //1
      "5d849c11b5cb673424c63dab", //2
      "5d849c51b5cb673424c63dac", //3
      "5d849c59b5cb673424c63dad", //4
      "5d849c61b5cb673424c63dae", //5
      "5d849c96b5cb673424c63daf", //6
      "5d849ca9b5cb673424c63db0", //7
      "5d849cbab5cb673424c63db1", //8
      "5d849cc9b5cb673424c63db2", //9
      "5d849cdeb5cb673424c63db3", //10
      "5d849cf1b5cb673424c63db4", //11
      "5d849cffb5cb673424c63db5", //12
      "5d849d0db5cb673424c63db6", //13
      "5d849d1db5cb673424c63db7", //14
      "5d849d50b5cb673424c63db8", //15
      "5d849d60b5cb673424c63db9", //16
      "5d849d70b5cb673424c63dba", //17
      "5d849d80b5cb673424c63dbb", //18
      "5d849d8fb5cb673424c63dbc", //19
      "5d849d9eb5cb673424c63dbd", //20
      "5d849dacb5cb673424c63dbe", //21
      "5d849dbab5cb673424c63dbf", //22
      "5d849dc7b5cb673424c63dc0", //23
      "5d849dd5b5cb673424c63dc1", //24
      "5d849debb5cb673424c63dc2", //25
      "5d849dfdb5cb673424c63dc3", //26
      "5d849e08b5cb673424c63dc4", //27
      "5d849e17b5cb673424c63dc5", //28
      "5d849e24b5cb673424c63dc6", //29
      "5d849e32b5cb673424c63dc7", //30
      "5d849e49b5cb673424c63dc8", //31
      "5d849e5cb5cb673424c63dc9", //32
      "5d849e6ab5cb673424c63dca", //33
      "5d849e7bb5cb673424c63dcb", //34
      "5d849e92b5cb673424c63dcc", //35
      "5d8c7a0fb5cb673a74accfba", //36
      "5d8c7a68b5cb673a74accfbb", //37
      "5d8c7aa2b5cb673a74accfbc", //38
      "5d8c7acdb5cb673a74accfbd", //39
      "5d8c7afab5cb673a74accfbe", //40
      "5d8c7b31b5cb673a74accfbf", //41
      "5d8c7b60b5cb673a74accfc0" //42
    ]
  }
};
const params = Object.assign({
  fb: "",
  ga: "",
  shareMeta: {
    "og:url": "https://pokeko.pocketgamesol.com/activity/20191001/index.html",
    "og:type": "website",
    "og:title": "神奇訓練師》國慶雙十大狂歡，限量萌寵神獸等你領~>",
    "og:image": "https://pokeko.pocketgamesol.com/activity/20191001/share.jpg"
  },
  // 设置<link rel="icon" href="<%= BASE_URL + favicon %>">默认favicon.ico
  favicon: ""
}, baseParams);
module.exports = {
  dev: activityParam,
  build: activityParam,
  params
}