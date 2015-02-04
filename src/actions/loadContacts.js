var debug = require('debug')('app:loadContacts');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('LOAD_CONTACTS_START');
  context.api.getContacts(function(err, contacts) {
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