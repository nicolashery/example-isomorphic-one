var React = require('react');
var whenNode = require('react-router/node_modules/when/node');
var createContact = require('../actions/createContact');

var CreateContact = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query) {
      transition.wait(whenNode.call(function(cb) {
        transition.context.executeAction(createContact, query, function() {
          transition.redirect('/contacts');
          cb();
        });
      }));
    }
  },

  render: function() {
    return null;
  }
});

module.exports = CreateContact;
