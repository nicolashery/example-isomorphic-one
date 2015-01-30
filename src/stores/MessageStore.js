var createStore = require('fluxible/utils/createStore');
var reduce = require('lodash-node/modern/collections/reduce');
var values = require('lodash-node/modern/objects/values');

var MessageStore = createStore({
  storeName: 'MessageStore',

  handlers: {
    'LOAD_MESSAGES_SUCCESS': 'loadMessages'
  },

  initialize: function() {
    this.messagesbyContactId = {};
  },

  loadMessages: function(payload) {
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