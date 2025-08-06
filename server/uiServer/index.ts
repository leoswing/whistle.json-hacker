import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import path from 'path';
import Router from 'koa-router';
import setupRouter from './router';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mount = require('koa-mount');

const MAX_AGE = 1000 * 60 * 5;

// @ts-ignore
export default (server: Whistle.PluginServer, options: Whistle.PluginOptions) => {
  const app = new Koa();
  app.proxy = true;
  app.silent = true;
  onerror(app);
  const router = new Router();
  setupRouter(router);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(mount('/dist', serve(path.join(__dirname, '../../dist'), { maxage: MAX_AGE })));
  app.use(mount('/', serve(path.join(__dirname, '../../dist'), { maxage: MAX_AGE })));
  server.on('request', app.callback());
};
