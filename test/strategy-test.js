var vows = require('vows');
var assert = require('assert');
var util = require('util');
var MeetupStrategy = require('../lib/strategy');


vows.describe('MeetupStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new MeetupStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named meetup': function (strategy) {
      assert.equal(strategy.name, 'meetup');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new MeetupStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        var body = '{ \
            "results": [{ \
                "link": "http:\/\/www.meetup.com\/members\/7165628", \
                "id": 7165628, \
                "name": "Jared Hanson" \
            }], \
            "meta": { \
                "lon": "", \
                "count": 1, \
                "link": "https:\/\/api.meetup.com\/2\/members", \
                "next": "", \
                "total_count": 1, \
                "url": "https:\/\/api.meetup.com\/2\/members?order=name&member_id=7165628&offset=0&format=json&page=800", \
                "id": "", \
                "title": "Meetup Members v2", \
                "updated": 1290452372000, \
                "description": "API method for accessing members of Meetup Groups", \
                "method": "Members", \
                "lat": "" \
            } \
        }';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'meetup');
        assert.equal(profile.id, '7165628');
        assert.equal(profile.displayName, 'Jared Hanson');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new MeetupStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        callback(new Error('something went wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },

}).export(module);
