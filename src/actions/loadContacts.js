var debug = require('debug')('app:loadContacts');
var api = require('../api');
var AuthStore = require('../stores/AuthStore');

module.exports = function(context, payload, done) {
  debug('Started');
  var token = context.getStore(AuthStore).getToken();
  context.dispatch('LOAD_CONTACTS_START');
  api.getContacts(token, function(err, contacts) {
    if (err) {
      debug('Failed');
      context.dispatch('LOAD_CONTACTS_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('LOAD_CONTACTS_SUCCESS', contacts);
    done();
  });
};