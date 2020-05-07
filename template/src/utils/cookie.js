import Cookies from 'js-cookie';
import isClient from './isClient';

/**
 * 前后端获取 cookie 的公用方法
 * @param {string} name cookie名称
 * @param {any} [defaultValue] 取不到 cookie 时使用的默认值
 * @param {object} [req] Express 的 request 对象
 * @returns
 */
export const getCookie = (name, defaultValue, req) => {
  if (req) {
    // 先从服务器端取 cookie
    return req?.cookies[name] || defaultValue;
  }

  if (isClient) {
    // 再从浏览器中取 cookie
    return Cookies.get(name) || defaultValue;
  }

  // 最后设置默认值
  return defaultValue;
};

/**
 * 设置 cookie 的公用方法
 * @examples
 * // Create a cookie, valid across the entire site:
 * Cookies.set('name', 'value')
 * // Create a cookie that expires 7 days from now, valid across the entire site:
 * Cookies.set('name', 'value', { expires: 7 })
 * // Create an expiring cookie, valid to the path of the current page:
 * Cookies.set('name', 'value', { expires: 7, path: '' })
 */
export const setCookie = (...args) => {
  Cookies.set.apply(this, args);
};

/**
 * 前后端获取 cookie 的公用方法
 * @param {string} name cookie名称
 * @param {option} options cookie配置
 * @returns
 */
export const removeCookie = (name, options) => {
  Cookies.remove(name, options);
};
