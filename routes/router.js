var express = require('express')
var amqp = require('amqplib/callback_api');
var router = express.Router();
router.get('/',(req, res)=>{
    res.render('../view/index.ejs')
})
router.post('/send',(req, res)=>{
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'topic_logs';
    var msg = JSON.stringify(req.body);

    var key = ()=>{
        if(req.body.topic=='hardware'){
            return 'hardware.email';
        }else if(req.body.topic=='software'){
            return 'software.email';
        }else return 'hardware.software.email';};
    console.log(key, typeof(key), msg.toString())
    ch.assertExchange(ex,'topic' , {durable: false});
    ch.publish(ex, key(), new Buffer(msg));
    console.log(" [x] Sent '%s'", msg);
  });

  setTimeout(function() { conn.close();  }, 500);
});
    //console.log(req.body);
    res.redirect('back');

})
module.exports = router;