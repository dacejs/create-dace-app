/**
 * dace 用到的 axios 实例
 * SSR 页面请求 api 时用到的 axios 实例
 */

import axios from 'axios';

const instance = axios.create({
  timeout: 5000
});

instance.interceptors.response.use((response) => {
  // 返回数据包含 redirect 则跳转
  if (response.data?.redirect && typeof window === 'object') {
    window.location = response.data?.redirect;
  }
  return response;
}, (error) => Promise.reject(error));

export default instance;
