(function() {

  'use strict';

  angular
  .module('SportsStats')
  .controller('PlayersGraphCtrl', PlayersGraphCtrl)

  PlayersGraphCtrl.$inject = ['$http', '$q', '$scope', 'PositionStats', 'PlayerInfo', '$rootScope', 'GraphInfo'];

  function PlayersGraphCtrl($http, $q, $scope, PositionStats, PlayerInfo, $rootScope, GraphInfo) {

    var position = '';
    var players = [];
    var games = [];
    var stat;

    var posMap = {
      'QB': PositionStats.getQbGames,
      'RB': PositionStats.getRbGames,
      'WR': PositionStats.getWrGames,
      'TE': PositionStats.getTeGames,
    }

    // Update graph with new statistics on broadcast
    $rootScope.$on('updateGraph', function() {
      var gameData = []

      // Clear data points
      data.datasets.forEach(function(set) {
        set.data = [];
      })

      // Retrieves set of games according to position (QB, RB, WR, TE)
      var retrieveGames = posMap[GraphInfo.position]

      // Only updates if a category and at least one player has been selected
      if (retrieveGames && GraphInfo.category) {
        retrieveGames()
        .then(function(games) {
          games = PositionStats[GraphInfo.position];

          // Get games of first five selected by players and sort by date
          // Add to object with player's name and push to dataset to be show in graph
          _.each(_.first(GraphInfo.players, 5), function(player) {
            var playerGames = {
              name: player,
              games: _.where(games, { player_name: player })
            }
            playerGames.games = _.sortBy(playerGames.games, function (game) {
              return game.date;
            })
            gameData.push(playerGames);
          })

          for (var i = 0; i < gameData.length; i++) {
            var convertedCat = GraphInfo.config[GraphInfo.category].cat;
            var values = _.pluck(gameData[i].games, convertedCat)
            data.datasets[i].label = gameData[i].name;
            data.datasets[i].data = values;
          }

          // Set scale options according to GraphInfo config for each cat
          options.scaleSteps = GraphInfo.config[GraphInfo.category].scaleSteps
          options.scaleStepWidth = GraphInfo.config[GraphInfo.category].scaleStepWidth

          // Redraw chart
          myLineChart.destroy()
          myLineChart = new Chart(ctx).Line(data, options);

        })
      }
    })



    var ctx = document.getElementById('myChart').getContext('2d');

    var data = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],

      datasets: [
          {
              label: 'My First dataset',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: '#33e8ff',
              pointColor: '#33e8ff',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: []
          },
          {
              label: 'My Second dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: 'rgba(151,187,205,1)',
              pointColor: 'rgba(151,187,205,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: []
          },
          {
              label: 'My third dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: '#20bf19',
              pointColor: '#20bf19',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: []
          },
          {
              label: 'My third dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: '#bf2828',
              pointColor: '#bf2828',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: []
          },
          {
              label: 'My third dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: '#000000',
              pointColor: '#000000',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: []
          }
      ]
    };

    var options = {

        // Manually set scales
        scaleOverride: true,
        scaleSteps: 10,
        scaleStepWidth: 1,
        scaleStartValue: 0,

        // Provides legend on point hover
        multiTooltipTemplate: "<%=datasetLabel%> : <%= value %>",

        // Turns off animation
        animation: false,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : 'rgba(0,0,0,.05)',

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : false,

        //String - A legend template
        legendTemplate : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].strokeColor%>\'></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'

    };

    var myLineChart = new Chart(ctx).Line(data, options);

  }

})()
