var debug = require('debug')('app:loadContacts');
var api = require('../api');

module.exports = function(context, payload, done) {
  debug('Started');
  context.dispatch('LOAD_CONTACTS_STARTED');
  api.getContacts(function(err, contacts) {
    if (err) {
      debug('Failed');
      context.dispatch('LOAD_CONTACTS_FAILED', err);
      done();
      return;
    }
    debug('Success');
    context.dispatch('LOAD_CONTACTS_COMPLETED', contacts);
    done();
  });
};