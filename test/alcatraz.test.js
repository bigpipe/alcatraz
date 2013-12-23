/*globals suite, test*/
'use strict';

var assert = require('assert')
  , Images = require('../');

//
// Only required to run these tests in the browser.
//
try { window.mocha.checkLeaks = false; }
catch (e) {}

describe('Image', function () {
  var source = 'var foo = "bar";';

  it('returns the tranformed string using toString', function () {
    var image = new Images('dingdong', source);

    assert.ok(image instanceof Images);
    assert.ok(!!~image.toString().indexOf(source));

    // Test again to see if it's cached internally correctly
    assert.ok(!!~image.toString().indexOf(source));
  });

  it('stores the source', function () {
    var image = new Images('dingdong', source);
    assert.equal(image.source, source);
  });
});
