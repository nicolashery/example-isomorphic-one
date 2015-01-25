var createStore = require('fluxible/utils/createStore');
var reduce = require('lodash-node/modern/collections/reduce');
var values = require('lodash-node/modern/objects/values');

var ContactStore = createStore({
  storeName: 'ContactStore',

  handlers: {
    'LOAD_CONTACTS_SUCCESS': 'loadContacts'
  },

  initialize: function() {
    this.contactsById = {};
  },

  loadContacts: function(contacts) {
    this.contactsById = reduce(contacts, function(result, contact) {
      result[contact.id] = contact;
      return result;
    }, {});
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