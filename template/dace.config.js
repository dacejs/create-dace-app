/**
 * dace.config.js 未使用 babel 编译
 * 保险起见，请使用 es5 语法书写
 */

const path = require('path');

module.exports = {
  // 静态文件目录，多个目录中间用逗号连接
  DACE_STATIC: 'static',

  // 正常 node_modules 里的包不会通过 babel 编译
  // 但部分依赖包不需要 IE10
  // 这里显式声明哪些依赖包需要做 babel 编译
  // DACE_BABEL_COMPILE_MODULES: 'react-dev-utils,ansi-styles,chalk,strip-ansi,ansi-regex',

  // 公共包包含的文件，包之间用竖线连接，匹配时使用的是正则匹配
  DACE_VENDORS: 'react|redux|@loadable|core-js|deep-equal|dace|axios|history|qs|apc.js',

  // 前端代码打包时是否添加 polyfill
  DACE_POLYFILL: 'true',

  // 是否关闭 webpack 热模块替换功能
  // 测试 IE10 兼容性时需要关闭 HMR
  // DACE_HMR: 'false',

  // 加上 dace-plugin-redux
  plugins: ['redux'],

  modify(config, { target, isDev }) {
    const appConfig = config;
    // if (target === 'node') {
    //   // TODO 封装到 dace-plugin-redux
    //   // 改写 dace-plugin-redux 对 server entry 的定义
    //   const oldFile = require.resolve('dace-plugin-redux/dist/runtime/server.js');
    //   appConfig.entry = appConfig.entry.map((file) => {
    //     if (file === oldFile) {
    //       return path.resolve('src/alias/server.js');
    //     }
    //     return file;
    //   });
    // }
    // 用自己的文件替换 dace 中的文件，以实现功能定制化
    // alias 中的包名怎么写，需要看打包输出后的文件 dist/server.js ，以 /*! xxx */ 注释中包含的包名称为准
    const aliasMap = {
      './createServer': 'src/alias/createServer.js',
      // '../rewriteRules': 'src/alias/rewriteRules.js',
      // 'dace/dist/runtime/axiosInstance': 'src/alias/axiosInstance.js'
    };
    Object.keys(aliasMap).forEach((key) => {
      appConfig.resolve.alias[key] = path.resolve(__dirname, aliasMap[key]);
    });

    return appConfig;
  }
};
