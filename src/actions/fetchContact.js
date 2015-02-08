var debug = require('debug')('app:fetchContact');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('FETCH_CONTACT_START');
  context.api.getContact(payload.contactId, function(err, contact) {
    if (err) {
      debug('Failed');
      context.dispatch('FETCH_CONTACT_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('FETCH_CONTACT_SUCCESS', contact);
    done();
  });
};
