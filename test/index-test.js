var vows = require('vows');
var assert = require('assert');
var util = require('util');
var meetup = require('..');


vows.describe('passport-meetup').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(meetup.version);
    },
  },
  
}).export(module);
