var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

module.exports = [
  <Route path="/" handler={require('./components/App.jsx')}>
    <Route name="contacts" handler={require('./components/ContactList.jsx')}/>
    <Route name="contact-details" path="/contact/:id" handler={require('./components/ContactDetails.jsx')}/>
    <Route name="contact-messages" path="/contact/:id/messages" handler={require('./components/ContactMessages.jsx')}/>
    <Redirect from="/" to="contacts" />
  </Route>,
  <NotFoundRoute name="not-found" handler={require('./components/NotFound.jsx')}/>
];