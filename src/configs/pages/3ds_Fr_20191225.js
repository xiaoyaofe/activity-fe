const baseParams = require("../baseConfig/3ds/Fr.js");

const activityParam = {
  groupId: "5de8d0fbb5cb6777ec08aaf2",
  // 活动ID
  actId: {
    // 转盘
    rotate: "5de8d0fbb5cb6777ec08aaf4",
    // 精灵球
    // sprite: "",
    // 累计登录
    everyLogin: "5de8d0fbb5cb6777ec08aaf3",
    // 七日登录
    // sevenLogin: "",
    // vip
    // vipReturn: "",
    // 3ds 随机抽奖, 充值送的礼包
    numLottery1: "5de8d0fbb5cb6777ec08aaf6",
    // 随机抽取的礼包
    numLottery2: "5de8d0fbb5cb6777ec08aaf7"
  },
  // 礼包ID
  rewardId: {
    // 转盘
    rotate: [
      "5de8d0fbb5cb6777ec08aafb",
      "5de8d0fbb5cb6777ec08aafc",
      "5de8d0fbb5cb6777ec08aafd",
      "5de8d0fbb5cb6777ec08aafe",
      "5de8d0fbb5cb6777ec08aaff",
      "5de8d0fbb5cb6777ec08ab00",
      "5de8d0fbb5cb6777ec08ab01",
      "5de8d0fbb5cb6777ec08ab02"
    ],
    // 精灵球
    // sprite: [],
    // 每日登录
    everyLogin: ['5de8d0fbb5cb6777ec08aaf8', '5de8d0fbb5cb6777ec08aaf9', '5de8d0fbb5cb6777ec08aafa'],
    // 3ds 随机抽奖, 充值送的礼包
    numLottery1: ["5de8d0fbb5cb6777ec08ab0f"],
    // 随机抽取的礼包
    numLottery2: [
      "5de8d0fbb5cb6777ec08ab10",
      "5de8d0fbb5cb6777ec08ab11",
      "5de8d0fbb5cb6777ec08ab12"
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