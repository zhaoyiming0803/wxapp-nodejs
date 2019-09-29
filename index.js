const Koa = require('koa');
const app = new Koa();
const sha1 = require('sha1');
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const WxCrypt = require('./libs/WxCrypt');
const WXBizDataCrypt = require('./libs/WXBizDataCrypt');
const { weapp } = require('./config');
const request = require('./helper/request');

app.use(bodyParser());

router.get('/weapp/', async (ctx, next) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  const str = ['zhaoyiming', timestamp, nonce].sort().join('');
  const sha1Str = sha1(str);

  ctx.body = sha1Str === signature
    ? echostr
    : 'warning';
});

router.post('/weapp/', async (ctx, next) => {
  const { signature, timestamp, nonce, openid, encrypt_type, msg_signature } = ctx.query;
  const wxCrypt = new WxCrypt({
    token: weapp.token,
    appid: weapp.appID,
    encodingAESKey: weapp.encodingAESKey,
    msg_signature
  });
  const { ToUserName, Encrypt } = ctx.request.body;

  console.log(JSON.parse(wxCrypt.decrypt(Encrypt)));
});

router.post('/weapp/shareTicket', async (ctx, next) => {
  const { encryptedData, iv, code } = ctx.request.body;
  const result = await request({
    url: 'https://api.weixin.qq.com/sns/jscode2session' +
      `?appid=${weapp.appID}` +
      `&secret=${weapp.appSecret}` +
      `&js_code=${code}` +
      '&grant_type=authorization_code'
  });
  console.log(result)
  const pc = new WXBizDataCrypt(weapp.appID, result.session_key);
  const data = pc.decryptData(encryptedData , iv);
  console.log('解密后 data: ', data);
});

app.use(router.routes(), router.allowedMethods());

app.listen(8093, () => {
  console.log('weapp application listen port 8093');
});