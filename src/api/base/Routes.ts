/* 所有的路由  */

/* 登录的接口开始 */

// sdk平台登录接口
export const login = "/user/sdk/login";
//fb登录接口
export const fb_login = "/user/fb/login";
//kk登录接口
export const kk_login = "/user/kk/login";
//区服接口
export const zone = "/user/sdk/zones";
//角色接口
export const role = "/user/player/list";

/* 登录的接口结束 */

/* 活动接口的开始 */

//参与活动接口
export const join = "/activity/join";
//活动信息接口
export const info = "/activity/info";
//礼包数据接口
export const cdKeys = "/activity/cdKeys";
//获取所有礼包
export const CdKeys_all = "/activity/cdKeysList";
//累计充值接口
export const weekpay = "/activity/weekPay";
//累计充值数据
export const info_weekPay = "/activity/weekPayInfo";
//许愿中奖列表
export const gifsList = "/activity/lottery/list";
// //许愿愿望列表
export const desireList = "/activity/recently/cdkeys";
//许愿次数
export const getCount = "/activity/getTotal";
// //许愿接口
export const makeWish = "/activity/submit/info";
//翻卡牌接口
export const flip = "/activity/fflReward";
//翻卡牌信息接口
export const fflInfo = "/activity/fflUserInfo";
//预约接口
export const reserveJoin = "/activity/advance/join";
//转盘参与接口
export const roteJoin = "/activity/facebook/join";
// 转盘信息接口
export const roteInfo = "/activity/facebook/info";
// 转盘历史接口
export const roteCdkeys = "/activity/facebook/cdKeys";
//更新包礼包
export const updateReward = "/activity/updateReward";
// 20190706
export const roteRecharge = "/activity/vipReturn";
//获取宝箱数量
export const carCount = '/activity/cardCount';
//参与宝箱活动
export const cardReward = "/activity/cardReward";
//分享调用
export const cardBoxFB = "/activity/cardBoxFB";
// 飞行棋,港台vs使用
export const flightChess = "/activity/flightChess";

/* 活动接口的结束 */