(function () {

  angular
    .module('SportsStats')
    .factory('PositionLeaders', PositionLeaders);

  PositionLeaders.$inject = ['$http', '$q'];

  function PositionLeaders($http, $q){

    var instance = {

      // Promise calls to ensure rankings exist
      getQbs: getQbs,
      getRbs: getRbs,
      getWrs: getWrs,
      getTes: getTes,

      rankings: {
        // QB Tables
        qbPassingTds: {
          title: 'Passing Touchdowns',
          category: 'passing_tds',
          stats: []
        },
        qbPassingYards: {
          title: 'Passing Yards',
          category: 'passing_yards',
          stats: []
        },
        qbr: {
          title: 'QBR',
          category: 'qbr',
          stats: []
        },
        // RB Tables
        rbRushingTds: {
          title: 'Rushing Touchdowns',
          category: 'rush_tds',
          stats: []
        },
        rbRushingYards: {
          title: 'Rushing Yards',
          category: 'rush_yards',
          stats: []
        },
        rbRushes: {
          title: 'Rushes',
          category: 'rush_attempts',
          stats: []
        },
        // WR Tables
        wrReceivingTds: {
          title: 'Receiving Touchdowns',
          category: 'rec_tds',
          stats: []
        },
        wrReceivingYards: {
          title: 'Receiving Tards',
          category: 'rec_yards',
          stats: []
        },
        wrReceptions: {
          title: 'Receptions',
          category: 'receptions',
          stats: []
        },
        // TE Tables
        teReceivingTds: {
          title: 'Receiving Touchdowns',
          category: 'rec_tds',
          stats: []
        },
        teReceivingYards: {
          title: 'Receiving Tards',
          category: 'rec_yards',
          stats: []
        },
        teReceptions: {
          title: 'Receptions',
          category: 'receptions',
          stats: []
        },
      }
    };

    return instance;

    // Get top X num of players in category Y for position Z
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

    // Return qb season stats (cached in factory or from fresh request)
    function getQbs() {
      var def = $q.defer()
      if (instance.rankings.qbPassingTds.stats.length && instance.rankings.qbPassingYards.stats.length && instance.rankings.qbr.stats.length) {
        def.resolve()
      } else {
        $http.get('/qbs')
        .then(function(res) {

          var qbStats = res.data;
          instance.rankings.qbPassingTds.stats = getTopXInCatYForPosZ(10, 'pass_tds', qbStats);
          instance.rankings.qbPassingYards.stats = getTopXInCatYForPosZ(10, 'pass_yards', qbStats);
          instance.rankings.qbr.stats = getTopXInCatYForPosZ(10, 'qb_rating', qbStats)
          def.resolve()
        }, function(err) {
          console.error(err.stack);
          def.reject(err);
        });
      }

      return def.promise;
    }

    // Return rb season stats (cached in factory or from fresh request)
    function getRbs() {
      var def = $q.defer()
      if (instance.rankings.rbRushingTds.stats.length && instance.rankings.rbRushingYards.stats.length && instance.rankings.rbRushes.stats.length) {
        def.resolve()
      } else {
        $http.get('/rbs/total')
        .then(function(res) {
          var rbStats = res.data;

          instance.rankings.rbRushingTds.stats = getTopXInCatYForPosZ(10, 'rush_tds', rbStats);
          instance.rankings.rbRushingYards.stats = getTopXInCatYForPosZ(10, 'rush_yards', rbStats);
          instance.rankings.rbRushes.stats = getTopXInCatYForPosZ(10, 'rush_attempts', rbStats)
          def.resolve()
        }, function(err) {
          console.error(err.stack);
          def.reject(err);
        });
      }

      return def.promise;
    }




    // Return wr season stats (cached in factory or from fresh request)
    function getWrs() {
      var def = $q.defer()
      if (instance.rankings.wrReceivingTds.stats.length && instance.rankings.wrReceivingYards.stats.length && instance.rankings.wrReceptions.stats.length) {
        def.resolve()
      } else {
        $http.get('/wrs/total')
        .then(function(res) {
          var wrStats = res.data;
          instance.rankings.wrReceivingTds.stats = getTopXInCatYForPosZ(10, 'rec_tds', wrStats);
          instance.rankings.wrReceivingYards.stats = getTopXInCatYForPosZ(10, 'rec_yards', wrStats);
          instance.rankings.wrReceptions.stats = getTopXInCatYForPosZ(10, 'receptions', wrStats)
          def.resolve()
        }, function(err) {
          console.error(err.stack);
          def.reject(err);
        });
      }
      return def.promise;
    }

    // Return te season stats (cached in factory or from fresh request)
    function getTes() {
      var def = $q.defer()
      if (instance.rankings.teReceivingTds.stats.length && instance.rankings.teReceivingYards.stats.length && instance.rankings.teReceptions.stats.length) {
        def.resolve()
      } else {
        $http.get('/tes/total')
        .then(function(res) {
          var teStats = res.data;
          instance.rankings.teReceivingTds.stats = getTopXInCatYForPosZ(10, 'rec_tds', teStats);
          instance.rankings.teReceivingYards.stats = getTopXInCatYForPosZ(10, 'rec_yards', teStats);
          instance.rankings.teReceptions.stats = getTopXInCatYForPosZ(10, 'receptions', teStats)
          def.resolve()
        }, function(err) {
          console.error(err.stack);
          def.reject(err);
        });
      }
      return def.promise;
    }

  }

}());
