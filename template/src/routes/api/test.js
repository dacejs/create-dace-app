// import axios from '../../utils/proxyAxios';
// import getWatcherNameFromRes from '../../utils/getWatcherNameFromReq';

export default async (req, res) => {
  console.log('===b:', req.body.b);
  // const axiosConfig = {
  //   // headers: req.headers,
  //   metadata: getWatcherNameFromRes(req) // <- 注意，这里一定要传入 metadata.name，用于 watcher 打点
  // };
  // // 拿到防抓接口结果，传给 fas
  // // const { grade } = req.headers;
  // const url = 'http://localhost:4000/';

  // await axios.get(url, axiosConfig);
  res.json({
    status: 200 // response.status
  });
};
