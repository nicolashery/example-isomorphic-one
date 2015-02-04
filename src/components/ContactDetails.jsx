var React = require('react');
var FluxibleMixin = require('fluxible').Mixin;
var Router = require('react-router');
var Link = Router.Link;
var AuthMixin = require('../utils/AuthMixin');
var ContactStore = require('../stores/ContactStore');
var loadContacts = require('../actions/loadContacts');

var ContactDetails = React.createClass({
  mixins: [FluxibleMixin, Router.State, AuthMixin],
  
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
      contact: this.getStore(ContactStore).getContact(this.getContactId())
    };
  },

  onChange: function() {
    this.setState(this.getStateFromStores());
  },

  getContactId: function() {
    return this.getParams().id;
  },

  render: function() {
    return (
      <div>
        <h1>Contact details</h1>
        <p>
          <Link to="contacts">
            Back to contacts
          </Link>
          {' - '}
          <Link to="contact-messages" params={{id: this.getContactId()}}>
            Contact messages
          </Link>
        </p>
        {this.renderContact()}
      </div>
    );
  },

  renderContact: function() {
    var contact = this.state.contact;
    if (!contact) {
      return null;
    }
    return (
      <ul>
        <li><strong>ID: </strong>{contact.id}</li>
        <li><strong>Name: </strong>{contact.name}</li>
      </ul>
    );
  }
});

module.exports = ContactDetails;