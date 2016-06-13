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

  controllerAs: 'Tiles',

  controller: ['$timeout', function($timeout) {

    this.icons = [
      // visit 'http://fontawesome.io/icons' for details
      "bluetooth", "youtube-square", "envira", "bank", "car",
      "binoculars", "camera-retro", "firefox", "futbol-o", "cogs"
    ];

    this.game = new TilesGame({
      on_show: function() { actions('show', true, arguments); },
      on_hide: function() { actions('show', false, arguments); },
      on_miss: function() { actions('show', false, arguments, _timeout_); },
      on_hit: function()  { actions('remove', true, arguments, _timeout_); },
      on_gameover: function() {
        self.button.color = 'orange';
        self.button.caption = 'Congratulations!';
      }
    });

    function actions(prop, action, tiles, timeout) {
      $timeout(function() {
        for(var i = 0; i < tiles.length; i++) {
          tiles[i][prop] = action;
        }
      }, timeout || 0);
    }

    this.start = function(level) {
      var level = level || this.level || 2,
          preset = presets[+level-1],
          num_pairs = preset.pairs,
          num_tiles = num_pairs * 2,
          num_cols = preset.cols,
          num_rows = ~~(num_tiles / num_cols);
      var tiles = this.game.start(num_pairs);
      // convert to 2-dimensional
      this.tiles = [];
      var id = 0;
      for(var i = 0; i < num_rows; i++) {
        var row = this.tiles[i] = [];
        for(var j = 0; j < num_cols; j++)
          row.push(tiles[id++]);
      }
      // game main button setup
      this.button = {
        color: 'aquamarin',
        caption: 'Restart'
      }
    }

    var presets = [
      {pairs: 6, cols: 4}, // beginner, level 1
      {pairs: 8, cols: 4}, // medium, level 2
      {pairs: 10, cols: 5} // expert, level 3
    ];

    var _timeout_ = 500,
        self = this;

    this.start(this.level);

  }]

});
