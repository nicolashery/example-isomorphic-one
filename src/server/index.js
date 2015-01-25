require('node-jsx').install({extension: '.jsx'});
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var React = require('react');
var debug = require('debug')('app:server');
var app = require('../app');
var api = require('./api');
var HtmlComponent = React.createFactory(require('./Html.jsx'));
var loadData = require('../actions/loadData');
var AppStore = require('../stores/AppStore');

var server = express();

server.use(bodyParser.json());
server.use('/api', api);
server.use('/public',
  express.static(path.join(__dirname, '..', '..', 'build')));

server.use(function(req, res, next) {
    var context = app.createContext();

    debug('Executing navigate action', req.url);
    context.getActionContext().executeAction(navigateAction, {
        url: req.url
    }, function (err) {
      if (err) {
        if (err.status && err.status === 404) {
          next();
        }
        else {
          next(err);
        }
        return;
      }

      //console.log(context.getActionContext().getStore(AppStore).getRoute());

      debug('Executing loadData');
      context.getActionContext().executeAction(loadData, {}, function(err) {
        if (err) {
          return next(err);
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering application component into html');
        var AppComponent = app.getAppComponent();
        var html = React.renderToStaticMarkup(HtmlComponent({
          state: exposed,
          markup: React.renderToString(AppComponent({
            context: context.getComponentContext()
          }))
        }));

        debug('Sending markup');
        res.write(html);
        res.end();
      });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
