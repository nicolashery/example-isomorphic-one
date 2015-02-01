var env = require('./env');
var AuthStore = require('../stores/AuthStore');

module.exports = {
  statics: {
    willTransitionTo: function(transition) {
      if (env.SERVER) {
        return;
      }
      // SHAME: major hack using the window object
      // but couldn't figure out a way to pass context
      // down through react-router
      var context = window.context;
      var isAuthenticated = context.getActionContext().getStore(AuthStore).isAuthenticated();
      if (!isAuthenticated) {
        transition.redirect('/signin');
      }
    }
  }
};