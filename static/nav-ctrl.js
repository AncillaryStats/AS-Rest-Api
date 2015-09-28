(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('NavCtrl', NavCtrl)

  NavCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', 'PositionStats', '$rootScope', 'GraphInfo'];

  function NavCtrl($http, $q, $scope, PlayerInfo, PositionStats, $rootScope, GraphInfo) {

  }

})();
