const passport = require('./../helpers/passport');

function home(req, res) {
  res.render('index', { title: 'Home' });
}

function list(req, res) {
  res.render('list', { title: 'List' });
}

function auth(req, res) {
  res.render('auth', { title: 'Login' });
}

function processLogin() {
  return passport.authenticate('facebook');
}

function loginReturn() {
  return (
    passport.authenticate('facebook', { failureRedirect: '/auth' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );
}

module.exports = { auth, home, list, processLogin, loginReturn };
