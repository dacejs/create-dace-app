/**
 * 提供给 openstream 用的地址，用来决定机器是否上线
 * /healthcheck 返回 200 表示机器正常，可以对外提供服务
 */

import { existsSync } from 'fs';
import { resolve } from 'path';

export default async (req, res, next) => {
  const { DACE_HEALTHCHECK_ENABLE, DACE_HEALTHCHECK_PATH } = process.env;
  if (DACE_HEALTHCHECK_ENABLE === 'true') {
    const html = resolve(DACE_HEALTHCHECK_PATH);
    const status = existsSync(html) ? 200 : 404;
    res.status(status).end();
  } else {
    next();
  }
};
