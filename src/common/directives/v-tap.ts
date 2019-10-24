/** 
 * https://cn.vuejs.org/v2/guide/custom-directive.html
 * 来源: https://github.com/MeCKodo/vue-tap
 * 修改完成,未测试
 */
// 引入类型
import { DirectiveOptions, DirectiveBinding } from "vue/types/options"
import { Vue, VueConstructor } from "vue/types/vue";
// 判断支持touchend事件与否
const isSupportTouch = "ontouchend" in document ? true : false;
/* 
  判断是否触发 tap 事件,排除滑动, 长按等可能,和 disabled
*/
interface tapObj {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  distanceX: number;
  distanceY: number;
}
/* 类型做的兼容 */

function isTap(el: HTMLElement) {
  // dom 元素带有 disabled 属性时，tap 失效
  if (el.disabled) return false;
  const { time, tapObj } = el;
  // tap的灵敏度调节,点击时间 300ms 之内, x,y方向位移不超过 10 px
  return time < 300 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
}
/* 执行事件,对不符合预期的行为做处理 */
let handler = function (e: Event, el: HTMLElement, binding: DirectiveBinding, isUpdate: boolean = false) {
  const value = binding.value;
  /* a标签快速跳转,主要是处理移动端 */
  if (!value && el.href && !binding.modifiers.prevent) return window.location.href = el.href;

  value.event = e;
  value.tapObj = isSupportTouch ? el.tapObj : null;
  /* 处理 input 和 textearea */
  const tagName = value.event.target.tagName.toLocaleLowerCase();
  if ((tagName === 'input' || tagName === 'textarea') && !isUpdate) {
    return value.event.target.focus();
  }
  value.methods.call(el, value);
}
// 触摸开始时间
function touchstart(e: TouchEvent, el: HTMLElement) {
  const touch1 = e.touches[0];
  const tapObj = el.tapObj;
  tapObj.pageX = touch1.pageX;
  tapObj.pageY = touch1.pageY;
  tapObj.clientX = touch1.clientX;
  tapObj.clientY = touch1.clientY;
  // 灵敏度判断时间开始时间
  el.time = +new Date();
}
// 触摸结束事件
function touchend(e: TouchEvent, el: HTMLElement) {
  const touche1 = e.changedTouches[0];
  el.time = +new Date() - el.time;
  const tapObj = el.tapObj;
  tapObj.distanceX = tapObj.pageX - touche1.pageX;
  tapObj.distanceY = tapObj.pageY - touche1.pageY;
  if (!isTap(el)) return;
  el.handler(e);
}
const bind = function (el: HTMLElement, binding: DirectiveBinding) {

  el.tapObj = {} as tapObj;
  el.handler = function (e: Event) {
    handler(e, el, binding);
  }
  /* 支持touch事件,移动端 */
  if (isSupportTouch) {
    el.addEventListener('touchstart', function (e) {

      if (binding.modifiers.stop) e.stopPropagation();
      if (binding.modifiers.prevent) e.preventDefault();
      touchstart(e, el);
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

      return touchend(e, el);
    }, false);
  } else {
    /* 不支持touch事件,非移动端 */
    el.addEventListener('click', function (e) {
      if (binding.modifiers.stop) e.stopPropagation();
      if (binding.modifiers.prevent) e.preventDefault();
      el.handler(e);
    }, false);
  }
}
const componentUpdated = function (el: HTMLElement, binding: DirectiveBinding) {
  el.tapObj = {} as tapObj;
  el.handler = function (e: Event) {
    handler(e, el, binding, true)
  }
}
const unbind = function (el: HTMLElement) {
  // 卸载
  el.tapObj = null as any;
  delete el.time;
  el.handler = function () { };
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