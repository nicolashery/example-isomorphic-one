var debug = require('debug')('app:signOut');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('SIGN_OUT_START');
  context.api.signOut(function(err) {
    if (err) {
      debug('Failed');
      context.dispatch('SIGN_OUT_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('SIGN_OUT_SUCCESS');
    context.cookie.clear('token');
    // NOTE: possible race condition here
    // the AuthStore needs to set its state to "not authenticated"
    // before the transition
    context.getRouter().transitionTo('/signin');
    done();
  });
};
