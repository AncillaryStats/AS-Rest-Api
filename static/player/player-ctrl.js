(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('PlayerCtrl', PlayerCtrl)

  PlayerCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', 'PositionStats', '$stateParams'];

  function PlayerCtrl($http, $q, $scope, PlayerInfo, PositionStats, $stateParams) {
    // Get basic player info
    PlayerInfo.get()
    .then(function() {
      var player = _.findWhere(PlayerInfo.players, { name: $stateParams.name });
      $scope.name = player.name;
      $scope.number = player.number;
      $scope.team = player.team;
      $scope.position = player.position
      return PositionStats.getAllGames()
    })
    .then(function() {
      var playerGames = _.where(PositionStats[$scope.position], { player_name: $stateParams.name })
    })

  }

})();
