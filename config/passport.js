const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var User = require('../models/User');

passport.use(new LocalStrategy(
    (email, password, done) => {
        User.findOne({
            where: { email }
        }, (err, user) => {
            if (err) return done(err)
            if (!user) return done(null, false);

            return done(null, user);
        });
    }
));