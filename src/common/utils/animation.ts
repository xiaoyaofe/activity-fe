import * as Velocity from "velocity-animate/velocity";

/* 为文档实现 */
/* 中文文档: http://shouce.jb51.net/velocity/command.html 比较老
英文文档: http://velocityjs.org/#stop
不支持: 2-2. 单一对象的参数写法：
      2-3. 逗号分割的参数写法（类似 $.animate）：
其他的就是按文档操作就好了,把 $(选择器) 换成 animate(element)     
*/
interface EleObj {
  elements: any;
  _delay: number;
  velocity: (propertys: any, options?: Options | number) => EleObj;
  delay: (time: number) => EleObj
  dequeue: (name: string) => EleObj
}
interface Options {
  /* Velocity 动画配置项的默认值 */
  duration?: number;        // 动画执行时间
  easing?: string;      // 缓动效果
  queue?: string;            // 队列
  begin?: (elements) => void;     // 动画开始时的回调函数
  progress?: (elements, complete, remaining, start, tweenValue) => void;  // 动画执行中的回调函数（该函数会随着动画执行被不断触发）
  complete?: (elements) => void;  // 动画结束时的回调函数
  display?: string;   // 动画结束时设置元素的 css display 属性
  visibility?: string;// 动画结束时设置元素的 css visibility 属性
  loop?: number;          // 循环
  delay?: number;         // 延迟
  mobileHA?: boolean;        // 移动端硬件加速（默认开启true）
}

export function animate(ele: any) {
  let result: EleObj = {
    elements: ele,
    _delay: 0,
    velocity: function (propertys, options) {
      let option: any;
      if (typeof options === "number") {
        option = { duration: options }
      } else {
        option = options;
      }
      if (this._delay) {
        option.delay = this._delay;
        this._delay = 0;
      }
      Velocity(this.elements, propertys, option);
      return this;
    },
    delay(time: number) {
      this._delay = time;
      return this;
    },
    dequeue(name: string) {
      Velocity.Utilities.dequeue(this.elements, name);
      return this;
    }
  };
  return result;
}
function isArray(o) {
  return Object.prototype.toString.call(o) == '[object Array]';
}
/*
中文文档: http://shouce.jb51.net/velocity/index.html
英文文档: http://velocityjs.org/
*/
//完成动画延迟和动画队列
// 1. 一个元素,挨个执行,每个动画执行前,执行延迟
// queue: false 加这个属性变为 立即执行动画,
// queue: "name" 形成队列
// Velocity.Utilities.dequeue(ele, "name"); 执行队列

// const ele1 = this.$refs.animate1;
// Velocity(ele1, { width: 1000 }, { duration: 3000,delay:1000});
// Velocity(ele1, { opacity: 0 }, { duration: 3000});
// 当两个以上的元素执行时,没有顺序执行,同时开始除非使用定时器来做延迟



