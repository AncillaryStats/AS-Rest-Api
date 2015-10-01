(function () {

  angular
    .module('SportsStats')
    .factory('PositionStats', PositionStats);

  PositionStats.$inject = ['$http', '$q'];

  function PositionStats($http, $q){

    var instance = {

      getQbGames: getQbGames,
      getRbGames: getRbGames,
      getWrGames: getWrGames,
      getTeGames: getTeGames,
      QB: [],
      RB: [],
      WR: [],
      TE: []
    };

    return instance;

    // Return server call or cached version of qb games
    function getQbGames() {
      var def = $q.defer();
      if (instance.QB.length) {
        def.resolve()
      } else {
        $http.get('/qbs/games')
        .then(function(res) {
          instance.QB = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        });
      }
      return def.promise;
    }

    // Return server call or cached version of rb games
    function getRbGames() {
      var def = $q.defer();
      if (instance.RB.length) {
        def.resolve()
      } else {
        $http.get('/rbs/games')
        .then(function(res) {
          instance.RB = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

    // Return server call or cached version of wr games
    function getWrGames() {
      var def = $q.defer();
      if (instance.WR.length) {
        def.resolve()
      } else {
        $http.get('/wrs/games')
        .then(function(res) {
          instance.WR = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

    // Return server call or cached version of te games
    function getTeGames() {
      var def = $q.defer();
      if (instance.TE.length) {
        def.resolve();
      } else {
        $http.get('/tes/games')
        .then(function(res) {
          instance.TE = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

  }

}());
