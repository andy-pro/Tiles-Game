'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Angular Games Application', function() {

  describe('TilesGame', function() {

    //beforeEach(function() {
      //browser.get('index.html');
    //});

    browser.get('index.html');

    // find control elements
    var levelSelect = element(by.model('Tiles.level')),
        level_1_option = levelSelect.element(by.css('option[value="1"]')),
        level_2_option = levelSelect.element(by.css('option[value="2"]')),
        level_3_option = levelSelect.element(by.css('option[value="3"]')),
        restart_button = element(by.css('[ng-click="Tiles.start()"]')),
        tiles;

    by.addLocator('sortedTiles', function() {
      var nodes = document.querySelectorAll('div.nest-tile'),
          icons = Array.prototype.slice.call(nodes);
      icons.sort(function(a, b) {
        return a.getAttribute('x-icon') - b.getAttribute('x-icon');
      });
      return icons;
    });

    function setLevel(num) {
      restart_button.click();
      tiles = element.all(by.className('nest-tile'));
      expect(tiles.count()).toBe(num);
    }

    function removeTiles() {
      element.all(by.sortedTiles())
      .each(function(tile) {
        tile.click();
      });
      expect(restart_button.getAttribute('class')).toMatch('gameover');
    }

    it('it must be set to level=2 by default and we are check size of game field', function() {
      var rows = element.all(by.repeater('row in Tiles.tiles'));
      expect(rows.count()).toBe(4);
      var cols = element.all(by.repeater('tile in row')); // 4 row, 4cols each
      expect(cols.count()).toBe(16);
    });

    /* Level 1 */

    it('should be possible to change game level via the drop-down menu', function() {
      level_1_option.click();
      setLevel(12);
    });

    it('should be possible to finish level 1 game', function() {
      removeTiles();
    });

    /* Level 2 */

    it('should be possible to change game level via the drop-down menu', function() {
      level_2_option.click();
      setLevel(16);
    });

    it('should be possible to finish level 2 game', function() {
      removeTiles();
    });

    /* Level 3 */

    it('should be possible to change game level via the drop-down menu', function() {
      level_3_option.click();
      setLevel(20);
    });

    it('should be possible to finish level 3 game', function() {
      removeTiles();
    });

  });

});
