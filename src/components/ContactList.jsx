var React = require('react');
var map = require('lodash/collection/map');
var Router = require('react-router');
var Link = Router.Link;
var AuthMixin = require('../utils/AuthMixin');
var FluxibleMixin = require('fluxible').Mixin;
var ContactStore = require('../stores/ContactStore');
var loadContacts = require('../actions/loadContacts');

var ContactList = React.createClass({
  mixins: [FluxibleMixin, AuthMixin],
  
  statics: {
    storeListeners: [ContactStore],

    fetchData: function(context, params, query, done) {
      context.executeAction(loadContacts, {}, done);
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

  onChange: function() {
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
          <Link to="contact-details" params={{id: contact.id}}>
            {contact.name}
          </Link>
        </li>
      );
    });
  }
});

module.exports = ContactList;