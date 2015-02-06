var createStore = require('fluxible/utils/createStore');

var LoadMessagesStore = createStore({
  storeName: 'LoadMessagesStore',

  handlers: {
    'LOAD_MESSAGES_START': 'start',
    'LOAD_MESSAGES_FAILURE': 'failure',
    'LOAD_MESSAGES_SUCCESS': 'success'
  },

  initialize: function() {
    this.working = false;
  },

  start: function() {
    this.working = true;
    this.emitChange();
  },

  failure: function(error) {
    this.working = false;
    this.emitChange();
  },

  success: function() {
    this.working = false;
    this.emitChange();
  },

  isLoadingMessages: function() {
    return this.working;
  },

  dehydrate: function() {
    return {
      working: this.working
    };
  },

  rehydrate: function(state) {
    this.working = state.working;
  }
});

module.exports = LoadMessagesStore;
