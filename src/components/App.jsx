var React = require('react');
var ContactList = require('./ContactList.jsx');

var App = React.createClass({
  render: function() {
    return (
      <ContactList context={this.props.context} />
    );
  }
});

module.exports = App;