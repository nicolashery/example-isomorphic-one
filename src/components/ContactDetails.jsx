var React = require('react');
var StoreMixin = require('fluxible').StoreMixin;
var NavLink = require("flux-router-component").NavLink;
var ContactStore = require('../stores/ContactStore');

var ContactDetails = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired,
    contactId: React.PropTypes.string.isRequired
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
      contact: this.getStore(ContactStore).getContact(this.props.contactId),
    };
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  render: function() {
    return (
      <div>
        <h1>Contact details</h1>
        <p>
          <NavLink context={this.props.context} routeName="contacts">
            Back to contacts
          </NavLink>
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