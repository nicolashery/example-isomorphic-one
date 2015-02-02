var superagent = require('superagent');
var debug = require('debug')('app:api');

var api = {};

var host = 'http://localhost:3000/api';

api.signIn = function(username, password, cb) {
  superagent
    .post(host + '/signin')
    .accept('json')
    .send({username: username, password: password})
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      if (!res.ok) {
        err = (res.body && res.body.error) || {status: res.status};
      }
      cb(err, res && res.body);
    });
};

api.signOut = function(token, cb) {
  superagent
    .post(host + '/signout')
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

api.getSession = function(token, cb) {
  superagent
    .get(host + '/session')
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      token = res.ok ? token : null;
      cb(err, token);
    });
};

api.getContacts = function(token, cb) {
  superagent
    .get(host + '/contacts')
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

api.getContact = function(token, id, cb) {
  superagent
    .get(host + '/contacts/' + id)
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

api.getMessages = function(token, contactId, cb) {
  superagent
    .get(host + '/contacts/' + contactId + '/messages')
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

module.exports = api;