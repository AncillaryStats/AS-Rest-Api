(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('PlayerCtrl', PlayerCtrl)

  PlayerCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', 'PositionStats', '$stateParams'];

  function PlayerCtrl($http, $q, $scope, PlayerInfo, PositionStats, $stateParams) {

    console.log($stateParams.name)

    // Get basic player info
    PlayerInfo.get()
    .then(function() {
      var player = _.findWhere(PlayerInfo.players, { name: $stateParams.name });
      console.log(player)
      $scope.name = player.name;
      $scope.number = player.number;
      $scope.team = player.team;
      $scope.position = player.position

    })
  }

})();
