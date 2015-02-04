var React = require('react');
var concurrent = require('contra').concurrent;
var map = require('lodash-node/modern/collections/map');
var Router = require('react-router');
var Link = Router.Link;
var AuthMixin = require('../utils/AuthMixin');
var FluxibleMixin = require('fluxible').Mixin;
var ContactStore = require('../stores/ContactStore');
var MessageStore = require('../stores/MessageStore');
var loadContacts = require('../actions/loadContacts');
var loadMessages = require('../actions/loadMessages');

var ContactMessages = React.createClass({
  mixins: [FluxibleMixin, Router.State, AuthMixin],
  
  statics: {
    storeListeners: [ContactStore, MessageStore],

    fetchData: function(context, params, query, done) {
      concurrent([
        context.executeAction.bind(context, loadContacts, {}),
        context.executeAction.bind(context, loadMessages, {contactId: params.id})
      ], done || function() {});
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      contact: this.getStore(ContactStore).getContact(this.getContactId()),
      messages: this.getStore(MessageStore).getMessages(this.getContactId())
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
        <h1>Contact messages</h1>
        <p>
          <Link to="contacts">
            Back to contacts
          </Link>
          {' - '}
          <Link to="contact-details" params={{id: this.getContactId()}}>
            Contact details
          </Link>
        </p>
        {this.renderMessages()}
      </div>
    );
  },

  renderMessages: function() {
    var contact = this.state.contact;
    var messages = this.state.messages;
    return map(messages, function(message, index) {
      return (
        <p key={index}>
          <strong>{(message.to ? 'me' : contact.name) + ': '}</strong>
          {message.content}
        </p>
      );
    });
  }
});

module.exports = ContactMessages;