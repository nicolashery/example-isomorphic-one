var React = require('react');

var Loading = React.createClass({
  propTypes: {
    timeout: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      timeout: 250
    };
  },

  getInitialState: function() {
    return {loading: false};
  },

  componentDidMount: function() {
    var self = this;
    this.timeout = setTimeout(function() {
      self.setState({loading: true});
    }, this.props.timeout);
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
