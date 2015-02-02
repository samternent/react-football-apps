var React = require('react');

var Dashboard = React.createFactory(require('./dashboard/dashboard.js'));

React.render(
  Dashboard(),
  document.getElementById('main'));
