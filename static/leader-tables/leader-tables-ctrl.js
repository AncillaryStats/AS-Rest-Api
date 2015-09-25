(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('LeaderTablesCtrl', LeaderTablesCtrl)

  LeaderTablesCtrl.$inject = ['$http', '$q', '$scope'];

  function LeaderTablesCtrl($http, $q, $scope) {

    $scope.qbPassingTds = { title: 'Passing Touchdowns', category: 'passing_tds', stats: [] }
    $scope.qbPassingYards = { title: 'Passing Yards', category: 'passing_yards', stats: [] }
    $scope.qbr = { title: 'QBR', category: 'qbr', stats: [] }
    $scope.rbTotalTds = { title: 'Total Touchdowns', category: 'total_tds', stats: [] }
    $scope.rbTotalYards = { title: 'Total Yards', category: 'total_yards', stats: [] }
    $scope.rbTotalTouches = { title: 'Total Touches', category: 'total_touches', stats: [] }


    getQbs()
    getRbs()

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
        def.resolve();
      }, function(err) {
        console.error(err.stack);
        def.reject(err);
      });
      return def.promise;
    }

    function getRbs() {
      $http.get('/rbs')
      .then(function(res) {
        var rbStats = res.data;
        console.dir(rbStats)
        var modRbStats = []
        rbStats.forEach(function(stat) {
          if (stat.is_season_totals) {
            stat.total_tds = stat.rush_tds + stat.rec_tds;
            stat.total_yards = stat.rush_yards + stat.rec_yards;
            stat.total_touches = stat.rush_attempts + stat.receptions;
            modRbStats.push(stat);
          }
        });
        // console.dir(stats)

        $scope.rbTotalTds.stats = getTopXInCatYForPosZ(10, 'total_tds', modRbStats)
        $scope.rbTotalYards.stats = getTopXInCatYForPosZ(10, 'total_yards', modRbStats)
        $scope.rbTotalTouches.stats = getTopXInCatYForPosZ(10, 'total_touches', modRbStats)

        // var totalTdsLeaders = _.sortBy(stats, 'total_tds').reverse()
        // var totalYardsLeaders = _.sortBy(stats, 'total_yards').reverse()
        // var totalTouchesLeaders = _.sortBy(stats, 'total_touches').reverse()

        // vm.totalTdsLeaders = _.first(totalTdsLeaders, 10);
        // vm.totalYardsLeaders = _.first(totalYardsLeaders, 10);
        // vm.totalTouchesLeaders = _.first(totalTouchesLeaders, 10)

        // console.dir(stats)
      }, function(err) {
        console.err(err.stack);
      })
    }

    // function getQbs() {
    //   var def = $q.defer()
    //   $http.get('/qbs')
    //   .then(function(res) {
    //     var qbStats = res.data;
    //     $scope.qbPassingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
    //     $scope.qbPassingYards.stats = getTopXInCatYForPosZ(10, 'pass_yards', qbStats);
    //     $scope.qbr.stats = getTopXInCatYForPosZ(10, 'qb_rating', qbStats)
    //     def.resolve();
    //   }, function(err) {
    //     console.error(err.stack);
    //     def.reject(err);
    //   });
    //   return def.promise;
    // }

    // function getQbs() {
    //   var def = $q.defer()
    //   $http.get('/qbs')
    //   .then(function(res) {
    //     // console.dir(res.data)
    //     var qbStats = res.data;
    //     $scope.qbPassingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
    //     $scope.qbPassingYards.stats = getTopXInCatYForPosZ(10, 'pass_yards', qbStats);
    //     $scope.qbr.stats = getTopXInCatYForPosZ(10, 'qb_rating', qbStats)
    //     def.resolve();
    //   }, function(err) {
    //     console.error(err.stack);
    //     def.reject(err);
    //   });
    //   return def.promise;
    // }




  }

})()
