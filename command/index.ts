/* 引入node的自带的模块 */
// import fs = require('fs');
// import events = require('events');

// import defer = require('lodash/defer');
// import now = require('lodash/now');

// 创建 eventEmitter 对象
// const eventEmitter = new events.EventEmitter();
// // 绑定时间及事件处理程序
// eventEmitter.on('test', function(str) {
//   console.log(str);
//   console.timeEnd('test1');
// });
// eventEmitter.on('test', function(str) {
//   console.log(str);
//   console.timeEnd('test2');
//   eventEmitter.emit('error');
// });
// console.log(eventEmitter.listenerCount('test'));
// console.time('test1');
// console.time('test2');
// setTimeout(() => {
//   fs.readFile('test.txt', function(err, data) {
//     if (err) return console.log(err.stack);
//     eventEmitter.emit('test', data.toString());
//   });
// }, 2000);
// console.log('执行完成,等待读取');

const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));
const json = JSON.stringify(buf);
console.log(json)
// 输出 cnVub29i
console.log(buf.toString('base64'));
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
});
console.log(copy);