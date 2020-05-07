#! /usr/bin/env node

const currentNodeVersion = process.versions.node;
const [major] = currentNodeVersion.split('.');

if (Number(major) < 10) {
  console.error(`You are running Node ${currentNodeVersion}.
Create Dace App requires Node 10 or higher.
Please update your version of Node.
`);
  process.exit(1);
}

require('./lib/create-dace-app');
