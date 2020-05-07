# <%= projectName%>

## 运行
```
npm install && npm start
```

## JavaScript 规范
[https://github.com/zhongzhi107/javascript](https://github.com/zhongzhi107/javascript)

## 约定文件名命名规范
1. 组件文件名用大驼峰命名，一个组件放单独一个文件；
2. 其他文件名用小驼峰命名
3. 组件命名尽量使用名词

## watcher 打点
建议对 `/api/xxx` 的请求打点。

- **打点方式**
请求时使用 `src/utils/proxyAxios.js` 中的 axios 实例，这个实例上加载了拦截器，在拦截器中会记录 `count` `time` `error` 这三种监控。调用 axios 时传入配置时，需要传入 `metadata.name` ，该名称会作为 watcher 的指标名称。如果不传 `metadata` ，则该请求不记录 watcher 。

- **指标名称命名**
建议调用 `src/utils/getWatcherNameFromReq.js` ，该方法会将请求路径转换成指标名称。比如请求地址是 `/api/mustLiveList` ，自动生成的指标名称是 `api_mustLiveList`；若手动拼接，请使用下划线链接单词。

## store 设计规范
因为整个页面本质上是一个单页面，而且需要支持前后端均能渲染，这里给出 store 的设计规范指导建议：

- 每个页面的数据在 store 的顶层存储一个节点，如 `home`, `list`, `detail`，该页面使用的所有数据都存放在该节点下。
- 不要跨页面使用数据。
- 需要在多页面共享的公共数据，可以单独存储在顶层，但需要确保当公共数据不存在时，当前页面能自己完成公共数据的初始化（不依赖其他页面，同上一条）。
- 哪些数据需要作为公共数据，需要经过小组讨论。

## eslint 规范
eslint 的目的是为了保证多人开发时输出的代码风格级别保持一致。
- 不建议
  - 修改 `.eslintrc`
  - 使用 `eslint-disable` 关闭整个文件检查
- 建议
  - 不合理的规则，提出来，团队一起讨论，看是否增加到 `.eslintrc`
  - 出现频率不高的规则，使用 `eslint-disable-line` `eslint-disable-next-line` 禁用单行代码
  - 对于一些纯粹个人编码习惯（如单双引号的使用、行尾加分号），稍微克服一下，快的话半天就能适应

## HTML --> JSX
HTML 直接粘贴到 JSX 可能会报错，需要做简单替换
- 缩进替换为2个空格
- 替换注释
  - `<!--` 替换为 `{/* ` (注意后面有空格)
  - `-->` 替换为 ` */}` (注意前面有空格)
- 替换 `class` 为 `className`
- 替换 input 的 `value` 为 `defaultValue`

## getInitialProps 编码注意事项
`getInitialProps` 中的代码要求能在前后端环境下均能运行，因此在编程时需要注意，代码一定不能包含和宿主环境相关的内容：

- 代码尽量只和数据相关。
- 不能使用和浏览器相关的代码，如 `window` `document` `location` 等。
- 不能使用 node 内置的一些依赖包，如 `fs` `path` 等。
- 万不得已需要使用某一环境特性的代码时，一定需要做环境判断，`src/utils/isClient.js` 提供统一的环境判断方法。

## pm2-logrotate
在服务器上安装 pm2-logrotate

```
sudo pm2 install pm2-logrotate
sudo pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD-HH'
sudo pm2 set pm2-logrotate:compress true
sudo pm2 set pm2-logrotate:max_size '200M'
sudo pm2 set pm2-logrotate:rotateInterval '0 * * * *'
```