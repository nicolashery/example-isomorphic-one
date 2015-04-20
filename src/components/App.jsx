var React = require('react');
var Router = require('react-router/build/npm/lib');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var SignInOrOut = require('./SignInOrOut.jsx');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div>
        <p>
          <SignInOrOut />
          {' - '}
          <Link to="about">About</Link>
          {' - '}
          <Link to="contacts">Contacts</Link>
        </p>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
