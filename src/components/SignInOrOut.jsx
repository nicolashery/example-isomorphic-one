var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router/build/npm/lib');
var Link = Router.Link;
var AuthStore = require('../stores/AuthStore');
var signOut = require('../actions/signOut');

var SignInOrOut = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [AuthStore]
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      isAuthenticated: this.getStore(AuthStore).isAuthenticated(),
      isSigningOut: this.getStore(AuthStore).isSigningOut()
    };
  },

  onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    if (!this.state.isAuthenticated) {
      return <Link to="signin">Sign in</Link>;
    }

    if (this.state.isSigningOut) {
      return <span>Signing out...</span>;
    }

    return <a href="" onClick={this.handleSignOut}>Sign out</a>;
  },

  handleSignOut: function(e) {
    e.preventDefault();
    this.executeAction(signOut, {});
  }
});

module.exports = SignInOrOut;
