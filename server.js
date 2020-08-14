var express = require('express')
var bodyParser = require('body-parser')
var request = require('request-promise')
const { text } = require('body-parser')

var app = express()

app.set('port',(process.env.PORT || 3001))

app.use('/',express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/helloworld',(req,res) => {
  //console.log(req);
  res.send("Hello world from serve port: " + app.get('port'));
})

app.listen(app.get('port'), function(){
  console.log('Server stared: http://localhost: ' + app.get('port') + '/')
})

/* webhook */
app.post('/webhook',(req,res) => {

  console.log(req.body.events[0].message);

  replyToken = req.body.events[0].replyToken;
  msg = req.body.events[0].message;
  reply(replyToken,msg);
  res.send('Hi');
})

function reply(replyToken,msg){

  let headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer 1/B0JKb0SkxFfgDOBy1T+DeXfWwypgAc6SI00dT92fb2VGTGw92YrtpkP6O1P5uuz1F6K/2sECRTxbbKjDyJm/9pVDzc79VAJAfg2esirZ7RhlCzEQALWMqBuYj16UHxAtpL3E7+kwISr4laiwS8rwdB04t89/1O/w1cDnyilFU='
  }

  if(msg.type == 'sticker'){
    var body  = JSON.stringify({
    replyToken : replyToken,
    messages:[{
      type: "sticker",
      packageId: msg.packageId,
      stickerId: msg.stickerId
    }]
  });
  }else{
    var body = JSON.stringify({
      replyToken: replyToken,
      messages:[{
        type : 'text',
        text: msg.text
      }]
    })
  }

  request.post({
    url:'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body
  },(err,res,body) => {
    if(res.statusCode == 400){
      err_common();
    }
    console.log('err =' + err)
    console.log('status ='+ res.statusCode)
  })
}

function err_common ()
{
  let headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer 1/B0JKb0SkxFfgDOBy1T+DeXfWwypgAc6SI00dT92fb2VGTGw92YrtpkP6O1P5uuz1F6K/2sECRTxbbKjDyJm/9pVDzc79VAJAfg2esirZ7RhlCzEQALWMqBuYj16UHxAtpL3E7+kwISr4laiwS8rwdB04t89/1O/w1cDnyilFU='
  }
    request.post({
      url:'https://api.line.me/v2/bot/message/push',
      headers: headers,
      body: JSON.stringify({
        to: "Ub41490a9e6b2bc5f128abce7c2f921e1",
        messages: [
          {
            type:"text",
            text:"ไม่สามารถทำรายการได้"
          },{
          type: "sticker",
          packageId: 11537,
          stickerId: 52002744
        }]
      })
    })
  }

