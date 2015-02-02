var debug = require('debug')('app:signOut');
var api = require('../api');
var AuthStore = require('../stores/AuthStore');

module.exports = function(context, payload, done) {
  debug('Started');
  var token = context.getStore(AuthStore).getToken();
  context.dispatch('SIGN_OUT_START');
  api.signOut(token, function(err) {
    if (err) {
      debug('Failed');
      context.dispatch('SIGN_OUT_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('SIGN_OUT_SUCCESS');
    // NOTE: possible race condition here
    // the AuthStore needs to set it's state to "not authenticated"
    // before the transition
    context.getRouter().transitionTo('/signin');
    done();
  });
};