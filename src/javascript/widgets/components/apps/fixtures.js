var React = require('react');

var ajax = require('component-ajax');
var io = require('socket.io-client');

var Fixtures =
  React.createClass({
    displayName: 'Fixtures',
    socket: io.connect(),

    getInitialState: function () {
      return {
        fixtures: []
      };
    },

    componentWillMount: function () {
      var that = this;
      // move socket connections to a league table store
      this.socket.on('update_fixtures', function (data) {
        console.log('its connected');
        that.setState({
          fixtures: data
        });
      });
    },
    render: function() {
      var Team = React.createClass({
          render: function () {
            return React.DOM.div({ className: '' },[
              React.DOM.div({}, this.props.team),
              React.DOM.div({}, this.props.score)
              ])
          }
        });

      var fixtures = this.state.fixtures.map(function (fixture) {

        return React.DOM.div({ },[
          Team({ team: fixture.match_localteam_name, score: fixture.match_localteam_score }),
          Team({ team: fixture.match_visitorteam_name, score: fixture.match_visitorteam_score })
          ]);
        });
      return React.DOM.div({ className: 'fixtures-table' }, fixtures);
    }
  });

module.exports = Fixtures;
