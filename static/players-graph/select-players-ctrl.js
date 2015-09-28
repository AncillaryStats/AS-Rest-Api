(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('SelectPlayersCtrl', SelectPlayersCtrl)

  SelectPlayersCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', 'PositionStats', '$rootScope', 'GraphInfo'];

  function SelectPlayersCtrl($http, $q, $scope, PlayerInfo, PositionStats, $rootScope, GraphInfo) {

    $scope.qbCategory;

    PlayerInfo.get()
    .then(function() {
      $scope.qbs = _.sortBy(_.where(PlayerInfo.players, { position: 'QB' }), 'name');
      $scope.rbs = _.sortBy(_.where(PlayerInfo.players, { position: 'RB' }), 'name');
      $scope.wrs = _.sortBy(_.where(PlayerInfo.players, { position: 'WR' }), 'name');
      $scope.tes = _.sortBy(_.where(PlayerInfo.players, { position: 'TE' }), 'name');
    }, function(err) {
      console.error(err);
    })

    function updateGraph() {

    }

    $scope.updateCategory = function(cat) {
      console.log(cat)
      GraphInfo.category = cat;
      $rootScope.$broadcast('updateGraph');
    }

    $scope.updatePlayers = function(selected, $tag, cat, pos) {
      var players;
      if (!selected) {
        players = [$tag.text]
      } else {
        players = _.pluck(selected[pos], 'text');
      }
      console.log(cat)
      GraphInfo.players = players
      GraphInfo.position = pos;
      GraphInfo.category = cat;
      $rootScope.$broadcast('updateGraph');
    }

    $scope.getPosition = function($query, position) {
      var def = $q.defer()
      var playerNames = _.pluck($scope[position], 'name')
      var filteredPlayers = _.filter(playerNames, function(qb) {
        return qb.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
      def.resolve(filteredPlayers)
      return def.promise;
    }

  }

})();
