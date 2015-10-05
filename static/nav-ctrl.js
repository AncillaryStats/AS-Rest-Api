(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('NavCtrl', NavCtrl)

  NavCtrl.$inject = ['$http', '$q', '$scope', 'PlayerInfo', '$state'];

  function NavCtrl($http, $q, $scope, PlayerInfo, $state) {

    // Search players by name
    $scope.getPlayers = function($query) {
      var def = $q.defer()
      var playerNames = _.pluck(PlayerInfo.players, 'name')
      var filteredPlayers = _.filter(playerNames, function(player) {
        return player.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
      def.resolve(filteredPlayers)
      return def.promise;
    }

    // Go to player page on auto-complete selection
    $scope.goToPlayer = function(playerName, query, $tag) {
      $state.go('player', { name: $tag.text })
      $scope.playerName = null;
    }
  }

})();
