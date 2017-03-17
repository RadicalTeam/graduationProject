// 解析发送内容
const AGENT_ID = 3;
var Draw = require('../handleMethods/drawImg');
module.exports = function(req, res, next) {
  const content = req.weixin.content;
  var imgPath;
  switch(content) {
    case(1):
      imgPath = Draw.DrawArea();
      break;
    case(2):
      imgPath = Draw.DrawBar(null);
      break;
    default:
      imgPath = Draw.DrawArea();
  }
  req.api.addMaterial(AGENT_ID, imgPath, 'image', function(err, result) {
    if(err) {
      console.log(err);
    }else{
      res.reply({
        type: 'image',
        content: {
          mediaId: result
        }
      })
    }
  })
  res.reply("it's text redponser");
}