// var express = require('express')
// var app = express()
// var routes = require('./routes/index')
// var http=require('http');

// var server=http.createServer(function(req,res){
//     res.end('test');
// });

// server.on('listening',function(){
//     console.log('ok, server is running');
// });


// app.get('/', routes);




var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.set('view engine', 'pug');
app.use(serveStatic(__dirname + '/views'));

app.listen(3000);
console.log('Express listening on port 3000');

app.get('/', function (req, res) {
  res.render('landing');
});

module.exports = app;


// var express = require('express');
// var routes = require('routes');
// // var user = require('./app/routes/user');
// var http = require('http');
// var path = require('path');

// var app = express();

// // all environments
// app.set('views', path.join(__dirname, 'views'));
// 
