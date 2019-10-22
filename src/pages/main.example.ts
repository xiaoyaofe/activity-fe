import "normalize.css";
import Vue from 'vue';
import Pixel from '@/common/pixel';

import { initSetRem, polyfillAnimation, initfacebook } from "@/common/utils"
//注册所有的需要注册的组件 
import "@/common/initComponentsAndDirectives";

//运行时编译的原因不能使用变量替换路径 要使用变量替换 开启 runtimeCompiler 会大 10kb
import App from "@/pages/test/App.vue";

initSetRem(1920, 750);
polyfillAnimation();
initfacebook(FB_APP_ID, VUE_APP_FBSDK_VERSION);

Vue.prototype.$pixel = new Pixel(GA_Ad_ID, FB_Ad_ID);

window._RG = { config: CONFIG };

new Vue({
  render: h => h(App)
}).$mount('#app');
