var debug = require('debug')('app:signIn');
var api = require('../api');

module.exports = function(context, payload, done) {
  debug('Started');
  var username = payload.username;
  var password = payload.password;
  context.dispatch('SIGN_IN_START');
  api.signIn(username, password, function(err, auth) {
    if (err) {
      debug('Failed');
      context.dispatch('SIGN_IN_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('SIGN_IN_SUCCESS', auth.token);
    done();
  });
};