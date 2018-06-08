const passport = require('passport');
const { Strategy } = require('passport-facebook');
const User = require('./../user/user.model');
passport.use(
  new Strategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `${process.env.BASE_URL}/return`
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOneAndUpdate(
        { facebookId: profile.id },
        (err, user) => {
          if (err) {
            return done(err);
          }
          done(null, user);
        },
        {
          upsert: true
        }
      );
    }
  )
);

function home(req, res) {
  res.render('index');
}

function login() {
  return passport.authenticate('facebook');
}

function loginReturn() {
  console.log('here');
  return passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  });
  res.sendStatus(200);
}

module.exports = { home, login, loginReturn, passport };
