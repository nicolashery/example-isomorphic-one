var debug = require('debug')('app:loadSession');

module.exports = function(context, payload, done) {
  debug('Started');
  var token = payload.token;
  if (!token) {
    context.dispatch('LOAD_SESSION', null);
    done();
    return;
  }
  context.api.getSession(token, function(err, token) {
    if (err) {
      debug('Failed');
      done();
      return;
    }
    debug('Success');
    context.dispatch('LOAD_SESSION', token);
    if (!token) {
      context.clearCookie('token');
    }
    done();
  });
};