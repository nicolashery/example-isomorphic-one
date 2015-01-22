var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('app:server');
var api = require('./api');
var apiClient = require('../apiClient');

var app = express();

app.use(bodyParser.json());

app.use('/api', api);

app.get('/', function(req, res) {
  apiClient.getContacts({
    url: 'http://localhost:3000/api'
  }, function(err, contacts) {
    if (err) {
      return res.status(500).send('Error: ' + err.toString());
    }
    var body = 'Id, Name\n';
    contacts.forEach(function(contact) {
      body = body + contact.id + ', ' + contact.name + '\n';
    });
    res.send(body);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  debug('App listening at http://%s:%s', host, port);
});