const assert = require('assert').strict;

describe('Bar', function() {
  describe('@smoke @regression', function() {
    it('should pass', function() {
      assert.ok(true);
    });
  });

  describe('@regression', function() {
    it('should also pass', function() {
      assert.ok(true);
    });
  });
});
