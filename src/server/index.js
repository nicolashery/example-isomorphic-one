require('node-jsx').install({extension: '.jsx'});
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var serialize = require('serialize-javascript');
var React = require('react');
var Router = require('react-router/build/npm/lib');
var FluxibleComponent = require('fluxible/addons/FluxibleComponent');
var debug = require('debug')('app:server');
var app = require('../app');
var routes = require('../routes.jsx');
var api = require('./api');
var HtmlComponent = require('./Html.jsx');
var fetchData = require('../utils/fetchData');
var loadSession = require('../actions/loadSession');

var config = require('../../config');

var server = express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use('/api', api);
server.use('/public',
  express.static(path.join(__dirname, '..', '..', 'build')));

var renderApp = function(context, location, cb) {
  var router = Router.create({
    routes: routes,
    location: location,
    transitionContext: context,
    onAbort: function(redirect) {
      cb({redirect: redirect});
    },
    onError: function(err) {
      debug('Routing Error', err);
      cb(err);
    }
  });

  router.run(function(Handler, routerState) {
    if (routerState.routes[0].name === 'not-found') {
      var html = React.renderToStaticMarkup(React.createElement(Handler));
      cb({notFound: true}, html);
      return;
    }

    fetchData(context, routerState, function(err) {
      if (err) {
        return cb(err);
      }

      var dehydratedState = 'window.__DATA__=' + serialize(app.dehydrate(context)) + ';';
      var appMarkup = React.renderToString(React.createElement(
        FluxibleComponent,
        {context: context.getComponentContext()},
        React.createElement(Handler)
      ));
      var html = React.renderToStaticMarkup(React.createElement(HtmlComponent, {
        state: dehydratedState,
        markup: appMarkup
      }));
      cb(null, html);
    });
  });
};

server.use(function(req, res, next) {
  if (config.DISABLE_ISOMORPHISM) {
    // Send empty HTML with just the config values
    // all rendering will be done by the client
    var serializedConfig = 'window.__CONFIG__=' + serialize(config) + ';';
    var html = React.renderToStaticMarkup(React.createElement(HtmlComponent, {
      config: serializedConfig
    }));
    res.send(html);
    return;
  }

  var context = app.createContext({
    req: req,
    res: res,
    config: config
  });

  context.getActionContext().executeAction(loadSession, {}, function() {
    renderApp(context, req.url, function(err, html) {
      if (err && err.notFound) {
        return res.status(404).send(html);
      }
      if (err && err.redirect) {
        return res.redirect(303, err.redirect.to);
      }
      if (err) {
        return next(err);
      }

      res.send(html);
    });
  });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
