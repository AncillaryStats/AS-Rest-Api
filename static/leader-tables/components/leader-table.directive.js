
angular
  .module('SportsStats')
  .directive('leaderTable', leaderTable);

  function leaderTable() {
    return {
      restrict: 'EA',
      templateUrl: 'static/leader-tables/components/leader-table.template.html',
      scope: {
        categoryInfo: '=info'
      }
    }

  }
