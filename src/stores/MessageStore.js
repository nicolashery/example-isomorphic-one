var createStore = require('fluxible/utils/createStore');

var MessageStore = createStore({
  storeName: 'MessageStore',

  handlers: {
    'FETCH_MESSAGES_SUCCESS': 'fetchMessages'
  },

  initialize: function() {
    this.messagesbyContactId = {};
  },

  fetchMessages: function(payload) {
    this.messagesbyContactId[payload.contactId] = payload.messages;
    this.emitChange();
  },

  getMessages: function(contactId) {
    return this.messagesbyContactId[contactId] || [];
  },

  dehydrate: function() {
    return {
      messagesbyContactId: this.messagesbyContactId
    };
  },

  rehydrate: function(state) {
    this.messagesbyContactId = state.messagesbyContactId;
  }
});

module.exports = MessageStore;
