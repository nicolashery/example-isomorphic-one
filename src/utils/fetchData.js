var concurrent = require('contra').concurrent;
var filter = require('lodash-node/modern/collections/filter');
var forEach = require('lodash-node/modern/collections/forEach');
var env = require('./env');

function fetchData(routes, params, cb) {
  if (env.CLIENT && typeof window.__DATA__ !== 'undefined') {
    var props = window.__DATA__;
    delete window.__DATA__;
    return cb(null, props);
  }

  var fetchDataRoutes = filter(routes, function(route) {
    return route.handler.fetchData;
  });
  if (fetchDataRoutes.length === 0) {
    return cb(null, {});
  }

  var dataFetchers = {};
  forEach(fetchDataRoutes, function(route) {
    var fetcher = route.handler.fetchData;
    if (fetcher.length == 2) {
      fetcher = fetcher.bind(null, params);
    }
    dataFetchers[route.name] = fetcher;
  });

  concurrent(dataFetchers, function(err, data) {
    cb(err, data);
  });
}

module.exports = fetchData;