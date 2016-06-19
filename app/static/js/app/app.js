/*
  Angular Game Platform
  andy.pro
  angular
  20.06.2016
*/

'use strict';

angular.module('angularGames', ['ngAnimate'])

.component('tilesGame', {

  templateUrl: 'static/views/tiles-game.html',

  bindings: {
    level: '@'
  },

  controllerAs: 'Tiles',

  controller: ['$timeout', function TilesGameController($timeout) {

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
      on_gameover: function(time) {
        self.button.status = 'gameover';
        self.button.caption = 'Congratulations!';
        self.game.time = 'Your time: ' + time + ' s';
      }
    });

    function actions(prop, value, tiles, timeout) {
      $timeout(function() {
        for(var i = 0; i < tiles.length; i++) {
          tiles[i][prop] = value;
        }
      }, timeout || 0);
    }

    this.doAddition = function() {

      console.log('test button pressed!');

    }


    this.start = function() {
      var level = +this.level;
      if (level < 1 || level > presets.length) {
        throw "you choosed invalid level!";
        //throw new TypeError("you choosed invalid level!");
      }
      var preset = presets[level-1],
          num_pairs = preset.pairs,
          num_tiles = num_pairs * 2,
          num_cols = preset.cols,
          num_rows = ~~(num_tiles / num_cols);
      this.tiles1x = this.game.start(num_pairs);
      // convert to 2-dimensional
      this.tiles = [];
      var id = 0;
      for(var i = 0; i < num_rows; i++) {
        var row = this.tiles[i] = [];
        for(var j = 0; j < num_cols; j++)
          row.push(this.tiles1x[id++]);
      }
      // game main button setup
      this.button = {
        status: '',
        caption: 'Restart'
      }
      this.game.time = '';
    }

    var presets = [
      {pairs: 6, cols: 4}, // beginner, level 1
      {pairs: 8, cols: 4}, // medium, level 2
      {pairs: 10, cols: 5} // expert, level 3
    ];

    var _timeout_ = 500,
        self = this;

    this.level = this.level || "2";

    this.start();

  }]

});
