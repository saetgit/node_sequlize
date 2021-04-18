const JwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const db = require("../models/index");
const bcrypt = require("bcryptjs");

module.exports = passport => {
    // To authenticate the User by JWT Strategy
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.SECRET;

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                let user = await db.User.findOne({
                  where: {
                    id: jwt_payload.data.id
                  }
                });

                // Find the user specified in token
                if (user) {
                  return done(null, user);
                }
                // User dosn't exist
                return done(null, false);
            } catch (error) {
                done(error, false);
            }
        })
    );

    // To authenticate the User by local Strategy
    let optsLocal = {};
    optsLocal.usernameField = "email";

    passport.use(
        new localStrategy(optsLocal, async (email, password, done) => {
            try {
                const islogged = true
                const user = await db.User.findOne({ where: { email } });

                if (!user) {
                    if (!user) {
                        return done(`Email don't exist in our database!`, false);
                    }
                }

                // User not fount
                if (!bcrypt.compareSync(password, user.password)) {
                    if (!user) {
                        return done('user not found', false);
                    }
                }

                // User found and set login status to user
                const user_id = user.id;
                await db.User.update({
                    islogged
                }, {
                    where: {
                        id: user_id
                    }
                });
                user.password = undefined

                // Otherwise, return the user
                done(null, user);

            } catch (error) {
                done(error, false);
            }
        })
    );

};
