/** @jsx React.DOM */
var React = require('react');

var ajax = require('component-ajax');
var io = require('socket.io-client');

// table object

// stand_away_d: "0"
// stand_away_ga: "3"
// stand_away_gp: "11"
// stand_away_gs: "24"
// stand_away_l: "0"
// stand_away_w: "10"
// stand_competition_id: "1204"
// stand_country: "England"
// stand_desc: "Promotion - Champions League (Group Stage)"
// stand_gd: "27"
// stand_group: ""
// stand_home_d: "0"
// stand_home_ga: "3"
// stand_home_gp: "10"
// stand_home_gs: "24"
// stand_home_l: "0"
// stand_home_w: "10"
// stand_id: "12049092"
// stand_overall_d: "4"
// stand_overall_ga: "19"
// stand_overall_gp: "21"
// stand_overall_gs: "46"
// stand_overall_l: "2"
// stand_overall_w: "15"
// stand_points: "49"
// stand_position: "1"
// stand_recent_form: "WLDWW"
// stand_round: "21"
// stand_season: "2014/2015"
// stand_stage_id: "12041081"
// stand_status: "same"
// stand_team_id: "9092"
// stand_team_name: "Chelsea"


var LeagueTable =
React.createClass({
  displayName: 'LeagueTable',
  socket: io.connect(),

  getInitialState: function () {
    return {
      teams: []
    };
  },

  componentWillMount: function () {
    var that = this;
    // move socket connections to a league table store
    this.socket.on('update_standings', function (data) {
      that.setState({
        teams: data
      });
    });
  },

  render: function() {
    console.log(this.state.teams);
    var tableRows = this.state.teams.map(function (team) {
      var positionClass = 'position-' + team.stand_position;
      var form = team.stand_recent_form.split('');
      var formRender = form.map(function (game) {
        return React.DOM.div({ className: 'form-indicator ' + game });
      });
      return React.DOM.div({},[
          React.DOM.div({
            className: 'league-table--row top ' + positionClass,
            key: 'top-row'
          }, [
            React.DOM.div({ className: 'league-table--row__position' }, team.stand_position ),
            React.DOM.div({ className: 'league-table--row__club' }, team.stand_team_name ),
            React.DOM.div({ className: 'league-table--row__points' }, team.stand_points )
          ]),
          formRender,
          React.DOM.div({
            className: 'league-table--row bottom ' + positionClass,
            key: 'bottom-row'
          }, [
            React.DOM.div({ className: 'league-table--row__two' }, team.stand_overall_gp ),
            React.DOM.div({ className: 'league-table--row__two' }, team.stand_overall_w ),
            React.DOM.div({ className: 'league-table--row__two' }, team.stand_overall_l ),
            React.DOM.div({ className: 'league-table--row__two' }, team.stand_overall_d ),
            React.DOM.div({ className: 'league-table--row__one' }, team.stand_overall_gs ),
            React.DOM.div({ className: 'league-table--row__one' }, team.stand_overall_ga ),
            React.DOM.div({ className: 'league-table--row__two' }, team.stand_overall_gs - team.stand_overall_ga )
          ])
        ]);
    });


    return React.DOM.div({ className: 'league-table' }, tableRows);
  }
});

module.exports = LeagueTable;
