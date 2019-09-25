/**
 * GET 参数获取
 * @param name 参数名称
 */
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

export function setHtmlFontSize(viewBaseWidth: number) {
  let clientWidth = document.documentElement.clientWidth;
  if (clientWidth <= 1200 && viewBaseWidth > 750) clientWidth = 1200;
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