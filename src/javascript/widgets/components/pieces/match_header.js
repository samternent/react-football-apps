/** @jsx React.DOM */
var React = require('react');


var MatchHeader =
  React.createClass({
    render: function() {
      return React.DOM.div( {
          className: 'match--header'
        },[
            React.DOM.div({ className: 'logo chelsea' })
        ]);
    }
  });

module.exports = MatchHeader;
