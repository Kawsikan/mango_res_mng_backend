const User = require('../models/UserModel');
const { SECRET } = require('../config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

module.exports = (passport) => {

    passport.use(new Strategy(options, async (payload, done) => {
        await User.findById(payload.userId)
            .then(async user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch((error) => {
                return done(null, false);
            });
    })
    );
};