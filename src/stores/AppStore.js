var createStore = require('fluxible/utils/createStore');

var AppStore = createStore({
  storeName: 'AppStore',

  handlers: {
    'CHANGE_ROUTE_SUCCESS': 'changeRoute'
  },

  initialize: function() {
    this.route = null;
  },

  changeRoute: function(route) {
    if (this.route && (this.route.url === route.url)) {
      return;
    }
    this.route = route;
    this.emitChange();
  },

  getRoute: function() {
    return this.route;
  },

  getPage: function() {
    return this.route && this.route.config && this.route.config.page;
  },

  dehydrate: function() {
    return {
      route: this.route
    };
  },

  rehydrate: function(state) {
    this.route = state.route;
  }
});

module.exports = AppStore;