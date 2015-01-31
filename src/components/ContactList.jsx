var React = require('react');
var map = require('lodash-node/modern/collections/map');
var Router = require('react-router');
var Link = Router.Link;
var StoreMixin = require('fluxible').StoreMixin;
var ContactStore = require('../stores/ContactStore');
var loadContacts = require('../actions/loadContacts');

var ContactList = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired
  },

  mixins: [StoreMixin],
  
  statics: {
    storeListeners: {
      _onChange: [ContactStore]
    },
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