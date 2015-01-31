var React = require('react');
var Router = require('react-router');
var debug = require('debug');
var bootstrapDebug = debug('app:client');
var app = require('../app');
var routes = require('../routes.jsx');
var fetchData = require('../utils/fetchData');

window.React = React; // For chrome dev tool support
debug.enable('*');
var mountNode = document.getElementById('app');
var dehydratedState = window.App; // Sent from the server

bootstrapDebug('Rehydrating app');
app.rehydrate(dehydratedState, function(err, context) {
  if (err) {
      throw err;
  }
  window.context = context; // For debugging

  bootstrapDebug('Starting router');
  Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
    fetchData(context, routerState, function(err) {
      React.render(
        React.createElement(Handler, {context: context.getComponentContext()}),
        mountNode
      );
    });
  });
});