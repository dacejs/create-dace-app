import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import addStatic from 'dace/dist/runtime/utils/addStatic';
import urlRewrite from 'dace/dist/runtime/utils/urlRewrite';
import bodyParser from 'body-parser';
import accessLog from '../middlewares/accessLog';
import routes from '../routes';

const { DACE_LOG_ROOT } = process.env;

const server = express();

server.disable('x-powered-by');

// 记录访问日志
server.use(accessLog({
  format: ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
  root: path.resolve(DACE_LOG_ROOT),
  dateFormat: 'YYYY-MM-DD-HH',
  skip: (req) => [
    '/healthcheck',
    '/favicon.ico'
  ].includes(req.baseUrl)
}));

// 挂载虚拟目录
addStatic(server);

// 解析 cookie
server.use(cookieParser());

// 解析json
server.use(bodyParser.json());

// 挂载 mock 数据路由
urlRewrite(server);

// 挂载 API 路由
server.use(routes);

export default server;
