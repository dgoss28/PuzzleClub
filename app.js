var express = require('express')
var app = express()
var routes = require('./routes/index')
var http=require('http');

var server=http.createServer(function(req,res){
    res.end('test');
});

server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(3000);

app.get('/', routes);

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');


// var express = require('express');
// var routes = require('routes');
// // var user = require('./app/routes/user');
// var http = require('http');
// var path = require('path');

// var app = express();

// // all environments
// app.set('views', path.join(__dirname, 'views'));
// 
