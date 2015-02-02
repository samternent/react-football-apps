/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var ScoreSelector = require('../components/apps/score_selector.js');
var LeagueTable = require('../components/apps/league_table.js');
var Header = require('../components/layout/header.js');

var APP =
  React.createClass({
    handleClick: function () {
      AppActions.addItem('this is the item');
    },
    render: function(){
      return <div>
          <Header />
          <LeagueTable />
          </div>;
    }
  });
module.exports = APP;
