/*
  Angular Game Platform
  andy.pro
  angular
  12.06.2016
*/

'use strict';

angular.module('AnguGame', ['ngAnimate'])

.component('tilesGame', {
  templateUrl: 'static/views/tiles-game.html',
  bindings: {
    level: '@'
  },
  controller: ['$scope', function($scope) {
    this.game = new TilesGame({
      level: this.level,
      on_mistake: __digest,
      on_remove: __digest
    });
    this.game.start();
    function __digest() {
      $scope.$apply();
    }
  }]
});
