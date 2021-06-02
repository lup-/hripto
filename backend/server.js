const Koa = require('koa');
const Router = require('@koa/router');
const BitGoJS = require('bitgo');
const bodyParser = require('koa-bodyparser');

const cvs = require('./routes/cvs');
const user = require('./routes/users');
const offer = require('./routes/offer');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = new Koa();
const router = new Router();
const bitgo = new BitGoJS.BitGo({
    env: process.env.BITGO_ENV,
    accessToken: process.env.BITGO_ACCESS_TOKEN
});

router
    .post('/api/cv/list', cvs.list.bind(cvs))
    .post('/api/cv/add', cvs.add)
    .post('/api/cv/update', cvs.update)
    .post('/api/cv/delete', cvs.delete);

router
    .post('/api/offer/list', offer.list.bind(offer))
    .post('/api/offer/add', offer.add.bind(offer))
    .post('/api/offer/update', offer.update.bind(offer))
    .post('/api/offer/delete', offer.delete.bind(offer));

router
    .post('/api/user/add', user.add.bind(user))
    .post('/api/user/update', user.update.bind(user))
    .post('/api/user/delete', user.delete.bind(user))
    .post('/api/user/check', user.check.bind(user))
    .post('/api/user/login', user.login.bind(user))
    .post('/api/user/register', user.register.bind(user));

app
    .use(bodyParser({
        formLimit: '50mb',
        jsonLimit: '1mb',
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, HOST);