'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Angular Games Application', function() {

  describe('TilesGame', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should filter the phone list as a user types into the search box', function() {

      //var tileList = element.all(by.css('.nest-tile'));
      var tileList = element.all(by.repeater('row in Tiles.tiles'));
      //console.log(tileList.count());
      expect(tileList.count()).toBe(4);
      expect(3).toEqual(3);

    });

  });

});
