var createStore = require('fluxible/addons/createStore');
var reduce = require('lodash/collection/reduce');
var values = require('lodash/object/values');

var ContactStore = createStore({
  storeName: 'ContactStore',

  handlers: {
    'FETCH_CONTACTS_SUCCESS': 'setContacts',
    'FETCH_CONTACT_SUCCESS': 'addContact',
    'CREATE_CONTACT_SUCCESS': 'addContact'
  },

  initialize: function() {
    this.contactsById = {};
  },

  setContacts: function(contacts) {
    this.contactsById = reduce(contacts, function(result, contact) {
      result[contact.id] = contact;
      return result;
    }, {});
    this.emitChange();
  },

  addContact: function(contact) {
    this.contactsById[contact.id] = contact;
    this.emitChange();
  },

  getContacts: function() {
    return values(this.contactsById);
  },

  getContact: function(id) {
    return this.contactsById[id];
  },

  dehydrate: function() {
    return {
      contactsById: this.contactsById
    };
  },

  rehydrate: function(state) {
    this.contactsById = state.contactsById;
  }
});

module.exports = ContactStore;
