var concurrent = require('contra').concurrent;
var values = require('lodash-node/modern/objects/values');
var filter = require('lodash-node/modern/collections/filter');
var map = require('lodash-node/modern/collections/map');
var env = require('./utils/env');

function fetchData(context, route, done) {
  if (env.CLIENT) {
    return done();
  }

  var views = values(route.config.views);
  var fetchDataViews = filter(views, function(view) {
    return view.fetchData;
  });
  if (fetchDataViews.length === 0) {
    return done();
  }

  var dataFetchers = map(fetchDataViews, function(view) {
    return view.fetchData.bind(null, context, route);
  });

  concurrent(dataFetchers, done);
}

module.exports = {
  index: {
    path: '/',
    method: 'get',
    page: 'contacts',
    views: {
      MainView: require('./components/ContactList.jsx')
    },
    action: fetchData
  },
  contacts: {
    path: '/contacts',
    method: 'get',
    page: 'contacts',
    views: {
      MainView: require('./components/ContactList.jsx')
    },
    action: fetchData
  },
  contact: {
    path: '/contact/:id',
    method: 'get',
    page: 'contact',
    views: {
      MainView: require('./components/ContactDetails.jsx')
    },
    action: fetchData
  },
  'contact-messages': {
    path: '/contact/:id/messages',
    method: 'get',
    page: 'contact-messages',
    views: {
      MainView: require('./components/ContactMessages.jsx')
    },
    action: fetchData
  }
};