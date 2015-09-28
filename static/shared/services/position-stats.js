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
      qbs: [],
      rbs: [],
      wrs: [],
      tes: []
    };

    return instance;

    // Return server call or cached version of qb games
    function getQbGames() {
      var def = $q.defer();
      if (instance.qbs.length) {
        def.resolve()
      } else {
        $http.get('/qbs/games')
        .then(function(res) {
          instance.qbs = res.data;
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
      if (instance.rbs.length) {
        def.resolve()
      } else {
        $http.get('/rbs/games')
        .then(function(res) {
          instance.rbs = res.data;
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
      if (instance.wrs.length) {
        def.resolve()
      } else {
        $http.get('/wrs/games')
        .then(function(res) {
          instance.wrs = res.data;
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
      if (instance.tes.length) {
        def.resolve();
      } else {
        $http.get('/tes/games')
        .then(function(res) {
          instance.tes = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

  }

}());
