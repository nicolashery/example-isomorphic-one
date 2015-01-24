var React = require('react');
var api = require('../api');

var ContactDetails = React.createClass({
  statics: {
    fetchData: function(params, cb) { api.getContact(params.id, cb); }
  },

  getContact: function() {
    if (!(this.props && this.props.data && this.props.data.contact)) {
      return null;
    }
    return this.props.data.contact;
  },

  render: function() {
    return (
      <div>
        <h1>Contact details</h1>
        {this.renderContact()}
      </div>
    );
  },

  renderContact: function() {
    var contact = this.getContact();
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