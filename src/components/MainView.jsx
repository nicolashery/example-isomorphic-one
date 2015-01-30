var React = require('react');
var RouteStore = require('../stores/RouteStore');
var ContactList = require('./ContactList.jsx');
var ContactDetails = require('./ContactDetails.jsx');
var ContactMessages = require('./ContactMessages.jsx');
var StoreMixin = require('fluxible').StoreMixin;

var MainView = React.createClass({
  mixins: [StoreMixin],

  propTypes: {
    context: React.PropTypes.object.isRequired
  },

  render: function() {
    // This is not working, throws a JSX warning message
    // and then a "process" is undefined error :(
    // var Component = this.getStore(RouteStore).getView('MainView');
    // return <Component context={this.props.context} params={this.getStore(RouteStore).getParams()}/>;

    var page = this.getStore(RouteStore).getPage();
    var params = this.getStore(RouteStore).getParams();
    if (page === 'contacts') {
      return <ContactList context={this.props.context} params={params} />;
    }
    if (page === 'contact') {
      return <ContactDetails context={this.props.context} params={params} />;
    }
    if (page === 'contact-messages') {
      return <ContactMessages context={this.props.context} params={params} />;
    }
    return null;
  }
});

module.exports = MainView;