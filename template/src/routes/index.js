import express from 'express';
import ssrMiddleware from '../alias/ssrMiddleware';
import checkurls from './checkurls';
import healthcheck from './healthcheck';
import test from './api/test';

const router = express.Router();
// 测试页面
router.get('/test', ssrMiddleware);

// portal checkurl 页面
router.use('/check_urls', checkurls);

// 心跳检查页面
router.use('/healthcheck', healthcheck);

// api 数据接口
router.use('/api/test', test);

export default router;
