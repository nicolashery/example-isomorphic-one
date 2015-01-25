var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('app:client');
var app = require('../app');
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support
debug.enable('app:*');

bootstrapDebug('Rehydrating app');
app.rehydrate(dehydratedState, function (err, context) {
  if (err) {
      throw err;
  }
  window.context = context;
  var mountNode = document.getElementById('app');

  bootstrapDebug('React rendering');
  React.render(app.getAppComponent()({
    context: context.getComponentContext()
  }), mountNode, function () {
    bootstrapDebug('React rendered');
  });
});