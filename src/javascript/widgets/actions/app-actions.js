var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addItem: function (item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      item: item
    });
  },
  removeItem: function (item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ITEM,
      item: item
    });
  },
  increaseItem: function (item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.INCREASE_ITEM,
      item: item
    });
  },
  decreaseItem: function (item) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.DECREASE_ITEM,
      item: item
    });
  }
};

module.exports = AppActions;
