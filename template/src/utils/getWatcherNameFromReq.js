/**
 * 从请求对象中获取 watcher 名称
 * @param {Express.Request} req
 * @returns {object}
 * @returns {object.name} {string}
 */

export default (req) => {
  const { baseUrl } = req;
  return {
    name: baseUrl.substring(1, baseUrl.length).replace(/\//g, '.')
  };
};
