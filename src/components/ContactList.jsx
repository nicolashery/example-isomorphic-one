var React = require('react');
var map = require('lodash-node/modern/collections/map');
var Link = require('react-router').Link;
var api = require('../api');

var ContactList = React.createClass({
  statics: {
    fetchData: function(cb) { api.getContacts(cb); }
  },

  getContacts: function() {
    if (!(this.props && this.props.data && this.props.data.contacts)) {
      return [];
    }
    return this.props.data.contacts;
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
    var contacts = this.getContacts();
    return map(contacts, function(contact) {
      return (
        <li key={contact.id}>
          <Link to="contact" params={{id: contact.id}}>{contact.name}</Link>
        </li>
      );
    });
  }
});

module.exports = ContactList;