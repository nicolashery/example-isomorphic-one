var createStore = require('fluxible/utils/createStore');

var NewContactStore = createStore({
  storeName: 'NewContactStore',

  handlers: {
    'CREATE_CONTACT_START': 'start',
    'CREATE_CONTACT_FAILURE': 'failure',
    'CREATE_CONTACT_SUCCESS': 'success'
  },

  initialize: function() {
    this.working = false;
    this.error = null;
  },

  start: function() {
    this.working = true;
    this.error = null;
    this.emitChange();
  },

  failure: function(error) {
    this.working = false;
    this.error = error;
    this.emitChange();
  },

  success: function() {
    this.working = false;
    this.error = null;
    this.emitChange();
  },

  isCreatingContact: function() {
    return this.working;
  },

  getCreateContactError: function() {
    return this.error;
  },

  dehydrate: function() {
    return {
      working: this.working,
      error: this.error
    };
  },

  rehydrate: function(state) {
    this.working = state.working;
    this.error = state.error;
  }
});

module.exports = NewContactStore;
