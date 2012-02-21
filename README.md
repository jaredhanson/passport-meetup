# Passport-Meetup

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [Meetup](http://www.meetup.com/) using the OAuth 1.0a API.

## Installation

    $ npm install passport-meetup

## Usage

#### Configure Strategy

The Meetup authentication strategy authenticates users using a Meetup account
and OAuth tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumer key, consumer secret, and callback URL.

    passport.use(new MeetupStrategy({
        consumerKey: MEETUP_OAUTH_KEY,
        consumerSecret: MEETUP_OAUTH_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/meetup/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ meetupId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'meetup'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/meetup',
      passport.authenticate('meetup'),
      function(req, res){
        // The request will be redirected to Meetup for authentication, so this
        // function will not be called.
      });
    
    app.get('/auth/meetup/callback', 
      passport.authenticate('meetup', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-meetup/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-meetup.png)](http://travis-ci.org/jaredhanson/passport-meetup)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
