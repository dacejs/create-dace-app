/**
 * 注意：该文件只用于服务器端
 *
 * 请求到数据写入日志
 */

import axios from 'axios';
import { increment, timing } from './watcher';

const instance = axios.create({
  timeout: process.env.DACE_BIZ_PROXY_AXIOS_TIMEOUT || 1000
});

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  const metric = config?.metadata?.name;
  if (metric) {
    // 记录总请求数
    increment(`${metric}.count`);
    // 记录请求开始时间
    config.metadata = {
      ...config.metadata,
      startTime: new Date()
    };
  } else {
    console.log(`${config.url}没有加watcher统计指标名称参数`);
  }

  // if (!config.headers['user-agent']) {
  //   console.log(config);
  //   console.warn('调用 prxoyAxios 未传入前一次请求的 header 信息，可能导致防抓校验失败。');
  // }

  // config.timeout = process.env.DACE_BIZ_PROXY_AXIOS_TIMEOUT || 1000;

  return config;
}, (error) => {
  // Do something with request error
  const metric = error?.config?.metadata?.name;
  increment(`${metric}.error`);
  console.error(`Get data fail: ${error}`);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  // Do something with response data
  const metric = response.config?.metadata?.name;
  timing(metric, response.config?.metadata?.startTime);
  return response;
}, (error) => {
  // Do something with response error
  const metric = error?.config?.metadata?.name;
  increment(`${metric}.error`);
  if (error.message.indexOf('timeout') > -1) {
    increment(`${metric}.timeout`);
  }
  console.error(`[error]${error.config.method} ${error.config.url} fail!\n${error}`);
  return Promise.reject(error);
});

export default instance;
