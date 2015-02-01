var debug = require('debug')('app:loadSession');
var api = require('../api');

module.exports = function(context, payload, done) {
  debug('Started');
  var token = payload.token;
  if (!token) {
    context.dispatch('LOAD_SESSION', null);
    done();
    return;
  }
  api.getSession(token, function(err, token) {
    if (err) {
      debug('Failed');
      done();
      return;
    }
    debug('Success');
    context.dispatch('LOAD_SESSION', token);
    done();
  });
};