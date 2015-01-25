var React = require('react');
var map = require('lodash-node/modern/collections/map');
var ContactStore = require('../stores/ContactStore');
var StoreMixin = require('fluxible').StoreMixin;

var ContactList = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      handleStoreChange: [ContactStore]
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      contacts: this.getStore(ContactStore).getContacts(),
    };
  },

  handleStoreChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
      <div>
        <h1>Contact list</h1>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  },

  renderContacts: function() {
    var contacts = this.state.contacts;
    return map(contacts, function(contact) {
      return (
        <li key={contact.id}>
          {contact.name}
        </li>
      );
    });
  }
});

module.exports = ContactList;