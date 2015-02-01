var createStore = require('fluxible/utils/createStore');

var AuthStore = createStore({
  storeName: 'AuthStore',

  handlers: {
    'LOAD_SESSION': 'setToken',
    'SIGN_IN_SUCCESS': 'setToken',
    'SIGN_OUT_SUCCESS': 'deleteToken'
  },

  initialize: function() {
    this.token = null;
  },

  setToken: function(token) {
    this.token = token;
    this.emitChange();
  },

  deleteToken: function() {
    this.token = null;
    this.emitChange();
  },

  isAuthenticated: function() {
    return Boolean(this.token);
  },

  getToken: function() {
    return this.token;
  },

  dehydrate: function() {
    return {
      token: this.token
    };
  },
  
  rehydrate: function(state) {
    this.token = state.token;
  }
});

module.exports = AuthStore;