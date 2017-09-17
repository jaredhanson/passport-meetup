# Passport-Meetup

[Passport](http://passportjs.org/) strategy for authenticating with [Meetup](http://www.meetup.com/)
using the OAuth 1.0a API.

This module lets you authenticate using Meetup in your Node.js applications.
By plugging into Passport, Meetup authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

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
      passport.authenticate('meetup'));
    
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

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-meetup'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-meetup.svg' /></a>
