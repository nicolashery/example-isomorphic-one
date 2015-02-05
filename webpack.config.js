var path = require('path');

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
  }
};

module.exports = config;
