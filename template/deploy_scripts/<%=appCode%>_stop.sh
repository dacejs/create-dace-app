#! /bin/bash

####
# 停止 PM2 服务
#
# 以下环境变量由 jenkins 传入：
# - app_code {string}
####

set -eu

app_code="<%=appCode%>"

echo "stop server ${app_code}"
pm2 delete ${app_code} || echo "${app_code} not exist, skipped."
echo "stop server done"