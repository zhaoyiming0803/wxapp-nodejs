const Koa = require('koa');
const app = new Koa();
const sha1 = require('sha1');

app.use(async (ctx, next) => {
  const method = ctx.method;

  if (method === 'get') {
    const { signature, timestamp, nonce, echostr } = ctx.query;
    const str = ['zhaoyiming', timestamp, nonce].sort().join('');
    const sha1Str = sha1(str);

    ctx.body = sha1Str === signature;
  }
});

app.listen(8093, () => {
  console.log('weapp application listen port 8093');
});