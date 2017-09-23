
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

app.set('view engine', 'pug');
app.use('views', serveStatic(__dirname + '/views'));
app.use('/public', express.static('public'));

app.listen(3000);
console.log('Express listening on port 3000');

app.get('/', function (req, res) {
  res.render('landing');

});

module.exports = app;

