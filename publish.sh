#!/usr/bin/env bash

# publish
tar -czvf wxapp.tar.gz .

mkdir -p /work/api/wxapp
rm -rf /work/api/wxapp/*
cp wxapp.tar.gz /work/api/wxapp
cd /work/api/wxapp && tar -xvf wxapp.tar.gz && npm --registry=https://registry.npm.taobao.org install && pm2 restart pm2.json