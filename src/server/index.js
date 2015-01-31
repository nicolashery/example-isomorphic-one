require('node-jsx').install({extension: '.jsx'});
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var serialize = require('serialize-javascript');
var React = require('react');
var Router = require('react-router');
var routes = require('../routes.jsx');
var debug = require('debug')('app:server');
var app = require('../app');
var api = require('./api');
var HtmlComponent = require('./Html.jsx');
var fetchData = require('../utils/fetchData');

var server = express();

server.use(bodyParser.json());
server.use('/api', api);
server.use('/public',
  express.static(path.join(__dirname, '..', '..', 'build')));

var renderApp = function(context, location, cb) {
  var router = Router.create({
    routes: routes,
    location: location,
    onAbort: function(redirect) {
      cb({redirect: redirect});
    },
    onError: function(err) {
      debug('Routing Error', err);
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

      var contextState = 'window.App=' + serialize(app.dehydrate(context)) + ';';
      var html = React.renderToStaticMarkup(React.createElement(HtmlComponent, {
        state: contextState,
        markup: React.renderToString(React.createElement(Handler, {
          context: context.getComponentContext()
        }))
      }));
      cb(null, html);
    });
  });
};

server.use(function(req, res, next) {
  var context = app.createContext();

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

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
