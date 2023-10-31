import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {User} from '../models/user.model'; // Import your user model
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';

//Local Strategy for username password login
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user associated with the username provided by the user
            const user = await User.findOne({username});

            // If the user isn't found in the database, or the password is wrong, failure
            if (!user || !await user.validatePassword(password)) {
                return done(null, false, {message: 'Incorrect username or password.'});
            }

            // If credentials are correct, return the user object
            return done(null, user);
        } catch (err) {
            return done(err, false, {message: 'Something went wrong with your Sign In'});
        }
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (jwtPayload, done) => {
    try {
        // Find the user associated with the username provided by the user
        const user = await User.findById(jwtPayload.sub);

        // If the user isn't found in the database, return null
        if (!user) {
            return done(null, false);
        }

        // If credentials are correct, return the user object
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));
