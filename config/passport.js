const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: { email: username }
            });

            /** User not found */
            if (!user) return done(null, false);

            console.log(bcrypt.com)
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch(err) {
            console.error(err);
        }
    }
));