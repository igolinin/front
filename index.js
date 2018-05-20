var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var bodyParser   = require('body-parser');
var router = require('./routes/router')


app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.set('view engine', 'ejs'); 
app.listen(port);