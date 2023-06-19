const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() })
        .then((user) => {
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            return done(null, false, {
              msg:
                "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            }
            // does not work for now, may needed to return to fix
            // return done(null, false, { msg: "Invalid email or password." });
            return done("Invalid email or password. Please go back and try again.", false, { msg: "." });
          });
        })
        .catch((err) => {
          return done(err);
        });
    })
  );
  

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user)
    } catch (err) {
      done(err, user)
    }
  });
};