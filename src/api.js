var superagent = require('superagent');
var debug = require('debug')('app:api');

var api = {};

var host = 'http://localhost:3000/api';

api.getContacts = function(cb) {
  superagent
    .get(host + '/contacts')
    .accept('json')
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

api.getContact = function(id, cb) {
  superagent
    .get(host + '/contacts/' + id)
    .accept('json')
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

module.exports = api;