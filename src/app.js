var FluxibleApp = require('fluxible');

var app = new FluxibleApp();

app.plug(require('./utils/apiPlugin'));
app.plug(require('./utils/cookiePlugin'));

app.registerStore(require('./stores/AuthStore'));
app.registerStore(require('./stores/ContactStore'));
app.registerStore(require('./stores/MessageStore'));

module.exports = app;