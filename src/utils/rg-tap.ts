/** 
 * 针对 vue 2.0 开发的点击的指令,移动端优先.
 * Created by zongjiang.ge on 2019/09/16.
 * 参考地址:
 * https://cn.vuejs.org/v2/guide/custom-directive.html
 * 思路来源: https://github.com/MeCKodo/vue-tap
 */
// 引入类型
import { DirectiveOptions, DirectiveBinding } from "vue/types/options"
import { Vue, VueConstructor } from "vue/types/vue";
// 判断支持touchend事件与否
const isSupportTouch = "ontouchend" in document ? true : false;
/* 
  判断是否触发 tap 事件,排除滑动, 长按等可能,和 disabled
*/
interface TapInfo {
  time: number;
  tapObj: {
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
    distanceX: number;
    distanceY: number;
  }
}
/* 类型做的兼容 */
interface Ele {
  disabled: boolean;
  tapInfo: TapInfo;
  href?: string;
  addEventListener: HTMLElement["addEventListener"]
}
function isTap(el: HTMLElement, tapInfo: TapInfo) {
  // dom 元素带有 disabled 属性时，tap 失效
  if ((el as unknown as Ele).disabled) return false;
  const { time, tapObj } = tapInfo;
  // tap的灵敏度调节,点击时间 300ms 之内, x,y方向位移不超过 10 px
  return time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
}

let handler = function (e: Event, el: HTMLElement, binding: DirectiveBinding, tapObj: any, isUpdate: boolean = false) {
  const value = binding.value;
  const ele: Ele = el as unknown as Ele;
  /* a标签快速跳转,主要是处理移动端 */
  if (!value && ele.href && !binding.modifiers.prevent) return window.location.href = ele.href;

  value.event = e;

  const tagName = value.event.target.tagName.toLocaleLowerCase();

  value.tapObj = isSupportTouch ? tapObj : null;
  /* 处理 input 和 textearea */
  if ((tagName === 'input' || tagName === 'textarea') && !isUpdate) {
    return value.event.target.focus();
  }
  value.methods.call(ele, value);
}
// 触摸开始时间
function touchstart(e: TouchEvent, tapInfo: TapInfo) {
  const touch1 = e.touches[0];
  tapInfo.tapObj.pageX = touch1.pageX;
  tapInfo.tapObj.pageY = touch1.pageY;
  tapInfo.tapObj.clientX = touch1.clientX;
  tapInfo.tapObj.clientY = touch1.clientY;
  // 灵敏度判断时间开始时间
  tapInfo.time = +new Date();
}
// 触摸结束事件
function touchend(e: TouchEvent, el: HTMLElement, binding: DirectiveBinding, tapInfo: TapInfo) {
  const touche1 = e.changedTouches[0];
  tapInfo.time = +new Date() - tapInfo.time;
  tapInfo.tapObj.distanceX = tapInfo.tapObj.pageX - touche1.pageX;
  tapInfo.tapObj.distanceY = tapInfo.tapObj.pageY - touche1.pageY;
  if (!isTap((el), tapInfo)) return;
  handler(e, el, binding, tapInfo.tapObj);
}
let tapInfo = {} as TapInfo;
tapInfo.tapObj = {} as any;
const bind = function (el: HTMLElement, binding: DirectiveBinding) {
  /* 支持touch事件,移动端 */
  if (isSupportTouch) {
    el.addEventListener('touchstart', function (e) {

      if (binding.modifiers.stop) {
        e.stopPropagation();
      }
      if (binding.modifiers.prevent) {
        e.preventDefault();
      }
      touchstart(e, tapInfo);
    }, false);
    el.addEventListener('touchend', function (e) {
      try {
        Object.defineProperty(e, 'currentTarget', { // 重写currentTarget对象 与jq相同
          value: el,
          writable: true,
          enumerable: true,
          configurable: true
        })
      } catch (e) {
        // ios 7下对 e.currentTarget 用defineProperty会报错。
        // 报“TypeError：Attempting to configurable attribute of unconfigurable property”错误
        // 在catch里重写
        console.error(e.message);
        e.currentTarget = el
      }
      e.preventDefault();

      return touchend(e, el, binding, tapInfo);
    }, false);
  } else {
    /* 不支持touch事件,非移动端 */
    el.addEventListener('click', function (e) {
      if (binding.modifiers.stop) {
        e.stopPropagation();
      }
      if (binding.modifiers.prevent) {
        e.preventDefault();
      }
      handler(e, el, binding, tapInfo);
    }, false);
  }
}
const componentUpdated = function (el: HTMLElement, binding: DirectiveBinding) {
  tapInfo = {} as TapInfo;
  tapInfo.tapObj = {} as any;
  handler = (function (fn) {
    return function (e: Event, el: HTMLElement, binding: DirectiveBinding, tapInfo: TapInfo) {
      fn(e, el, binding, tapInfo, true);
    }
  })(handler)
}
const unbind = function (el: HTMLElement) {
  // 卸载
  tapInfo = null as any;
  handler = function () { };
}
const rgTapOption: DirectiveOptions = {
  bind,
  componentUpdated,
  unbind
};

const VueTap: { install: (Vue: VueConstructor<Vue>) => void } = {} as { install: (Vue: any) => void };

VueTap.install = function (Vue: VueConstructor<Vue>) {
  Vue.directive('tap', rgTapOption);
}
export default VueTap