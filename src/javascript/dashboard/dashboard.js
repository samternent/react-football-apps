var React = require('react');

var LeagueTable = require('../widgets/components/apps/league_table.js');
var LiveScores = require('../widgets/components/apps/live_scores.js');
var Fixtures = require('../widgets/components/apps/fixtures.js');

var Navigation =
  React.createClass({
    displayName: 'Navigation',

    render: function () {
      return React.DOM.nav({
          className: 'navigation--wrapper'
        }, [
          React.DOM.header({}, [
            React.DOM.h1({}, 'Some football apps')
            ])
        ]);
    }
  });

module.exports = Navigation;

var Dashboard =
  React.createClass({
    displayName: 'Dashboard',

    render: function () {
      var Dashboard = React.DOM.div({
          className: 'dashboard--wrapper'
        }, [
          React.DOM.div({
              className: 'dashboard--column'
            },[
              React.DOM.div({ className: 'app--container' }, LeagueTable() )
            ]),
          React.DOM.div({
            className: 'dashboard--column'
          },[
            React.DOM.div({ className: 'app--container' }, LiveScores({ showMatch: 1 }) ),
            React.DOM.div({ className: 'app--container' }, LiveScores({ showMatch: 2 }) )
          ])
        ]);

        return React.DOM.div({ className: 'container' },[ Navigation(), Dashboard ]);
    }
  });

module.exports = Dashboard;
