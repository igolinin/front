var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');
var router = require('./routes/router')
var configDB = require('./config/database.js');
mongoose.connect(configDB.url, {useMongoClient: true}); // connect to our database
mongoose.connection.on('connected',()=>{
    console.log('Connecected to mongoDB')
})
mongoose.Promise = global.Promise;

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.set('view engine', 'ejs'); 
app.listen(port);