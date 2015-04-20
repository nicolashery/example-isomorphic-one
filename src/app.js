var Fluxible = require('fluxible');

var app = new Fluxible();

app.plug(require('./utils/apiPlugin'));
app.plug(require('./utils/cookiePlugin'));
app.plug(require('./utils/routerPlugin')());

app.registerStore(require('./stores/AuthStore'));
app.registerStore(require('./stores/ContactStore'));
app.registerStore(require('./stores/CreateContactStore'));
app.registerStore(require('./stores/MessageStore'));
app.registerStore(require('./stores/FetchMessagesStore'));

module.exports = app;
