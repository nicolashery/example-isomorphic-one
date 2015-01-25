var React = require('react');
var map = require('lodash-node/modern/collections/map');
var NavLink = require("flux-router-component").NavLink;
var StoreMixin = require('fluxible').StoreMixin;
var ContactStore = require('../stores/ContactStore');

var ContactList = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired
  },

  mixins: [StoreMixin],
  
  statics: {
    storeListeners: {
      _onChange: [ContactStore]
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

  _onChange: function() {
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
    var context = this.props.context;
    var contacts = this.state.contacts;
    return map(contacts, function(contact) {
      var path = context.makePath('contact', {id: contact.id});
      return (
        <li key={contact.id}>
          <NavLink context={context} href={path}>{contact.name}</NavLink>
        </li>
      );
    });
  }
});

module.exports = ContactList;