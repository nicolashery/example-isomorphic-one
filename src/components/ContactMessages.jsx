var React = require('react');
var concurrent = require('contra').concurrent;
var map = require('lodash-node/modern/collections/map');
var StoreMixin = require('fluxible').StoreMixin;
var NavLink = require("flux-router-component").NavLink;
var ContactStore = require('../stores/ContactStore');
var MessageStore = require('../stores/MessageStore');
var loadContacts = require('../actions/loadContacts');
var loadMessages = require('../actions/loadMessages');

var ContactMessages = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  },

  mixins: [StoreMixin],
  
  statics: {
    storeListeners: {
      _onChange: [ContactStore, MessageStore]
    },
    fetchData: function(context, route, done) {
      done = done || function() {};
      concurrent([
        context.executeAction.bind(null, loadContacts, {}),
        context.executeAction.bind(null, loadMessages, {contactId: route.params.id})
      ], done);
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      contact: this.getStore(ContactStore).getContact(this.props.params.id),
      messages: this.getStore(MessageStore).getMessages(this.props.params.id)
    };
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  componentDidMount: function() {
    if (!this.props.context.isRendered()) {
      return;
    }
    ContactMessages.fetchData(this.props.context, {params: this.props.params});
  },

  render: function() {
    return (
      <div>
        <h1>Contact messages</h1>
        <p>
          <NavLink context={this.props.context} routeName="contacts">
            Back to contacts
          </NavLink>
          {' - '}
          <NavLink context={this.props.context} routeName="contact"
            navParams={{id: this.props.params.id}}>
            Contact details
          </NavLink>
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