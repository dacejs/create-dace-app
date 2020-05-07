import Statsd from 'statsd-client';

const {
  DACE_WATCHER_ENABLE,
  DACE_WATCHER_HOST,
  DACE_WATCHER_PORT,
  DACE_WATCHER_PREFIX
} = process.env;

/**
 * fetch client
 * @return {[statsd]}
 */
let client;
function getClient() {
  if (!client) {
    client = new Statsd({
      host: DACE_WATCHER_HOST,
      port: parseInt(DACE_WATCHER_PORT, 10),
      prefix: DACE_WATCHER_PREFIX
    });
  }
  return client;
}

const enable = DACE_WATCHER_ENABLE === 'true';

/**
 * 记录时间差毫秒数
 * @param {string} metric 监控名称，自动补齐 `.time`
 * @param {Date|number} time 时间对象或毫秒数。
 * 如果参数为时间对象时，记录当前时间与时间对象的差值。
 * 如果参数为毫秒数时，直接记录该数字。
 */
export const timing = (metric, time) => {
  if (!metric) {
    console.error('[watcher] name cannot be empty.');
    return;
  }
  if (!time) {
    console.error(`[watcher] ${metric} time cannot be empty.`);
    return;
  }
  const terminator = '.time';
  if (metric.endsWith && !metric.endsWith(terminator)) {
    metric += terminator;
  }
  if (enable) {
    getClient().timing(metric, time);
  }
};

/**
 * 增加计数
 * @param {string} metric 监控名称
 * @param {number} [count=1] 次数，可选，默认值：1
 */
export const increment = (metric, count = 1) => {
  if (!metric) {
    console.error('[watcher] name cannot be empty.');
    return;
  }
  if (enable) {
    getClient().increment(metric, count);
  }
};
