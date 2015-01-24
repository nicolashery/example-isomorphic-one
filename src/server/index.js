require('node-jsx').install({extension: '.jsx'});

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var React = require('react');
var Router = require('react-router');
var routes = require('../routes.jsx');
var debug = require('debug')('app:server');
var api = require('./api');
var static = require('./static');
var fetchData = require('../utils/fetchData');

var indexHtml = fs.readFileSync('index.html').toString();

var app = express();

app.use(bodyParser.json());
app.use('/api', api);
app.use(static);

var renderApp = function(location, cb) {
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

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

  router.run(function(Handler, state) {
    if (state.routes[0].name === 'not-found') {
      var html = React.renderToStaticMarkup(React.createElement(Handler));
      cb({notFound: true}, html);
      return;
    }
    fetchData(state.routes, state.params, function(err, data) {
      var appHtml = React.renderToString(
        React.createElement(Handler, {data: data})
      );
      var html = indexHtml
        .replace(htmlRegex, appHtml)
        .replace(dataRegex, JSON.stringify(data));
      cb(null, html);
    });
  });
};

app.get('*', function(req, res) {
  renderApp(req.url, function(err, html) {
    if (err && err.notFound) {
      return res.status(404).send(html);
    }
    if (err && err.redirect) {
      return res.redirect(303, err.redirect.to);
    }
    res.send(html);
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  debug('App listening at http://%s:%s', host, port);
});