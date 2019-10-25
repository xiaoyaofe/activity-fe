import Vue from 'vue'
/* 需要先注册参数,才能使用组件,组件中的使用了config中的值 */
window._RG = { config: CONFIG };
/* 组件 */

/* 指令 */
import vueTap from '@/common/directives/v-tap';
/* 使用Vue.use 注册的组件 */
import Dialog from '@/components/dialog/dialog';

/* 注册全局组件 */


/* 注册全局指令 */
Vue.use(vueTap);

// 注册全局弹窗
Vue.use(Dialog);



// https://webpack.js.org/guides/dependency-management/#require-context

/* 引入所有的基础组件 */

// const requireComponent = require.context(
//   // Look for files in the current directory
//   '.',
//   // Do not look in subdirectories
//   false,
//   // Only include "_base-" prefixed .vue files
//   /_base-[\w-]+\.vue$/
// )

// For each matching file name...
// requireComponent.keys().forEach((fileName) => {
//   // Get the component config
//   const componentConfig = requireComponent(fileName)
//   // Get the PascalCase version of the component name
//   const componentName = fileName
//     // Remove the "./_" from the beginning
//     .replace(/^\.\/_/, '')
//     // Remove the file extension from the end
//     .replace(/\.\w+$/, '')
//     // Split up kebabs
//     .split('-')
//     // Upper case
//     .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
//     // Concatenated
//     .join('')

//   // Globally register the component
//   Vue.component(componentName, componentConfig.default || componentConfig)
// })