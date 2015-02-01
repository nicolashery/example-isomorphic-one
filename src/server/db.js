var Immutable = require('immutable');
var makeId = require('./makeId');

var db = {};

db._state = Immutable.fromJS({
  sessions: {},
  contacts: {}
});

db.createSession = function() {
  var token = makeId();
  this._state = this._state.setIn(['sessions', token], true);
  return token;
};

db.checkSession = function(token) {
  return this._state.getIn(['sessions', token], false);
};

db.revokeSession = function(token) {
  if (!this._state.getIn(['sessions', token])) {
    return null;
  }
  this._state = this._state.removeIn(['sessions', token]);
  return true;
};

db._contactResult = function(contact) {
  return contact.remove('messages');
};

db.getContacts = function() {
  return this._state.get('contacts')
    .map(this._contactResult.bind(this))
    .toList();
};

db.addContact = function(contact) {
  var id = makeId();
  contact = contact.merge(Immutable.fromJS({
    id: id,
    messages: []
  }));
  this._state = this._state.setIn(['contacts', id], contact);
  return this._contactResult(contact);
};

db.getContact = function(id) {
  var contact = this._state.getIn(['contacts', id]);
  if (!contact) {
    return null;
  }
  return this._contactResult(contact);
};

db.updateContact = function(id, updates) {
  var contact = this._state.getIn(['contacts', id]);
  if (!contact) {
    return null;
  }
  contact = contact.merge(updates);
  this._state = this._state.setIn(['contacts', id], contact);
  return this._contactResult(contact);
};

db.deleteContact = function(id) {
  if (!this._state.getIn(['contacts', id])) {
    return null;
  }
  this._state = this._state.removeIn(['contacts', id]);
  return true;
};

db.getMessagesForContact = function(contactId) {
  var contact = this._state.getIn(['contacts', contactId]);
  if (!contact) {
    return null;
  }
  return contact.get('messages');
};

db.addMessageForContact = function(contactId, message) {
  message = message.set('to', true);
  this._state = this._state.updateIn(['contacts', contactId, 'messages'],
  function(messages) {
    return messages.push(message);
  });
  return message.delete('to');
};

db.addContact(Immutable.fromJS({name: 'Bob'}));
db.addContact(Immutable.fromJS({name: 'Mary'}));
db.addContact(Immutable.fromJS({name: 'Max'}));
db._state = db._state.setIn(['contacts', '1', 'messages'], Immutable.fromJS([
  {to: true, content: 'Hey Bob!'},
  {from: true, content: 'Howdy :)'},
  {from: true, content: 'How\'s everything?'},
  {to: true, content: 'Doing good, thanks!'}
]));

module.exports = db;