(function () {

  angular
    .module('SportsStats')
    .factory('PlayerInfo', PlayerInfo);

  PlayerInfo.$inject = ['$http', '$q'];

  function PlayerInfo($http, $q){

    var instance = {
      get: get,
      players: []
    };

    return instance;

    // If players do not exist, retrieve
    // Resolve
    function get() {
      var def = $q.defer()
      if (instance.players.length) {
        def.resolve();
      } else {
        $http.get('/players')
        .then(function(res) {
          instance.players = res.data;
          def.resolve();
        }, function(err) {
          def.reject(err)
        })
      }
      return def.promise;
    }


  }

}());
