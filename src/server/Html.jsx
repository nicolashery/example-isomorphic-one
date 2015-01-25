var React = require('react');

var Html = React.createClass({
    propTypes: {
      markup: React.PropTypes.string.isRequired,
      state: React.PropTypes.string.isRequired
    },

    render: function() {
      return (
        <html>
        <head>
          <meta charSet="utf-8" />
          <title>Isomorphic</title>
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src="/public/client.js" defer></script>
        </html>
      );
    }
});

module.exports = Html;