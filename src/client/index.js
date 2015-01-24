var React = require('react');
var Router = require('react-router');
var fetchData = require('../utils/fetchData');
var routes = require('../routes.jsx');

window.React = React;

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  fetchData(state.routes, state.params, function(err, data) {
    React.render(
      React.createElement(Handler, {data: data}),
      document.getElementById('app')
    );
  });
});
