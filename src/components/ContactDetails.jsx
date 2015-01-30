var React = require('react');
var StoreMixin = require('fluxible').StoreMixin;
var NavLink = require("flux-router-component").NavLink;
var ContactStore = require('../stores/ContactStore');
var loadContacts = require('../actions/loadContacts');

var ContactDetails = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  },

  mixins: [StoreMixin],
  
  statics: {
    storeListeners: {
      _onChange: [ContactStore]
    },
    fetchData: function(context, route, done) {
      context.executeAction(loadContacts, {}, done);
    }
  },

  getInitialState: function() {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      contact: this.getStore(ContactStore).getContact(this.props.params.id)
    };
  },

  _onChange: function() {
    this.setState(this.getStateFromStores());
  },

  componentDidMount: function() {
    if (!this.props.context.isRendered()) {
      return;
    }
    ContactDetails.fetchData(this.props.context);
  },

  render: function() {
    return (
      <div>
        <h1>Contact details</h1>
        <p>
          <NavLink context={this.props.context} routeName="contacts">
            Back to contacts
          </NavLink>
          {' - '}
          <NavLink context={this.props.context} routeName="contact-messages"
            navParams={{id: this.props.params.id}}>
            Contact messages
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