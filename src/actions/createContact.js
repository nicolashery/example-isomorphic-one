var debug = require('debug')('app:createContact');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('CREATE_CONTACT_START');
  context.api.createContact(payload, function(err, contact) {
    if (err) {
      debug('Failed');
      context.dispatch('CREATE_CONTACT_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('CREATE_CONTACT_SUCCESS', contact);
    done();
  });
};
