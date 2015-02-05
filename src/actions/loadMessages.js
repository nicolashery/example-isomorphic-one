var debug = require('debug')('app:loadMessages');

module.exports = function(context, payload, done) {
  debug('Started');
  var contactId = payload.contactId;
  context.dispatch('LOAD_MESSAGES_START');
  context.api.getMessages(contactId, function(err, messages) {
    if (err) {
      debug('Failed');
      context.dispatch('LOAD_MESSAGES_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('LOAD_MESSAGES_SUCCESS', {
      contactId: contactId,
      messages: messages
    });
    done();
  });
};
