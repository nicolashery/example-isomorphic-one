var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          <Link to="signin">Sign in</Link>
          {' - '}
          <Link to="about">About</Link>
          {' - '}
          <Link to="contacts">Contacts</Link>
        </p>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;