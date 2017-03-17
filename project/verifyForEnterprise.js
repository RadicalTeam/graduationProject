var express = require('express');
var WXBizMsgCrypt = require('wechat-crypto');

var config = {
    token: 'pluo',
    encodingAESKey: 'zTSYVU5CAJm1FXlo8NTKEsOAHAfO2sUmIId6z2AHgBZ',
    corpId: 'wx551b90eeae13240f'
};

var app = express();

app.get('', function(req, res){
    console.log(req.url);
    var msg_signature = req.query.msg_signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId)
    var s = cryptor.decrypt(echostr);
    res.send(s.message);
});

app.listen(80);

console.log('Server running at http://127.0.0.1:1337/');