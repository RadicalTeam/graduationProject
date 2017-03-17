var wechat = require('wechat-enterprise');
var api = wechat.API;
var express = require('express');
var path = require('path');
var fs = require('fs');
var TextRouter = require('./router/Text');
const echarts = require('node-echarts');
const getAccessToken = require('./handleMethods/getAccessToken');

var app = express();

// app.use(connect.query());

var config = {
    token: 'pluo',
    encodingAESKey: 'zTSYVU5CAJm1FXlo8NTKEsOAHAfO2sUmIId6z2AHgBZ',
    corpId: 'wx551b90eeae13240f'
};

app.use('/', wechat(config, function(req, res, next){
    console.log(req.weixin);
    switch (req.weixin.MsgType) {
      case ("event"):
        break;
      case ('text'):
        var api = new API('wx551b90eeae13240f', 'cropSecret', 'agentId', getToken, saveToken);
        req.api = getAccessToken(api);
        next();
        break;
      default:
        break;
    }
}),TextRouter);

app.listen(80, function () {
    console.log('Example app listening on port 3000!')
})

function getToken(callback) {
  fs.readFile('access_token.txt', 'utf8', function (err, txt) {
    if (err) {return callback(err);}
    callback(null, JSON.parse(txt));
  });
}

function saveToken(token, callback) {
  var expireTime = new Date() + (token.expires_in * 1000);
  token.expires_in = expireTime;
  fs.writeFile('access_token.txt', JSON.stringify(token), callback);
}