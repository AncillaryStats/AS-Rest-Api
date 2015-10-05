(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('SelectPlayersCtrl', SelectPlayersCtrl)

  SelectPlayersCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', 'PositionStats', '$rootScope', 'GraphInfo'];

  function SelectPlayersCtrl($http, $q, $scope, PlayerInfo, PositionStats, $rootScope, GraphInfo) {

    var selected = {}

    // Load all players by position
    PlayerInfo.get()
    .then(function() {
      $scope.QB = _.sortBy(_.where(PlayerInfo.players, { position: 'QB' }), 'name');
      $scope.RB = _.sortBy(_.where(PlayerInfo.players, { position: 'RB' }), 'name');
      $scope.WR = _.sortBy(_.where(PlayerInfo.players, { position: 'WR' }), 'name');
      $scope.TE = _.sortBy(_.where(PlayerInfo.players, { position: 'TE' }), 'name');
    }, function(err) {
      console.error(err);
    })

    // Redraw graph on category update
    $scope.updateCategory = function(cat, pos) {
      GraphInfo.category = cat;
      GraphInfo.position = pos
      $rootScope.$broadcast('updateGraph');
    }

    // Redraw graph on player(s) update
    $scope.updatePlayers = function(selected, $tag, cat, pos) {
      var players;
      if (!selected || !selected[pos]) {
        players = [$tag.text]
      } else {
        players = _.pluck(selected[pos], 'text');
      }
      GraphInfo.players = players
      GraphInfo.position = pos;
      GraphInfo.category = cat;
      $rootScope.$broadcast('updateGraph');
    }

    // TODO: Redraw graph on tab change
    $scope.loadTab = function() {
      // console.log('updating tab');
    }

    // Get players by position for autocomplete tags
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
