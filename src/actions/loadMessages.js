var debug = require('debug')('app:loadMessages');
var api = require('../api');
var AuthStore = require('../stores/AuthStore');

module.exports = function(context, payload, done) {
  debug('Started');
  var token = context.getStore(AuthStore).getToken();
  var contactId = payload.contactId;
  context.dispatch('LOAD_MESSAGES_START');
  api.getMessages(token, contactId, function(err, messages) {
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