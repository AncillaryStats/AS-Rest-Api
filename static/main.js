(function () {

  'use strict';

  angular.module('SportsStats', [])

  .controller('NflQbCtrl', ['$http', '$q', function($http, $q) {

    var vm = this;

    vm.model = [];

    getQbGames()

    function getQbGames() {
       $http.get('/qbs')
       .then(function(response) {
          console.log('Success:')
          vm.model = response.data;
          console.dir(vm.model)

       }, function(error) {
          console.log('Error:', error);
       })
    }
  }

  ]);

})();