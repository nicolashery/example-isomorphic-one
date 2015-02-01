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

function render(context, Handler) {
  React.render(
    React.createElement(Handler, {context: context.getComponentContext()}),
    mountNode
  );
}

bootstrapDebug('Rehydrating app');
app.rehydrate(dehydratedState, function(err, context) {
  if (err) {
      throw err;
  }
  
  // For debugging
  // SHAME: also using it for AuthMixin
  window.context = context;

  var firstRender = true;
  bootstrapDebug('Starting router');
  Router.run(routes, Router.HistoryLocation, function(Handler, routerState) {
    // If first render, we already have all the data rehydrated so skip fetch
    if (firstRender) {
      bootstrapDebug('First render, skipping data fetch');
      firstRender = false;
      render(context, Handler);
      return;
    }

    // On the client, we render the route change immediately
    // and fetch data in the background
    // (stores will update and trigger a re-render with new data)
    render(context, Handler);
    fetchData(context, routerState);
  });
});