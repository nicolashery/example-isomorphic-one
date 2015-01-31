var React = require('react');
var FluxibleApp = require('fluxible');

var app = new FluxibleApp({
  appComponent: React.createFactory(require('./components/App.jsx'))
});

app.registerStore(require('./stores/ContactStore'));
app.registerStore(require('./stores/MessageStore'));

module.exports = app;