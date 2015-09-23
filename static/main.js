(function () {

  'use strict';

  angular.module('SportsStats', [])

  .controller('NflQbCtrl', ['$http', '$q', function($http, $q) {

    var vm = this;

    vm.passingTdsLeaders = [];
    vm.passingYardsLeaders = [];
    vm.qbrLeaders = [];

    getQbGames()

    function getQbGames() {
       $http.get('/qbs')
       .then(function(response) {
          var stats = [];
          response.data.forEach(function(stat) {
            if (stat.is_season_totals) {
              stats.push(stat);
            }
          });

          var passingTdLeaders = _.sortBy(stats, 'pass_tds').reverse();
          var passingYardsLeaders = _.sortBy(stats, 'pass_yards').reverse();
          var qbrLeaders = _.sortBy(stats, 'qb_rating').reverse();
        
          vm.passingTdsLeaders = _.first(passingTdLeaders, 10);
          vm.passingYardsLeaders = _.first(passingYardsLeaders, 10);
          vm.qbrLeaders = _.first(qbrLeaders, 10);
          console.log(vm.qbrLeaders);
          console.dir(response.data)

       }, function(error) {
          console.log('Error:', error);
       })
    }
  }

  ])

  .controller('NflRbCtrl', ['$http', function($http) {

    var vm = this;

    vm.totalTdsLeaders = [];
    vm.totalYardsLeaders = [];
    vm.totalTouchesLeaders = [];

    getRbGames();

    function getRbGames() {
      $http.get('/rbs')
      .then(function(response) {
        var stats = []
        response.data.forEach(function(stat) {
          if (stat.is_season_totals) {
            stat.total_tds = stat.rush_tds + stat.rec_tds;
            stat.total_yards = stat.rush_yards + stat.rec_yards;
            stat.total_touches = stat.rush_attempts + stat.receptions;
            stats.push(stat);
          }
        });

        var totalTdsLeaders = _.sortBy(stats, 'total_tds').reverse()
        var totalYardsLeaders = _.sortBy(stats, 'total_yards').reverse()
        var totalTouchesLeaders = _.sortBy(stats, 'total_touches').reverse()

        vm.totalTdsLeaders = _.first(totalTdsLeaders, 10);
        vm.totalYardsLeaders = _.first(totalYardsLeaders, 10);
        vm.totalTouchesLeaders = _.first(totalTouchesLeaders, 10)



        console.dir(stats)
      }, function(error) {
        console.log('Error:', error);
      })
    }

  }
  ])

})();