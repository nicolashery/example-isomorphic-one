var React = require('react');
var Router = require('react-router');
var App = require('../components/App.jsx');

window.React = React;

var routes = require('../routes.jsx');

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(React.createElement(Handler), document.getElementById('app'));
});
