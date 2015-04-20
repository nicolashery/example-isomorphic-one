var path = require('path');
var webpack = require('webpack');

var config = {
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'client.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx'}
    ]
  },
  plugins: [
    // See:
    // https://github.com/yahoo/fluxible/issues/138
    new webpack.IgnorePlugin(/vertx/)
  ]
};

module.exports = config;
