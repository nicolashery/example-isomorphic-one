var React = require('react');

var Loading = React.createClass({
  getInitialState: function() {
    return {loading: false};
  },

  componentDidMount: function() {
    var self = this;
    this.timeout = setTimeout(function() {
      self.setState({loading: true});
    }, 1200);
  },

  componentWillUnmount: function() {
    clearTimeout(this.timeout);
  },

  render: function() {
    if (!this.state.loading) {
      return null;
    }

    return (
      <p>Loading...</p>
    );
  }
});

module.exports = Loading;
