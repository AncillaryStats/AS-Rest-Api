(function () {

  'use strict';

  angular.module('SportsStats', [
    'ui.router',
    'n3-line-chart'
    ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/leader-tables');

    $stateProvider
    // .state('home', {
    //   url: '/', 
    //     templateUrl: '',
    //     controller: ''
    // })
    .state('leader-tables', {
      url: '/leader-tables',
        templateUrl: 'static/leader-tables/leader-tables.html',
        controller: 'LeaderTablesCtrl as tables'
    })
  }])

  .run(function($rootScope, $templateCache) {
     $rootScope.$on('$viewContentLoaded', function() {
        $templateCache.removeAll();
     });
  });


})();
