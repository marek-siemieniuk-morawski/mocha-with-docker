import { SUPPORTED_ENVIRONMENTS } from '../../constants';

const assert = require('assert').strict;

describe('Happy path', function() {
  describe('@smoke @regression', function() {
    it('should pass', function() {
      assert.ok(true);
    });
  });

  describe('@regression', function() {
    it('should pass if ENV variable is one of the expected', function() {
      assert.ok(SUPPORTED_ENVIRONMENTS.includes(process.env.ENV));
    });
    
    it('it should fail', function() {
      assert.ok(false);
    });
  });
});
