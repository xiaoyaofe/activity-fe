const activityParam = {
  appId: "10092",
  fbId: "1088475561284955",
  kkId: "",
  groupId: "5d1dd5cdb5cb6721c81fa375",
  // 德法为de,越南、泰国攻城是v1，其他都是v3
  version: "de",
  // 打点Id
  fb: '414535968970102',
  ga: '',
  // 活动ID
  actId: {
    // 登录
    login: "5d1dd5f4b5cb6721c81fa376",
    // 预约
    reserve: "",
    //  许愿
    wish: "",
    // 有奖竞猜
    prize: "",
    // 转盘
    rotate: "5d1dd722b5cb6721c81fa382",
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
    oldPlayer: "5d1dd8b7b5cb6721c81fa391"
  },
  // 礼包ID
  rewardId: {
    // 登录
    login: ["5d1dd683b5cb6721c81fa379", "5d1dd6bab5cb6721c81fa37c", "5d1dd6edb5cb6721c81fa37f"],
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: [],
    // 有奖竞猜
    prize: [],
    // 转盘
    rotate: ["5d1dd806b5cb6721c81fa388", "5d1dd860b5cb6721c81fa38d", "5d1dd88cb5cb6721c81fa390"],
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
    oldPlayer: ["5d1dd936b5cb6721c81fa394"]
  }
};

module.exports = {
  dev: activityParam,
  build: activityParam
}