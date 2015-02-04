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
  React.withContext(context.getComponentContext(), function() {
    React.render(React.createElement(Handler), mountNode);
  });
}

bootstrapDebug('Rehydrating app');
app.rehydrate(dehydratedState, function(err, context) {
  if (err) {
    throw err;
  }
  
  // For debugging
  window.context = context;

  var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation,
    transitionContext: context
  });
  app.getPlugin('RouterPlugin').setRouter(router);

  var firstRender = true;
  bootstrapDebug('Starting router');
  router.run(function(Handler, routerState) {
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