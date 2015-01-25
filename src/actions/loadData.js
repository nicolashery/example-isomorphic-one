var debug = require('debug')('app:loadData');
var loadContacts = require('./loadContacts');

module.exports = function(context, payload, done) {
  context.executeAction(loadContacts, {}, function(err) {
    if (err) {
      debug('Failed');
      return done(err);
    }
    done();
  });
};