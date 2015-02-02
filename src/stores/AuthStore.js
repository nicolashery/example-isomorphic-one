var createStore = require('fluxible/utils/createStore');

var AuthStore = createStore({
  storeName: 'AuthStore',

  handlers: {
    'LOAD_SESSION': 'loadSession',
    'SIGN_IN_START': 'signInStart',
    'SIGN_IN_FAILURE': 'signInFailure',
    'SIGN_IN_SUCCESS': 'signIn',
    'SIGN_OUT_START': 'signOutStart',
    'SIGN_OUT_FAILURE': 'signOutFailure',
    'SIGN_OUT_SUCCESS': 'signOut'
  },

  initialize: function() {
    this.token = null;
    this.signingIn = false;
    this.signingOut = false;
  },

  loadSession: function(token) {
    this.token = token;
    this.emitChange();
  },

  signInStart: function() {
    this.signingIn = true;
    this.emitChange();
  },

  signInFailure: function() {
    this.signingIn = false;
    this.emitChange();
  },

  signIn: function(token) {
    this.signingIn = false;
    this.token = token;
    this.emitChange();
  },

  signOutStart: function() {
    this.signingOut = true;
    this.emitChange();
  },

  signOutFailure: function() {
    this.signingOut = false;
    this.emitChange();
  },

  signOut: function() {
    this.signingOut = false;
    this.token = null;
    this.emitChange();
  },

  isAuthenticated: function() {
    return Boolean(this.token);
  },

  getToken: function() {
    return this.token;
  },

  isSigningIn: function() {
    return this.signingIn;
  },

  isSigningOut: function() {
    return this.signingOut;
  },

  dehydrate: function() {
    return {
      token: this.token,
      signingIn: this.signingIn,
      signingOut: this.signingOut
    };
  },
  
  rehydrate: function(state) {
    this.token = state.token;
    this.signingIn = state.signingIn;
    this.signingOut = state.signingOut;
  }
});

module.exports = AuthStore;