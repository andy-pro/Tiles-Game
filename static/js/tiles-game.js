/*
  Tiles Classic Game
  andy.pro
  https://github.com/andy-pro/Tiles-Game
  angular
  12.06.2016
*/

'use strict';

function TilesGame(opts) {
  function dummy() {};
  var self = this;
  [['level', 2], ['on_show'], ['on_hide'], ['on_mistake'], ['on_remove'], ['on_gameover']]
  .forEach(function(opt) {
    var key = opt[0];
    self[key] = opts[key] || opt[1] || dummy;
  });
}

TilesGame.prototype = {
  icons: [ // visit http://fontawesome.io/icons/
    "bluetooth", "youtube-square", "envira", "bank", "car",
    "binoculars", "camera-retro", "firefox", "futbol-o", "cogs"
  ],
  presets: [
    {pairs: 6, cols: 4}, // beginner, level 1
    {pairs: 8, cols: 4}, // medium, level 2
    {pairs: 10, cols: 5} // expert, level 3
  ],
  pick: function(latter) {
    // 'latter' and 'former' match the current and previous tiles
    var former = this.former,
        _timeout_ = 500; // timeout for deferred actions, e.g. 'close tiles', 'remove tiles'
    if(former === null) { // first click for pair
      this.former = latter;
      latter.shown = true;
      this.on_show(latter);
    } else { // second click for pair
      if(former.id == latter.id) { // need to close the tile, it is the same!
        latter.shown = false;
        this.on_hide(latter);
      } else { // different tiles
        latter.shown = true;
        this.on_show(latter);
        var self = this;
        if(former.icon == latter.icon) { // the contents of the tiles is same, both should disappear
          setTimeout(function() {
            former.removed = latter.removed = true;
            self.on_remove(former, latter);
          }, _timeout_);
          if(!--this.count) {
            this.gameover = true;
            on_gameover();
          }
        } else{ // different contents, both should close
          setTimeout(function() {
            former.shown = latter.shown = false;
            self.on_hide(former, latter);
            self.on_mistake(former, latter);
          }, _timeout_);
        }
      }
      // after second click we must reset previous tile
      this.former = null;
    }
  },

  start: function(level) {
    var level = level || this.level || 2,
        preset = this.presets[+level-1],
        num_pairs = preset.pairs,
        num_tiles = num_pairs * 2,
        num_cols = preset.cols,
        num_rows = ~~(num_tiles / num_cols),
        tiles1x = [];
    for(var i = 0; i < num_tiles; i++) {
      tiles1x.push({
        id: i,
        icon: Math.floor(i % num_pairs),
        shown: false, // set true for God-mode :)
        removed: false
      });
    }
    __shuffle(tiles1x);
    // convert to 2-dimensional
    this.tiles = [];
    var id = 0;
    for(var j = 0; j < num_rows; j++) {
      var row = this.tiles[j] = [];
      for(var k = 0; k < num_cols; k++)
        row.push(tiles1x[id++]);
    }
    this.count = num_pairs;
    this.former = null;
    this.gameover = false;
    // Shuffles an array in-place.
    // Source: http://stackoverflow.com/a/12646864
    function __shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  }
}