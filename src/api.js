var superagent = require('superagent');
var debug = require('debug')('app:Api');

function Api(options) {
  options = options || {};
  var noop = function() {};

  this._getHost = options.getHost || noop;
  this._getToken = options.getToken || noop;
}

Api.prototype.signIn = function(username, password, cb) {
  superagent
    .post(this._getHost() + '/signin')
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

Api.prototype.signOut = function(cb) {
  superagent
    .post(this._getHost() + '/signout')
    .accept('json')
    .set('Authorization', this._getToken())
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

Api.prototype.getSession = function(token, cb) {
  superagent
    .get(this._getHost() + '/session')
    .accept('json')
    .set('Authorization', token)
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      token = res && res.ok ? token : null;
      cb(err, token);
    });
};

Api.prototype.getContacts = function(cb) {
  superagent
    .get(this._getHost() + '/contacts')
    .accept('json')
    .set('Authorization', this._getToken())
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

Api.prototype.getContact = function(id, cb) {
  superagent
    .get(this._getHost() + '/contacts/' + id)
    .accept('json')
    .set('Authorization', this._getToken())
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

Api.prototype.getMessages = function(contactId, cb) {
  superagent
    .get(this._getHost() + '/contacts/' + contactId + '/messages')
    .accept('json')
    .set('Authorization', this._getToken())
    .end(function(err, res) {
      if (err) {
        debug('error', err);
      }
      cb(err, res && res.body);
    });
};

module.exports = Api;