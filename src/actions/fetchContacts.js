var debug = require('debug')('app:fetchContacts');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('FETCH_CONTACTS_START');
  context.api.getContacts(function(err, contacts) {
    if (err) {
      debug('Failed');
      context.dispatch('FETCH_CONTACTS_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('FETCH_CONTACTS_SUCCESS', contacts);
    done();
  });
};
