const path = require("path");
const webpack = require('webpack');
const configs = require('./src/configs');
const languages = require('./src/configs/i18n');

const activityParamDevAndBuild = configs[process.env.VUE_APP_PATH];

const params = activityParamDevAndBuild.params;

let activityParam = {
  tip: languages[params.language]
}
if (process.env.NODE_ENV === 'production') {
  // 为生产环境修改配置...
  activityParam.data = activityParamDevAndBuild['build']
} else {
  // 为开发环境修改配置...
  activityParam.data = activityParamDevAndBuild['dev']
}

const entry = "./src/pages/" + process.env.VUE_APP_PATH + "main.ts";

module.exports = {

  //打包后资源路径配置
  publicPath: './',
  productionSourceMap: false,
  /* 全局变量 */
  configureWebpack: config => {

    config.entry.app = entry;
    config.plugins.push(
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(activityParam),
        VERSION: JSON.stringify(params.version),
        APPID: JSON.stringify(params.appId),
        FB_APP_ID: JSON.stringify(params.fbId),
        GA_Ad_ID: JSON.stringify(params.fb),
        FB_Ad_ID: JSON.stringify(params.ga),
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
        args[0].title = activityParamDevAndBuild.otherParams.VUE_APP_TITLE;
        arg[0].meta = {
          "Content-Security-Policy": params.shareMeta
        };
        arg[0].templateParameters = {
          'favicon': 'favicon.ico'
        };
        return args
      });
  },
  /* 设置全局 scss 混入和变量 */
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/common/scss/global/*.scss')]
    }
  },
  devServer: {
    // disableHostCheck: true,
    /* proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }, */
  }

/* 获取所有的 process.env 中以 VUE_APP_ 开头的参数*/
function getEnvObj() {
  let result = {};
  for (key in process.env) {
    if (/VUE_APP_/.test(key)) {
      result[key] = JSON.stringify(process.env[key]);
    }
  }
  return result;
}