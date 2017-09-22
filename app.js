
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

