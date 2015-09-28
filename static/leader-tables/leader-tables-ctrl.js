(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('LeaderTablesCtrl', LeaderTablesCtrl)

  LeaderTablesCtrl.$inject = ['$http', '$q', '$scope', 'PositionLeaders'];

  function LeaderTablesCtrl($http, $q, $scope, PositionLeaders) {

    // Set qb leader rankings to $scope
    PositionLeaders.getQbs()
    .then(function() {
      $scope.qbPassingTds = PositionLeaders.rankings.qbPassingTds;
      $scope.qbPassingYards = PositionLeaders.rankings.qbPassingYards;
      $scope.qbr = PositionLeaders.rankings.qbr;
    }, function(err) {
      console.error(err.stack)
    })

    // Set rb leader rankings to $scope
    PositionLeaders.getRbs()
    .then(function() {
      $scope.rbRushingTds = PositionLeaders.rankings.rbRushingTds;
      $scope.rbRushingYards = PositionLeaders.rankings.rbRushingYards;
      $scope.rbRushes = PositionLeaders.rankings.rbRushes;
    }, function(err) {
      console.error(err.stack)
    })

    // Set wr leader rankings to $scope
    PositionLeaders.getWrs()
    .then(function() {
      $scope.wrReceivingTds = PositionLeaders.rankings.wrReceivingTds;
      $scope.wrReceivingYards = PositionLeaders.rankings.wrReceivingYards;
      $scope.wrReceptions = PositionLeaders.rankings.wrReceptions;
    }, function(err) {
      console.error(err.stack)
    })

    // Set te leader rankings to $scope
    PositionLeaders.getTes()
    .then(function() {
      $scope.teReceivingTds = PositionLeaders.rankings.teReceivingTds;
      $scope.teReceivingYards = PositionLeaders.rankings.teReceivingYards;
      $scope.teReceptions = PositionLeaders.rankings.teReceptions;
    }, function(err) {
      console.error(err.stack)
    })
  }

})()
