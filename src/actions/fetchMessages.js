var debug = require('debug')('app:fetchMessages');

module.exports = function(context, payload, done) {
  debug('Started');
  var contactId = payload.contactId;
  context.dispatch('FETCH_MESSAGES_START');
  context.api.getMessages(contactId, function(err, messages) {
    if (err) {
      debug('Failed');
      context.dispatch('FETCH_MESSAGES_FAILURE', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('FETCH_MESSAGES_SUCCESS', {
      contactId: contactId,
      messages: messages
    });
    done();
  });
};
