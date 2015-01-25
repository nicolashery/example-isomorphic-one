var React = require('react');
var FluxibleApp = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');

var app = new FluxibleApp({
  appComponent: React.createFactory(require('./components/App.jsx'))
});

app.plug(routrPlugin({
  routes: require('./routes')
}));

app.registerStore(require('./stores/AppStore'));
app.registerStore(require('./stores/ContactStore'));

module.exports = app;