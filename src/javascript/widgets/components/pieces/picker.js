/** @jsx React.DOM */
var React = require('react');

var ScoreBox =
  React.createClass({
    render: function () {
      return React.DOM.div({
          className: 'score--box float--left'
        },
        [
          React.DOM.span({
            className: 'arrow up'
          }, 'up'),
          React.DOM.div({
            className: 'score--prediction'
          },
            React.DOM.div({}, '?')
          ),
          React.DOM.span({
            className: 'arrow down'
          }, 'down')
        ]);
    }
  });

var ScorePicker =
  React.createClass({
    render: function() {
      return React.DOM.div( {
          className: 'score--picker'
        },
        [
          <ScoreBox />,
          <ScoreBox />
      ]);
    }
  });

module.exports = ScorePicker;
