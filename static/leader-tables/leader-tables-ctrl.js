(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('LeaderTablesCtrl', LeaderTablesCtrl)

  LeaderTablesCtrl.$inject = ['$http', '$q', '$scope'];

  function LeaderTablesCtrl($http, $q, $scope) {

    console.log('fuck me');
    $scope.qbPassingTds = { title: 'Passing Touchdowns', category: 'passing_tds', stats: [] }
    $scope.qbPassingYards = { title: 'Passing Yards', category: 'passing_yards', stats: [] }
    $scope.qbr = { title: 'QBR', category: 'qbr', stats: [] }

    getQbs()

    function getTopXInCatYForPosZ(numLeaders, leadersCategory, positionStats) {
      var seasonTotals = _.where(positionStats, {'is_season_totals': true});
      var rankedLeaders = _.sortBy(seasonTotals, leadersCategory).reverse();
      var simplifiedStats = _.map(rankedLeaders, function(leader) {
        return {
          player_name: leader.player_name,
          stat: leader[leadersCategory]
        }
      })
      return _.first(simplifiedStats, numLeaders)
    }

    function getQbs() {
      var def = $q.defer()
      $http.get('/qbs')
      .then(function(res) {
        var qbStats = res.data;
        $scope.qbPassingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
        $scope.qbPassingYards.stats = getTopXInCatYForPosZ(10, 'pass_yards', qbStats);
        $scope.qbr.stats = getTopXInCatYForPosZ(10, 'qb_rating', qbStats)
        // console.log(vm.qbLeaders)
        // def.resolve(vm.qbLeaders)
        def.resolve();
      }, function(err) {
        console.error(err.stack);
        def.reject(err);
      });
      return def.promise;
    }




  }

})()
