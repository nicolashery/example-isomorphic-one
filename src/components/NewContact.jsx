var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var Navigation = require('react-router').Navigation;
var NewContactStore = require('../stores/NewContactStore');

var NewContact = React.createClass({
  mixins: [FluxibleMixin, Navigation],

  statics: {
    storeListeners: [NewContactStore]
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      isCreatingContact: this.getStore(NewContactStore).isCreatingContact(),
      error: this.getStore(NewContactStore).getCreateContactError()
    };
  },

  onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
      <div>
        <form action="/contacts/create" onSubmit={this.handleCreateContact}>
          <p>
            <input ref="name" name="name" placeholder="New contact" />
            {' '}
            {this.renderButton()}
          </p>
        </form>
        {this.renderError()}
      </div>
    );
  },

  renderButton: function() {
    var disabled;
    var text = 'Create';

    if (this.state.isCreatingContact) {
      disabled = true;
      text = 'Creating...';
    }

    return (
      <button
        type="submit"
        disabled={disabled}>
        {text}
      </button>
    );
  },

  handleCreateContact: function(e) {
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value.trim();
    if (!(name && name.length)) {
      return;
    }
    this.refs.name.getDOMNode().value = '';
    this.transitionTo('contact-create', {}, {name: name});
  },

  renderError: function() {
    var error = this.state.error;
    if (!error) {
      return null;
    }

    return <p style={{color: 'red'}}>An error occured while creating contact</p>;
  }
});

module.exports = NewContact;
