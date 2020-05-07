import http from 'http';
import chalk from 'chalk';
import app from './createServer';

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.DACE_PORT, (error) => {
  if (error) {
    console.log(error);
  }

  const url = chalk.underline(`http://${process.env.DACE_HOST}:${process.env.DACE_PORT}`);
  console.log(`\n🐟 Dace is running at ${url}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./createServer', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    // eslint-disable-next-line global-require
    const newApp = require('./createServer');
    server.on('request', newApp);
    currentApp = newApp;
  });
}
