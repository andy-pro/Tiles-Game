'use strict';

describe('tilesGame tests', function() {

  // Load the module that contains the `tilesGame` component before each test
  beforeEach(module('angularGames'));

  // Test the component
  describe('TilesGameController', function() {

    var presets = [
      {pairs: 6, rows: 3, cols: 4}, // beginner, level 1
      {pairs: 8, rows: 4, cols: 4}, // medium, level 2
      {pairs: 10, rows: 4, cols: 5} // expert, level 3
    ];

    it('size of game field check', inject(function($componentController) {

      var ctrl = $componentController('tilesGame');

      function testSize(level) {
        ctrl.start(level);
        var pairs = presets[level-1].pairs,
            rows = presets[level-1].rows,
            cols = presets[level-1].cols,
            num_tiles = pairs*2;
        expect(ctrl.tiles.length).toBe(rows);
        expect(ctrl.tiles[0].length).toBe(cols);
        expect(ctrl.tiles1x.length).toBe(num_tiles);
        expect(ctrl.game.count).toBe(pairs);
      }

      // beginner - level 1 test, 3x4
      testSize(1);

      // medium - level 2 test, 4x4
      testSize(2);

      // expert - level 3 test, 4x5
      testSize(3);

      /* could not perform this test. ??? */
      //expect(ctrl.start(4)).toThrow();
      //expect(ctrl.start(4)).toThrowError("you choosed invalid level!");
      //expect(ctrl.start(4)).toThrowError(TypeError, "you choosed invalid level!");
      //expect(ctrl.start(0)).toThrowError(TypeError, "you choosed invalid level!");
    }));

    it('game should end', inject(function($componentController) {

      var ctrl = $componentController('tilesGame');

      function testGameOver(level) {

        ctrl.start(level);
        expect(ctrl.game.gameover).toBe(false);
        var num_tiles = presets[level-1].pairs*2;
        // a combination of all possible pairs
        ctrl.tiles1x.forEach(function(former, i) {
          for(var j = i + 1; j < num_tiles; j++) {
            var latter = ctrl.tiles1x[j];
            ctrl.game.pick(former);
            ctrl.game.pick(latter);
            //console.log(i,j,'count:', ctrl.game.count, 'hit:', former.id, latter.id, 'icons:', former.icon, latter.icon);
          }
        });
        expect(ctrl.game.gameover).toBe(true);
        console.log('=== level:', level, 'OK ===');
      }

      testGameOver(1);
      testGameOver(2);
      testGameOver(3);

    }));

  });

});
