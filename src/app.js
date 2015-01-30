var React = require('react');
var FluxibleApp = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');

var app = new FluxibleApp({
  appComponent: React.createFactory(require('./components/App.jsx'))
});

app.plug(routrPlugin({
  routes: require('./routes')
}));

app.plug((function () {
  var rendered = false;
  return {
    name: 'RenderedPlugin',
    plugContext: function() {
      return {
        plugComponentContext: function(componentContext) {
          componentContext.isRendered = function() {
            return rendered;
          };
        }
      };
    },
    renderDone: function() {
      rendered = true;
    }
  };
}()));

app.registerStore(require('./stores/RouteStore'));
app.registerStore(require('./stores/ContactStore'));
app.registerStore(require('./stores/MessageStore'));

module.exports = app;