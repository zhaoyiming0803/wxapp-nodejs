#!/usr/bin/env bash

# publish
tar -czvf weapp.tar.gz .

mkdir -p /work/api/weapp
rm -rf /work/api/weapp/*
cp weapp.tar.gz /work/api/weapp
cd /work/api/weapp && tar -xvf weapp.tar.gz && npm --registry=https://registry.npm.taobao.org install && pm2 stop pm2.json && pm2 start pm2.json