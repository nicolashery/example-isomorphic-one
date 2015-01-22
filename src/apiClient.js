var superagent = require('superagent');
var debug = require('debug')('app:apiClient');

var apiClient = {};

apiClient.getContacts = function(api, cb) {
  superagent
    .get(api.url + '/contacts')
    .accept('json')
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

module.exports = apiClient;