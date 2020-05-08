/**
 * PM2 配置文件
 *
 * @see http://pm2.keymetrics.io
 *
 * 注意：
 * 该文件被 PM2 在命令行下直接加载，**请勿**使用 ES6 语法书写
 */

const pkg = require('./package.json');

module.exports = {
  apps: [
    {
      name: pkg.name,
      script: 'dist/server.js',
      exec_mode: 'cluster',
      instances: process.env.NODE_ENV === 'production' ? 0 : 1,
      error_file: '../logs/error.log',
      out_file: '../logs/main.log',
      combine_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm',
      time: true
    }
  ]
};
