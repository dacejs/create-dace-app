/**
 * 可以转发，也可以本地模拟数据
 * 若存在不同环境的变量，请不要在该文件直接定义，推荐的方式是在 profiles 中用环境变量定义
 * 复杂的代理请求，请在 src/routes 中添加路由处理
 */

export default {
  // 单个替换
  '/napi/abcd': 'require!/mock/api/detail.js'

  // 批量替换
  // '^/napi/(.*)': 'require!/napi/$1.js'
};
