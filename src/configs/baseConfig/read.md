# 说明

这个文件夹使用来配置游戏的基本设置,不需要频繁更换

```js
/* 泰国口袋妖怪3ds, 这里是游戏名 */
module.exports = {
  // 游戏的品台id
  appId: "10052",
  // 游戏的facebook AppId, 用于初始化facebook web sdk
  fbId: "1170290033098881",
  // 德法为de,越南、泰国攻城是v1，其他都是v3 ,平台登录的version
  version: "v3",
  // 国家对应的语言 共有 De, En, Fr, Id, Kr Tw Vn,  Tw 对应香港和台湾
  language: "Th",
  /* 游戏的名称,这个不需要频繁的更换,最好是固定一个 */
  title: "",
  /* 是否有卡考登录,只有韩国有 */
  isKakao:false
}
```