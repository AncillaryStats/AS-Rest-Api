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
      getAllGames: getAllGames,
      QB: [],
      RB: [],
      WR: [],
      TE: []
    };

    return instance;

    // Ensures position's games exist
    function getQbGames() {
      var def = $q.defer();
      if (instance.QB.length) {
        def.resolve()
      } else {
        $http.get('/games/qbs')
        .then(function(res) {
          instance.QB = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        });
      }
      return def.promise;
    }

    // Ensures position's games exist
    function getRbGames() {
      var def = $q.defer();
      if (instance.RB.length) {
        def.resolve()
      } else {
        $http.get('/games/rbs')
        .then(function(res) {
          instance.RB = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

    // Ensures position's games exist
    function getWrGames() {
      var def = $q.defer();
      if (instance.WR.length) {
        def.resolve()
      } else {
        $http.get('/games/wrs')
        .then(function(res) {
          instance.WR = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

    // Ensures position's games exist
    function getTeGames() {
      var def = $q.defer();
      if (instance.TE.length) {
        def.resolve();
      } else {
        $http.get('/games/tes')
        .then(function(res) {
          instance.TE = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err);
        })
      }
      return def.promise;
    }

    function getAllGames() {
      return $q.all([
        getQbGames(),
        getRbGames(),
        getWrGames(),
        getTeGames() 
      ])
    }

  }

}());
