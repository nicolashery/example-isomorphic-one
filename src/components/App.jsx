var React = require('react');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;
var AppStore = require('../stores/AppStore');
var MainView = require('./MainView.jsx');

var App = React.createClass({
  mixins: [RouterMixin, StoreMixin],

  statics: {
    storeListeners: {
      _onChange: [AppStore]
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      route: this.getStore(AppStore).getRoute(),
    };
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
      <div>
        <MainView
          context={this.props.context}
          page={this.state.route.config.page}
          params={this.state.route.params} />
      </div>
    );
  }
});

module.exports = App;