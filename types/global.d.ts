type version = "de" | "v1" | "v3";
/* webpack 定义值 */
declare const CONFIG: CONFIG;
declare const VUE_APP_BASE_URL: string;
declare const VUE_APP_PATH: string;
declare const VUE_APP_LANG: string;

declare const FB: any;

interface ProcessEnv {
  VUE_APP_BASE_URL: string;
  [key: string]: undefined | string;
}
interface Window {
  fbq: Function
  dataLayer: any[];
  fbAsyncInit: Function;
  _RG: {
    config: CONFIG;
  }
}

interface CONFIG {
  tip: any
  data: ActiveParams
}
interface ActiveParams {
  appId: string;
  fbId: string;
  kkId: string;
  groupId: string;
  // 德法为de , 越南、泰国攻城是v1，其他都是v3
  version: version;
  // 打点Id
  fb: string;
  ga: string;
  // 活动ID
  actId: {
    flightChess: string
    login: string;
    // 登录
    login1: string;
    login2: string;
    // 预约
    reserve: string;
    //  许愿
    wish: string;
    // 有奖竞猜
    prize: string;
    // 转盘
    rotate: string;
    // 積分
    score: string;
    // 宝箱
    box: string;
    // 翻翻乐
    flip: string;
    // 累计登录
    everyLogin: string;
    // 累计充值
    paySum: string;
    // 充值达成
    payReach: string;
    // 等级达成
    level: string;
    // 在线活跃
    active: string;
    // 老玩家回归
    oldPlayer: string;
  }
  // 礼包ID
  rewardId: {
    flightChess: string[];
    login: string[]
    // 登录
    login1: string[];
    login2: string[];
    //  许愿（wish[0]：goosId；wish[1]：wishReward；wish[2]：luckyReward）
    wish: string[];
    // 有奖竞猜
    prize: string[];
    // 转盘
    rotate: string[];
    // 宝箱
    box: string[];
    // 翻翻乐
    flip: string[];
    // 每日登录
    everyLogin: string[];
    // 累计充值
    paySum: string[];
    // 充值达成
    payReach: string[];
    // 等级达成
    level: string[];
    // 在线活跃
    active: string[];
    // 老玩家回归
    oldPlayer: string[]
  }
}

interface Api {
  login: string; //sdk登录接口
  fb_login: string; //fb登录接口
  kk_login: string; //kk登录接口
  zone: string; //区服接口
  role: string; //角色接口
  join: string; //参与活动接口
  info: string; //活动信息接口
  cdKeys: string; //礼包数据接口
  CdKeys_all: string; //获取所有礼包
  join_allPay: string; //累计充值接口
  info_allPay: string; //累计充值数据
  gifsList: string; //许愿中奖列表
  desireList: string; //许愿愿望列表
  getCount: string; //许愿次数
  makeWish: string; //许愿接口
  flip: string; //翻卡牌接口
  fflInfo: string;//翻卡牌信息接口
  reserveJoin: string;//预约接口
  roteJoin: string;//抽獎接口
  roteInfo: string;
  roteCdkeys: string;
  updateReward: string;//更新包礼包
  // 20190706
  roteRecharge: string
}

interface Tip {
  // api
  //102账号不存在或者密码错误
  code_102: string;
  //200恭喜你獲得了禮包，請到遊戲內查收
  code_200: string;
  //300对不起，您尚未在游戏内登入！无法领取
  code_300: string;
  //400服务器错误
  code_400: string;
  //401活动未开始
  code_401: string;
  //402活动已结束     
  code_402: string;
  //403激活码耗尽
  code_403: string;
  //405没有找到活动
  code_405: string;
  //1000非常抱歉，您尚未达到领取条件。
  code_1000: string;
  //1001登录次数不满足
  code_1001: string;
  // 1002请勿重复预约
  code_1002: string;
  //1005参与次数达上限，该礼包您已领取
  code_1005: string;
  //1006累计登录天数不满足
  code_1006: string;
  //1101邮件发送失败
  code_1101: string;
  // 登录
  // 請將登錄信息填寫完整
  login_info_null: string;
  // 请选择区服
  zone_null: string;
  // 该区服没有可用角色
  player_null: string;
  // 預約
  // 请输入正确的手机号码
  phone_null: string;
  // 恭喜预约成功 赶快登陆FB并参与抽奖吧！
  reserve_success: string;
  // 谢谢参与
  join_null: string;
  // 恭喜中奖
  join_success: string;
  // 你的獎勵是
  reward_txt: string;
  // 兌換碼：
  cdKeys: string;
  //弹窗
  //礼包名
  reward_name: string;
  // 激活碼
  code: string;
  // 時間
  time: string;
  // 區服
  serve: string;
  // 角色
  player: string;
  // 当前没有任何礼包数据
  giftArr_null: string;
  // 当前没有任何许愿中奖信息
  wishArr_null: string;
  // 许愿
  // 请输入愿望
  wish_null: string;
  // 您已成功許願
  wish_success: string;
  // 活动尚未结束，幸运名单将于2018/12/25 16:30后公布
  wish_search: string;
  // 有奖竞猜
  prize: string;
  // 转盘
  rotate: string;
  // 宝箱
  box: string;
  // 翻翻乐
  flip: string;
  // 每日登录
  everyLogin: string;
  // 累计充值
  paySum: string;
  // 充值达成
  payReach: string;
  // 等级达成
  level: string;
  // 在线活跃
  active: string;
  // 老玩家回归
  oldPlayer: string;
}

interface HTMLElement {
  href: string;
  tapObj: {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    distanceX: number;
    distanceY: number;
  };
  disabled: boolean;
  handler: (e: Event) => any;
  time: number
}