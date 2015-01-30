var React = require('react');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;
var RouteStore = require('../stores/RouteStore');
var MainView = require('./MainView.jsx');

var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],

  statics: {
    storeListeners: {
      _onChange: [RouteStore]
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      route: this.getStore(RouteStore).getRoute(),
    };
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
      <div>
        <MainView context={this.props.context} />
      </div>
    );
  }
});

module.exports = App;