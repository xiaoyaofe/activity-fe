const baseParams = require("../baseConfig/3ds/vn.js");

const activityParam = {
  groupId: "5de62180b5cb671f40c7d432",
  // 活动ID
  actId: {
    // 转盘
    rotate: "5de6235eb5cb671f40c7d43d",
    // 精灵球
    sprite: "5de62379b5cb671f40c7d43e",
    // 累计登录
    everyLogin: "5de621a6b5cb671f40c7d433",
    // 七日登录
    // sevenLogin: "",
    // vip
    // vipReturn: "",
    // 3ds 随机抽奖, 充值送的礼包
    numLottery1: "5de71be3b5cb671f40c7d461",
    // 随机抽取的礼包
    numLottery2: "5de7252fb5cb671f40c7d46a"
  },
  // 礼包ID
  rewardId: {
    // 转盘
    rotate: [
      "5de62b48b5cb671f40c7d44d",
      "5de62b75b5cb671f40c7d44e",
      "5de62b8eb5cb671f40c7d44f",
      "5de62badb5cb671f40c7d450",
      "5de62bc1b5cb671f40c7d451",
      "5de62bd5b5cb671f40c7d452",
      "5de62befb5cb671f40c7d453",
      "5de62c09b5cb671f40c7d454",
      "5de62c1fb5cb671f40c7d455",
      "5de62c33b5cb671f40c7d456",
      "5de62c45b5cb671f40c7d457",
      "5de62c59b5cb671f40c7d458"
    ],
    // 精灵球
    sprite: [
      "5de71bfcb5cb671f40c7d462",
      "5de71c09b5cb671f40c7d463",
      "5de71c16b5cb671f40c7d464",
      "5de71c23b5cb671f40c7d465",
      "5de71c2db5cb671f40c7d466",
      "5de71c3cb5cb671f40c7d467",
      "5de71c4db5cb671f40c7d468",
      "5de71c59b5cb671f40c7d469"
    ],
    // 每日登录
    everyLogin: ['5de62207b5cb671f40c7d436', '5de622b0b5cb671f40c7d437', '5de62339b5cb671f40c7d43c'],
    // 3ds 随机抽奖, 充值送的礼包
    numLottery1: ["5de71be3b5cb671f40c7d461"],
    // 随机抽取的礼包
    numLottery2: [
      "5de72585b5cb671f40c7d46c",
      "5de72594b5cb671f40c7d46d",
      "5de725a4b5cb671f40c7d46e",
      "5de725b6b5cb671f40c7d46f"
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