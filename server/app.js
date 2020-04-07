const Koa = require('koa');
const http = require('http');
const https = require('https');
const Path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const bodyParse = require('koa-bodyparser');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/local';
mongoose.connect(db);
const models_path = __dirname + '/models/schema'
fs.readdirSync(models_path).forEach((file) => {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

const router = require('./router');

const port = process.env.PORT || 3030;
const app = new Koa();

app
  .use(bodyParse())
  .use(router.routes())
  .use(router.allowedMethods());
  

app.listen(port);
console.log('server port : ' + port);