(function () {

  'use strict';

  angular.module('SportsStats', [
    'ui.router',
    'ui.bootstrap',
    'ngTagsInput'
    ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/leader-tables');

    $stateProvider

    .state('leader-tables', {
      url: '/leader-tables',
        templateUrl: 'static/leader-tables/leader-tables.html',
        controller: 'LeaderTablesCtrl as tables'
    })
    .state('players-graph', {
      url: '/players-graph',
        views: {
          '': {
            templateUrl: 'static/players-graph/layout.html',
            controller: '',
          },
          'graph@players-graph': {
            templateUrl: 'static/players-graph/players-graph.html',
            controller: 'PlayersGraphCtrl as graph'
          },
          'select@players-graph': {
            templateUrl: 'static/players-graph/select-players.html',
            controller: 'SelectPlayersCtrl as select'
          }
        }
    })
  }])


})();
