var React = require('react');

var ajax = require('component-ajax');
var io = require('socket.io-client');

var LiveScores =
  React.createClass({
    displayName: 'LiveScores',
    socket: io.connect(),

    getInitialState: function () {
      return {
        scores: []
      };
    },

    componentWillMount: function () {
      var that = this;
      // move socket connections to a league table store
      this.socket.on('update_scores', function (data) {
        that.setState({
          scores: data
        });
      });
    },
    render: function() {
      var _props = this.props;

      var Team = React.createClass({
        render: function () {
          return React.DOM.div({ className: 'team-score' },[
            React.DOM.div({ className: 'team-score--name' }, this.props.team),
            React.DOM.div({ className: 'team-score--score' }, this.props.score)
          ])
        }
      });

      var MatchEvents = React.createClass({
        render: function () {
          if (this.props.events) {
            var events = this.props.events.reverse().map(function (event) {
              return React.DOM.div({ className: event.event_team }, [
                React.DOM.div({ className: 'event__minute'}, event.event_minute),
                React.DOM.div({ className: 'event__type'}, event.event_type),
                React.DOM.div({ className: 'event__player'}, event.event_player),
                ]);
            });
            return React.DOM.div({ className: 'match-events' }, events);
          } else {
            return React.DOM.div({ className: 'match-events' });
          }
        }
      });

      var scores = this.state.scores.map(function (fixture, i) {
        if (_props.showMatch === i+1 ) {
          return React.DOM.div({ },[
            Team({ team: fixture.match_localteam_name, score: fixture.match_localteam_score }),
            Team({ team: fixture.match_visitorteam_name, score: fixture.match_visitorteam_score }),
            MatchEvents({ events: fixture.match_events })
            ]);
        }

        });
        return React.DOM.div({ className: 'fixtures-table' }, scores);
      }
  });

module.exports = LiveScores;
