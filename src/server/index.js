require('node-jsx').install({extension: '.jsx'});

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var React = require('react');
var debug = require('debug')('app:server');
var api = require('./api');
var static = require('./static');
var apiClient = require('../apiClient');
var App = require('../components/App.jsx');

var indexHtml = fs.readFileSync('index.html').toString();

var app = express();

app.use(bodyParser.json());
app.use('/api', api);
app.use('/static', static);

var renderApp = function(data) {
  data = data || {};
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

  var html = React.renderToString(React.createElement(App));
  return indexHtml
    .replace(htmlRegex, html)
    .replace(dataRegex, JSON.stringify(data));
};

app.get('/', function(req, res) {
  var html = renderApp();
  res.send(html);
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  debug('App listening at http://%s:%s', host, port);
});