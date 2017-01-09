var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());


app.get('/test', function (req, res) {
  res.send('Hello World');
})

app.post('/proxy', function (proxyReq, proxyRes) {
  var proxyHost = proxyReq.body.host;
  var proxyPath = proxyReq.body.path;
  var proxyHeaders = proxyReq.body.headers;

  var options = {
    host: proxyHost,
    path: proxyPath,
    headers: proxyHeaders,
    timeout: 30000
  };

  var req = http.request(options, (res) => {
    var responseData = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    res.on('end', () => {
      proxyRes.send(responseData);
    });
  }).end();
});

app.listen(port);
