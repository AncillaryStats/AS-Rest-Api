(function () {

  angular
    .module('SportsStats')
    .factory('PositionStats', PositionStats);

  PositionStats.$inject = ['$http', '$q'];

  function PositionStats($http, $q){

    var instance = {
      // get: get,
      // games: {
      //   qbs: [],
      //   rbs: [],
      //   wrs: [],
      //   tes: []
      // }
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

    // function get() {
    //   var def = $q.defer();
    //   if (instance.qbGames.length) {
    //     def.resolve()
    //   } else {
    //     $http.get('/qbs')
    //     .then(function(res) {
    //       instance.qbGames = res.data;
    //       def.resolve();
    //     }, function(err) {
    //       def.reject(err);
    //     });
    //   }
    //   return def.promise;
    // }

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
