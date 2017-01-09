var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get('/test', function (req, res) {
  res.send('Hello World');
})

app.listen(port);
