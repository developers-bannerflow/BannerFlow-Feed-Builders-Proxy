var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('BannerFlow-Feed-Builder-Proxy');
})

app.post('/proxy', function (proxyReq, proxyRes) {
  var proxyHost = proxyReq.body.host;
  var proxyPath = proxyReq.body.path;
  var proxyHeaders = proxyReq.body.headers;
  var protocol = proxyReq.body.protocol;

  var options = {
    host: proxyHost,
    path: proxyPath,
    headers: proxyHeaders,
    timeout: 10000
  };

  var client = http;

  if (protocol && protocol.toLowerCase() === 'https')
    client = https;

  var req = client.request(options, (res) => {
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
