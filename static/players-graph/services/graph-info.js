(function () {

  angular
    .module('SportsStats')
    .factory('GraphInfo', GraphInfo);

  GraphInfo.$inject = ['$http', '$q'];

  function GraphInfo($http, $q){

    var instance = {
      // get: get,
      players: [],
      category: '',
      position: '',
      games: [],
      statMap: '',
      config: {
        'Pass Attempts': {
          cat: 'pass_attempts',
          scaleSteps: 10,
          scaleStepWidth: 10,
        },
        'Pass Completions': {
          cat: 'pass_completions',
          scaleSteps: 10,
          scaleStepWidth: 10,
        },
        'Pass Yards': {
          cat: 'pass_yards',
          scaleSteps: 12,
          scaleStepWidth: 50
        },
        'Completion %': {
          cat: 'comp_percentage',
          scaleSteps: 10,
          scaleStepWidth: 10
        },
        'Average Yards/Pass': {
          cat: 'avg_yards_per_pass',
          scaleSteps: 10,
          scaleStepWidth: 3
        },
        'Pass TDs': {
          cat: 'pass_tds',
          scaleSteps: 10,
          scaleStepWidth: 1
        },
        'Interceptions': {
          cat: 'interceptions',
          scaleSteps: 10,
          scaleStepWidth: 1
        },
        'QBR': {
          cat: 'qb_rating',
          scaleSteps: 10,
          scaleStepWidth: 10
        },
        'Passer Rating': {
          cat: 'passer_rating',
          scaleSteps: 10,
          scaleStepWidth: 20
        },
        'Rush Attempts': {
          cat: 'rush_attempts',
          scaleSteps: 10,
          scaleStepWidth: 5
        },
        'Rush Yards': {
          cat: 'rush_yards',
          scaleSteps: 10,
          scaleStepWidth: 25
        },
        'Average Yards/Rush': {
          cat: 'avg_yards_per_rush',
          scaleSteps: 10,
          scaleStepWidth: 5
        },
        'Rush TDs': {
          cat: 'rush_tds',
          scaleSteps: 10,
          scaleStepWidth: 1
        }
      }
    };

    instance.config

    instance.statMap = {
      'Pass Attempts': 'pass_attempts',
      'Pass Completions': 'pass_completions',
      'Pass Yards': 'pass_yards',
      'Completion %': 'com_percentage',
      'Average Yards/Pass': 'avg_yards_per_pass',
      'Pass TDs': 'pass_tds',
      'Interceptions': 'interceptions',
      'QBR': 'qb_rating',
      'Passer Rating': 'passer_rating',
      'Rush Attempts': 'rush_attempts',
      'Rush Yards': 'rush_yards',
      'Average Yards/Rush': 'avg_yards_per_rush',
      'Rush TDs': 'rush_tds'
    }

    return instance;



    // If players do not exist, retrieve
    // Resolve
    // function get() {
    //   var def = $q.defer()
    //   if (instance.games.length) {
    //     def.resolve();
    //   } else {
    //     $http.get('/players')
    //     .then(function(res) {
    //       instance.players = res.data;
    //       def.resolve();
    //     }, function(err) {
    //       def.reject(err)
    //     })
    //   }
    //   return def.promise;
    // }


  }

}());
