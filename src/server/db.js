var Immutable = require('immutable');
var makeId = require('./makeId');

var db = {};

db._state = Immutable.fromJS({
  contacts: {}
});

db.getContacts = function() {
  return this._state.get('contacts')
    .map(function(contact, key) {
      return contact.set('id', key);
    })
    .toList();
};

db.addContact = function(contact) {
  var id = makeId();
  this._state = this._state.setIn(['contacts', id], contact);
  return contact.set('id', id);
};

db.getContact = function(id) {
  var contact = this._state.getIn(['contacts', id]);
  if (!contact) {
    return null;
  }
  return contact.set('id', id);
};

db.updateContact = function(id, updates) {
  var contact = this._state.getIn(['contacts', id]);
  if (!contact) {
    return null;
  }
  contact = contact.merge(updates);
  this._state = this._state.setIn(['contacts', id], contact);
  return contact.set('id', id);
};

db.deleteContact = function(id) {
  if (!this._state.getIn(['contacts', id])) {
    return null;
  }
  this._state = this._state.removeIn(['contacts', id]);
  return true;
};

db.addContact(Immutable.fromJS({name: 'Bob'}));
db.addContact(Immutable.fromJS({name: 'Mary'}));
db.addContact(Immutable.fromJS({name: 'Max'}));

module.exports = db;