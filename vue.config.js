const path = require("path");
const webpack = require('webpack');
const configs = require('./src/configs');
const languages = require('./src/configs/i18n');

const activityParamDevAndBuild = configs[process.env.VUE_APP_PATH];

function getEnvObj() {
  let result = {};
  for (key in process.env) {
    if (/VUE_APP_/.test(key)) {
      result[key] = JSON.stringify(process.env[key]);
    }
  }
  for (key in activityParamDevAndBuild.otherParams) {
    if (/VUE_APP_/.test(key)) {
      result[key] = JSON.stringify(process.env[key]);
    }
  }
  return result;
}
let activityParam = {
  tip: languages[process.env.VUE_APP_LANG],
}
module.exports = {

  //打包后资源路径配置
  publicPath: './',
  productionSourceMap: false,
  /* 全局变量 */
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      activityParam.data = activityParamDevAndBuild['build']
    } else {
      // 为开发环境修改配置...
      activityParam.data = activityParamDevAndBuild['dev']
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(activityParam),
        ...getEnvObj()
      })
      // ,
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   'window.jQuery': 'jquery',
      // })
    );

  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = activityParamDevAndBuild.otherParams.VUE_APP_TITLE
        console.log(args[0]);
        return args
      });
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/common/scss/global/*.scss')]
    }
  },
  devServer: {
    disableHostCheck: true,
  },
}