var React = require('react');
var createStore = require('fluxible/utils/createStore');

var RouteStore = createStore({
  storeName: 'RouteStore',

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

  getView: function(name) {
    return (this.route.config.views || {})[name];
  },

  getParams: function() {
    return this.route.params;
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

module.exports = RouteStore;