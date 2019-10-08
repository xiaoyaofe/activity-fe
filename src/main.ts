import "normalize.css";
// import 'babel-polyfill';
import Vue from 'vue';
import Pixel from '@/plugins/pixel';
import vueTap from 'v-tap';

// import * as VueScrollTo from "vue-scrollto";
import App from "./pages/vs_20191001/App.vue"; //运行时编译,的原因不能使用变量替换路径
import Dialog from './common/dialog';
import { setRem, isShowPc } from "@/common/common"
import { noJitterFn } from "@/utils/fns"

// 初始化rem
setRem(1920, 750);
// 窗口变化,防抖
const throttleSetRem = noJitterFn<(pc: number, mb: number) => void>(100, setRem);
const throttleSetIsPc = noJitterFn<() => void>(100, () => Vue.prototype.$isPc = isShowPc())
window.addEventListener("resize", function () {
  throttleSetRem(1920, 750);
  throttleSetIsPc();
})

// 兼容IE9页面滚动属性
window.requestAnimationFrame = window.requestAnimationFrame ||
  function (fn: () => void) { return setTimeout(fn, 1000 / 60); };
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
window._RG = {
  config: CONFIG
}

// 注册全局弹窗
Vue.use(Dialog);
// Vue.use(VueScrollTo);
Vue.use(vueTap);
// 设置 Pc 模式还是 Mb 模式
Vue.prototype.$isPc = isShowPc();

// 设置全局打点方法, 20191001无打点需求
// Vue.prototype.$pixel = Pixel;
// Pixel.instance.init({
//   id: {
//     fb: window._RG.config.data.fb,
//     ga: window._RG.config.data.ga,
//   }
// });

// fb登录脚本
window.fbAsyncInit = function () {
  FB.init({
    appId: window._RG.config.data.fbId,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
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

new Vue({
  render: h => h(App)
}).$mount('#app');
