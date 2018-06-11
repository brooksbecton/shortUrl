const { Strategy } = require('passport-facebook');
const passport = require('passport');

passport.use(
  new Strategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `${process.env.BASE_URL}auth/facebook/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return cb(null, profile);
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
