var React = require('react');
var ContactList = require('./ContactList.jsx');
var ContactDetails = require('./ContactDetails.jsx');

var MainView = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired,
    page: React.PropTypes.string.isRequired,
    params: React.PropTypes.object.isRequired
  },

  render: function() {
    var page = this.props.page;
    var params = this.props.params;

    if (page === 'contacts') {
      return <ContactList context={this.props.context} />
    }
    if (page === 'contact') {
      return <ContactDetails context={this.props.context} contactId={params.id} />
    }
    return null;
  }
});

module.exports = MainView;