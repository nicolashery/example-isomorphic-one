var FluxibleApp = require('fluxible');

var app = new FluxibleApp();

app.registerStore(require('./stores/ContactStore'));
app.registerStore(require('./stores/MessageStore'));

module.exports = app;