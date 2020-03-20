const User = require('../../models/User');
const passport = require('passport');

exports.login = async (req, res, next) => {
    if (!req.body.email) {
        /** If email is not provided in the request, throw an error */
        return res.status(422).json({
            errors: {
                email: 'is required'
            }
        });
    }

    if (!req.body.password) {
        /** If password is not provided in the request, throw an error */
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            /** There was an error while authenticating the user */
            return res.status(401).json({ error: ''});
        }
        if (user) {
            /** Send jwt response */
            console.log(user.jwt);
            return res.json({ token: user.jwt });
        }
        
        /** A bad request was received */
        return res.json({ status: 400 });
    })(req, res, next);
};

exports.signup = async (req, res, next) => {
    const { email, password, fullName } = req.body;

    if (!email) {
        return res.status(422).json({
            errors: {
                email: 'is required'
            }
        });
    }

    if (!password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }

    if (!fullName) {
        return res.status(422).json({
            errors: {
                name: 'is required'
            }
        });
    }

    const [user, created] = await User.findOrBuild({ where: { email }, raw: true });

    if (!created) {
        /** User already exists */
        return res.json({
            error: `A user with email ${email} already exists`
        });
    }

    /** User instance is created */
    /** Set the properties and save it */
    user.password = password;
    user.fullName = fullName;
    user.provider = 'email'
    const savedUser = await user.save();
    
    delete savedUser.dataValues['password'];
    delete savedUser.dataValues['salt'];

    return res.json(savedUser.dataValues);
};