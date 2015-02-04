var debug = require('debug')('app:signIn');

module.exports = function(context, payload, done) {
  debug('Started');
  var username = payload.username;
  var password = payload.password;
  context.dispatch('SIGN_IN_START');
  context.api.signIn(username, password, function(err, auth) {
    if (err) {
      debug('Failed');
      context.dispatch('SIGN_IN_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('SIGN_IN_SUCCESS', auth.token);
    context.setCookie('token', auth.token);
    // NOTE: possible race condition here
    // the AuthStore needs to set its state to "authenticated"
    // before the transition
    context.getRouter().transitionTo('/contacts');
    done();
  });
};