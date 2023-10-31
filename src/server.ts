import express from 'express';
import passport from 'passport';
import './config/passport'; // Import passport configuration
import './config/database'; // Import database configuration
import authRoutes from './routes/auth.routes';
import skinRoutes from './routes/skin.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/skins', passport.authenticate('jwt', { session: false }), skinRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});