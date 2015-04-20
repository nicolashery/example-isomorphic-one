var React = require('react');
var Router = require('react-router/build/npm/lib');
var FluxibleComponent = require('fluxible/addons/FluxibleComponent');
var debug = require('debug');
var bootstrapDebug = debug('app:client');
var app = require('../app');
var routes = require('../routes.jsx');
var fetchData = require('../utils/fetchData');
var loadSession = require('../actions/loadSession');

window.React = React; // For chrome dev tool support
debug.enable('*');
var mountNode = document.getElementById('app');
var dehydratedState = window.__DATA__;

function render(context, Handler) {
  React.render(React.createElement(
    FluxibleComponent,
    {context: context.getComponentContext()},
    React.createElement(Handler)
  ), mountNode);
}

function createAppRouter(context) {
  var router = Router.create({
    routes: routes,
    location: Router.HistoryLocation,
    transitionContext: context
  });
  app.getPlugin('RouterPlugin').setRouter(router);
  return router;
}

if (!dehydratedState) {
  bootstrapDebug('Isomorphism disabled, creating new context');
  var config = window.__CONFIG__;
  var context = app.createContext({config: config});
  // For debugging
  window.context = context;
  bootstrapDebug('Loading session');
  context.getActionContext().executeAction(loadSession, {}, function() {
    var router = createAppRouter(context);
    bootstrapDebug('Starting router');
    router.run(function(Handler, routerState) {
      render(context, Handler);
      fetchData(context, routerState);
    });
  });
} else {
  bootstrapDebug('Rehydrating app');
  app.rehydrate(dehydratedState, function(err, context) {
    if (err) {
      throw err;
    }
    // For debugging
    window.context = context;

    var router = createAppRouter(context);
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
}
