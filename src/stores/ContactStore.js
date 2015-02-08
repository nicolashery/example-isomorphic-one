var createStore = require('fluxible/utils/createStore');
var reduce = require('lodash/collection/reduce');
var values = require('lodash/object/values');

var ContactStore = createStore({
  storeName: 'ContactStore',

  handlers: {
    'FETCH_CONTACTS_SUCCESS': 'fetchContacts',
    'CREATE_CONTACT_SUCCESS': 'createContact'
  },

  initialize: function() {
    this.contactsById = {};
  },

  fetchContacts: function(contacts) {
    this.contactsById = reduce(contacts, function(result, contact) {
      result[contact.id] = contact;
      return result;
    }, {});
    this.emitChange();
  },

  createContact: function(contact) {
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
