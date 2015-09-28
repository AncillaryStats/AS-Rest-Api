(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('LeaderTablesCtrl', LeaderTablesCtrl)

  LeaderTablesCtrl.$inject = ['$http', '$q', '$scope', 'PositionLeaders'];

  function LeaderTablesCtrl($http, $q, $scope, PositionLeaders) {

    PositionLeaders.getQbs()
    .then(function() {
      $scope.qbPassingTds = PositionLeaders.rankings.qbPassingTds;
      $scope.qbPassingYards = PositionLeaders.rankings.qbPassingYards;
      $scope.qbr = PositionLeaders.rankings.qbr;
    }, function(err) {
      console.error(err.stack)
    })

    PositionLeaders.getRbs()
    .then(function() {
      $scope.rbTotalTds = PositionLeaders.rankings.rbTotalTds;
      $scope.rbTotalYards = PositionLeaders.rankings.rbTotalYards;
      $scope.rbTotalTouches = PositionLeaders.rankings.rbTotalTouches;
    }, function(err) {
      console.error(err.stack)
    })
  }

})()
