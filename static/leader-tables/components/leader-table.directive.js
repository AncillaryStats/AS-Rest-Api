// (function() {

  angular
    .module('SportsStats')
    .directive('leaderTable', leaderTable);

    function leaderTable() {
      return {
        restrict: 'EA',
        templateUrl: 'static/leader-tables/components/leader-table.template.html',
        // controller: TableCtrl,
        // controllerAs: 'vm',
        // bindToController: true,
        scope: {
          categoryInfo: '=info'
        }
      }

      // LeaderTableCtrl.$inject = ['$http', '$q', '$scope']

      // function TableCtrl($http, $q, $scope) {

      //   var vm = this;

      //   vm.test = "Something"

      //   vm.qbPassingTds = { title: 'Passing Touchdowns', stats: [] };

      //   vm.qbLeaders = {}
      //   vm.qbLeaders.passingTds = { title: 'Passing Touchdowns', stats: [] };
      //   vm.qbLeaders.passingYards = { title: 'Passing Yards', stats: [] };
      //   vm.qbLeaders.qbr = { title: 'QBR', stats: [] }

      //   getQbs()

      //   function getTopXInCatYForPosZ(numLeaders, leadersCategory, positionStats) {
      //     var seasonTotals = _.where(positionStats, {'is_season_totals': true});
      //     var rankedLeaders = _.sortBy(seasonTotals, leadersCategory).reverse();
      //     return _.first(rankedLeaders, numLeaders)
      //   }

      //   function getQbs() {
      //     var def = $q.defer()
      //     $http.get('/qbs')
      //     .then(function(res) {
      //       var qbStats = res.data;
      //       vm.qbPassingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
      //       vm.qbLeaders.passingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
      //       vm.qbLeaders.passingYards = getTopXInCatYForPosZ(10, 'pass_yards', qbStats);
      //       vm.qbLeaders.qbr = getTopXInCatYForPosZ(10, 'qb_rating', qbStats)
      //       console.log(vm.qbLeaders)
      //       def.resolve(vm.qbLeaders)
      //     }, function(err) {
      //       console.error(err.stack);
      //       def.reject(err);
      //     });
      //     return def.promise;
      //   }

      // }

 
    }

// });
