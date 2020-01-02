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

const entry = "./src/pages/" + process.env.VUE_APP_PATH + "/main.ts";
const outputDir = `dist/${ process.env.VUE_APP_PATH }`;
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
module.exports = {

  //打包后资源路径配置
  publicPath: "./",
  productionSourceMap: false,
  outputDir: outputDir,
  /* 全局变量 */
  configureWebpack: config => {

    config.entry.app = entry;
    config.plugins.push(
      new webpack.DefinePlugin({
        CONFIG: JSON.stringify(activityParam),
        VERSION: JSON.stringify(params.version),
        APPID: JSON.stringify(params.appId),
        FB_APP_ID: JSON.stringify(params.fbId),
        GA_Ad_ID: JSON.stringify(params.ga),
        FB_Ad_ID: JSON.stringify(params.fb),
        IS_KAKAO: JSON.stringify(params.isKakao),
        GROUP_ID: JSON.stringify(activityParam.data.groupId),
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
        if (params.shareMeta) {
          args[0].meta = params.shareMeta;
        }

        args[0].templateParameters = {
          'favicon': 'favicon.ico',
          title: params.title
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
    disableHostCheck: true,
    proxy: {
      '^/': {
        target: 'https://activity.pocketgamesol.com',
        // ws: true,
        changeOrigin: true
      },
    }
  }
}