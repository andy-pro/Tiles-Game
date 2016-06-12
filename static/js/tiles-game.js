/*
  Tiles Classic Game
  andy.pro
  angular
  12.06.2016
*/

'use strict';

function TilesGame(opts) {
  /*  */
  this.level = opts.level || 1;
  this.on_show = opts.on_show || function() {};
  this.on_hide = opts.on_hide || function() {};
  this.on_mistake = opts.on_mistake || function() {};
  this.on_remove = opts.on_remove || function() {};
  this.on_gameover = opts.on_gameover || function() {};
  /*  */
}

TilesGame.prototype = {
  icons: [
    "bluetooth", "youtube-square", "envira", "bank", "car",
    "binoculars", "camera-retro", "firefox", "futbol-o", "cogs"
  ],
  presets: [
    {pairs: 6, cols: 4}, // beginner
    {pairs: 8, cols: 4}, // medium
    {pairs: 10, cols: 5} // expert
  ],
  pick: function(latter) {
    var former = this.former,
        _timeout_ = 800;
    if(former === null) {
      // first click for pair
      this.former = latter;
      latter.shown = true;
      this.on_show(latter);
    } else {
       // second click for pair
      if(former.id == latter.id) {
        // need to close the tile, it is the same!
        latter.shown = false;
        this.on_hide(latter);
      } else {
        latter.shown = true;
        this.on_show(latter);
        var self = this;
        // different tiles
        if(former.icon == latter.icon) {
          // the contents of the tiles is same, both should disappear
          setTimeout(function() {
            former.removed = latter.removed = true;
            self.on_remove(former, latter);
          }, _timeout_);
          this.count--;
          if(!this.count) this.gameover = true;
        } else{
          // different contents, both should close
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

  start: function() {
    var num_pairs = this.presets[this.level].pairs,
        num_tiles = num_pairs * 2,
        num_cols = this.presets[this.level].cols,
        num_rows = ~~(num_tiles / num_cols);
    this.count = num_pairs;
    this.former = null;
    this.gameover = false;
    var tiles1x = [];
    for(var i = 0; i < num_tiles; i++) {
      tiles1x.push({
        id: i,
        icon: Math.floor(i % num_pairs),
        shown: false,
        removed: false
      });
    }
    //__shuffle(tiles1x);
    // convert to 2-dimensional
    this.tiles = [];
    var id = 0;
    for(var j = 0; j < num_rows; j++) {
      var row = [];
      for(var k = 0; k < num_cols; k++) {
        row.push(tiles1x[id]);
        id++;
      }
      this.tiles.push(row);
    }
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