var React = require('react');
var App = require('../components/App.jsx');

window.React = React;

React.render(React.createElement(App), document.getElementById('app'));