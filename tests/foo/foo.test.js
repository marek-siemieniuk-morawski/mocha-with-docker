const assert = require('assert').strict;

describe('Foo', function() {
  describe('@smoke @regression', function() {
    it('should pass', function() {
      assert.ok(true);
    });
  });

  describe('@regression', function() {
    it('should fail', function() {
      assert.ok(false);
    });
  });
});
