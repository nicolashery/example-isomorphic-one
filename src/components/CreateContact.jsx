var React = require('react');
var createContact = require('../actions/createContact');

var CreateContact = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, cb) {
      transition.context.executeAction(createContact, query, function() {
        transition.redirect('/contacts');
        cb();
      });
    }
  },

  render: function() {
    return null;
  }
});

module.exports = CreateContact;
