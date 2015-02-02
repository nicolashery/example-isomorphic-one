var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var SignInOrOut = require('./SignInOrOut.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          <SignInOrOut context={this.props.context} />
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