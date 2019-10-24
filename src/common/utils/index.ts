export * from "./animation";
/* 获取地址栏参数 */
export const getParameterByName = (function () {
  let urlParamMap = {}
  let interrogationIndex = location.href.indexOf("?") + 1
  let str = interrogationIndex === 0 ? "" : location.href.slice(interrogationIndex)
  if (str) {
    let arr = str.split(/&|%26/)
    arr.forEach(item => {
      let arr = item.split(/=|%3D/)
      let key = arr[0]
      let val = arr[1]
      urlParamMap[key] = val
    })
  }
  return function (name) {
    return urlParamMap.hasOwnProperty(name) ? urlParamMap[name] : null
  }
})()
// 判断是否Pc端,排除其他系统类型
export function isPc() {
  var uaInfo = navigator.userAgent;
  var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
// 设置rem基准值, 好处是小数点前移两位
export function setHtmlFontSize(viewBaseWidth: number) {
  let clientWidth = document.documentElement.clientWidth;
  if (clientWidth <= 1200 && viewBaseWidth > 768) clientWidth = 1200;
  let _fontSize = clientWidth / (viewBaseWidth / 100);
  document.documentElement.style.fontSize = _fontSize + "px";
}

// 节流函数
export function throttleFn<T extends Function>(time: number, callback: T): T {

  let timer: number;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, time) as unknown as number;
  } as unknown as T;
}

// 防抖函数
export function noJitterFn<T extends Function>(time: number, callback: T): T {
  let isFinished: boolean = true;
  return function (...args) {
    if (!isFinished) return;
    isFinished = false;
    setTimeout(() => {
      callback(...args);
      isFinished = true;
    }, time);
  } as unknown as T;
}

/* 删除获取深层对象 */
export function getConfigItemAndDeleteItem(obj: Object, name: string | string[]) {
  if (!obj || !name) return;
  let arr: string[];
  if (typeof name === "string") arr = name.split(".");
  else arr = name;
  if (arr.length === 1) {
    let result = obj[arr[0]];
    delete obj[arr[0]];
    return result;
  }
  arr.shift();
  return getConfigItemAndDeleteItem(obj[arr[0]], arr);
}

// 初始化facebook的sdk
export function initfacebook(appId: string, version: string) {
  window.fbAsyncInit = function () {
    FB.init({
      appId: appId,
      autoLogAppEvents: true,
      xfbml: true,
      version: version,
    });
  };
  (function (d, s, id) {
    let js;
    const fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

export function initKakao() {
  (function (d, s, id) {
    let js;
    const fjs: any = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.onload = function () {
      Kakao.init('2aa46e2170d6d1b9268934304e63b35e');
    }
    js.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'kakao-jssdk'));

}

// 兼容IE9页面滚动属性

export function polyfillAnimation() {
  window.requestAnimationFrame = window.requestAnimationFrame ||
    function (fn: () => void) { return setTimeout(fn, 1000 / 60); };
  window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
}

// 设置html字体大小
export function initSetRem(pc: number, mb: number) {
  // 初始化rem
  setRem(pc, mb);
  // 窗口变化,防抖
  const throttleSetRem = noJitterFn<(pc: number, mb: number) => void>(100, setRem);
  window.addEventListener("resize", () => {
    throttleSetRem(pc, mb);
  })
}
//判断玩家是否登录
export const isLogin = function () {

  if (localStorage.token) {
    //   if (localStorage.userId && localStorage.token && localStorage.playerId) {
    // var active = new Date().getTime();
    // active -= 1800000;
    // if (active < parseInt(localStorage.activetime) && localStorage.playerName) {
    return true;
    // } else {
    //     // location.reload();
    //     localStorage.clear();
    // }
  } else {
    return false;
  }
}
// 区服下拉框动画
export const zoneAnimate = (className, length) => {
  var oBox: any = document.getElementsByClassName(className)[0];
  var flag = parseInt(oBox.style.height) ? parseInt(oBox.style.height) : 0;
  // console.log(length)
  if (!length) {
    oBox.style.height = 0 + "px";
    return
  }
  let time = setInterval(() => {
    if (flag == length) {
      oBox.style.height = 0 + "px";
      clearInterval(time);
    } else {
      flag += 10;
      if (flag == length) {
        clearInterval(time);
      }
      oBox.style.height = flag + "px";
    }
  }, 20);
}


export function setRem(pc: number, mb: number) {
  if (isShowPc()) {
    setHtmlFontSize(pc);
  } else {
    setHtmlFontSize(mb);
  }
}

export function isShowPc() {
  let result: boolean;
  // 判断支持touchend事件与否,支持移动端,不支持pc端
  const isSupportTouch = "ontouchend" in document ? true : false;
  // 当屏幕宽度小于等于750时,直接默认是移动端
  const isMin750 = document.body.clientWidth <= 750 ? true : false;
  const isPcWeb = isPc();
  if (isMin750 || !isPcWeb || isSupportTouch) {
    result = false;
  } else {
    result = true;
  }
  return result;
}

/*

那就是使用getBoundingClientRect()方法。它返回一个对象，其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
所以，网页元素的相对位置就是
var X= this.getBoundingClientRect().left;
var Y =this.getBoundingClientRect().top;
再加上滚动距离，就可以得到绝对位置
var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;

*/
