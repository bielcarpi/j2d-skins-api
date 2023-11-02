import passport from 'passport';
import {User} from '../models/user.model'; // Import your user model
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';

//JWT Strategy for handling bearer token
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
