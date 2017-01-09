var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());


app.get('/test', function (req, res) {
  res.send('Hello World');
})

app.post('/proxy', function (req, res) {
  console.log(req.body);
  var baseUrl = req.body.baseUrl;
  res.send('base URL: ' + baseUrl);
});

app.listen(port);
