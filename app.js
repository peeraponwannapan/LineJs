// Reply with two static messages
const express = require('express')
var bodyParser = require('body-parser')
const request = require('request');
const path = require('path');
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/webhook', (req, res) => {
    // var replyToken = req.body.events[0].replyToken
    //  var msg = req.body.data // console.log(reply_token)
     var userId_Push = req.body.UserID;
    // console.log(req.body.events[0].replyToken)
    console.log(req.body)
    // console.log(req.body1)
    var payload_Push = [
        {
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "header": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ทรัพย์สิน",
                      "align": "center",
                      "contents": []
                    }
                  ]
                },
                "hero": {
                  "type": "image",
                  "url": "https://media-exp1.licdn.com/dms/image/C4E0BAQFCdXfDYJfRNw/company-logo_200_200/0?e=2159024400&v=beta&t=I2S3eZRuemmA8X2Qj7U4-cDUwmqkte6gK5Jg9F3KcEY",
                  "size": "full",
                  "aspectRatio": "1.51:1",
                  "aspectMode": "fit"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": req.body.data,
                      "size": "lg",
                      "align": "start",
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              }
            }
      ];
    sendPush(userId_Push, payload_Push);
    res.json(req.body)
    res.sendStatus(200)
})
app.listen(port)

const sendPush = (userId_Push, payload_Push) => {
    var x;
    var messagebody = [];
    for (x of payload_Push) {
        messagebody.push(x);
    }
    const LINE_HEADER = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {LiC2KsDxm7h1Asx0mhZYFltIIhimL5lffJ6gC+QFQenz3ZOqwaWJbf3wEOKxYcMqP/wXZZJLI2qRs7Wjj5UA6uRQNy7/jtc/tcg4m7fo7tW63R2+A4wOKTzadonf29gqGeisyc+ZNWwcHPNIXrOIQQdB04t89/1O/w1cDnyilFU=}"
    };
    return request({
        method: 'POST',
        uri: 'https://api.line.me/v2/bot/message/push',
        headers: LINE_HEADER,
        body: JSON.stringify({
            "to": userId_Push,
            "messages": payload_Push
        })
    });
};



// const reply = (reply_token, msg)=> {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {LiC2KsDxm7h1Asx0mhZYFltIIhimL5lffJ6gC+QFQenz3ZOqwaWJbf3wEOKxYcMqP/wXZZJLI2qRs7Wjj5UA6uRQNy7/jtc/tcg4m7fo7tW63R2+A4wOKTzadonf29gqGeisyc+ZNWwcHPNIXrOIQQdB04t89/1O/w1cDnyilFU=}'
//     }
//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             type: 'text',
//             text: msg
//         }]
//     })
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
