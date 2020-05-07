#!/bin/bash

# 程序中有任何异常时返回非零异常错误
set -e

export PATH=/usr/local/n/versions/node/12.16.1/bin:$PATH

node_env=${deploy_type}

# 灰度发布也是线上发布
if [[ "${deploy_type}" = "prepare" || "${deploy_type}" = "prod" ]]; then
  node_env="production"
fi

if [ "${deploy_type}" = "dev" ]; then
  node_env="development"
fi

echo deploy_type: ${deploy_type}
echo profile: ${profile}
echo node_env: ${node_env}

# 选择 node 编译类型时，jenkins 会自动安装依赖
# 为了确保依赖包成功安装，此处再检查一下 dace 依赖包是否安装
if [ ! -d node_modules/dace ]; then
  t1=$(date +%s)
  npm install
  t2=$(date +%s)
  t=$((t2 - t1))
  echo "npm install 耗时 $t 秒"
fi

# 开始编译工程
t1=$(date +%s)
NODE_ENV=${node_env} PROFILE=${profile} npm run build
t2=$(date +%s)
t=$((t2 - t1))
echo "npm build 耗时 $t 秒"

echo "根目录文件："
ls -la

echo "prd 目录文件："
ls -la prd
