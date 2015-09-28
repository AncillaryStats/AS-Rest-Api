(function () {

  angular
    .module('SportsStats')
    .factory('PositionLeaders', PositionLeaders);

  PositionLeaders.$inject = ['$http', '$q'];

  function PositionLeaders($http, $q){

    var instance = {

      getQbs: getQbs,
      getRbs: getRbs,

      rankings: {
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
        rbTotalTds: {
          title: 'Total Touchdowns',
          category: 'total_tds',
          stats: []
        },
        rbTotalYards: {
          title: 'Total Yards',
          category: 'total_yards',
          stats: []
        },
        rbTotalTouches: {
          title: 'Total Touches',
          category: 'total_touches',
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
        console.log('qb leaders already exist')
        def.resolve()
      } else {
        console.log('getting new qb leadesr');
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

      if (instance.rankings.qbPassingTds.stats.length && instance.rankings.qbPassingYards.stats.length && instance.rankings.qbr.stats.length) {
        console.log('rb leaders already exist')
        def.resolve()
      } else {
        console.log('getting new rb leaders');
        var modRbStats = [];
        $http.get('/rbs/total')
        .then(function(res) {
          console.dir(res.data)
          var rbStats = res.data;
          rbStats.forEach(function(stat) {
          if (stat.is_season_totals) {
            stat.total_tds = stat.rush_tds + stat.rec_tds;
            stat.total_yards = stat.rush_yards + stat.rec_yards;
            stat.total_touches = stat.rush_attempts + stat.receptions;
            modRbStats.push(stat);
          }
        });
          instance.rankings.rbTotalTds.stats = getTopXInCatYForPosZ(10, 'total_tds', modRbStats);
          instance.rankings.rbTotalYards.stats = getTopXInCatYForPosZ(10, 'total_yards', modRbStats);
          instance.rankings.rbTotalTouches.stats = getTopXInCatYForPosZ(10, 'total_touches', modRbStats)
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
