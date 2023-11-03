import express from 'express';
import passport from 'passport';
import './config/passport'; // Import passport configuration
import './config/database'; // Import database configuration
import authRoutes from './routes/auth.routes';
import skinRoutes from './routes/skin.routes';
import dotenv from 'dotenv';
import {getSkinsFromFile} from "./utils/skin_utils";
import {SkinModel} from "./models/skin.model";

dotenv.config();
const app = express();

// Read skins from db.json, and insert them into the database
getSkinsFromFile().then(skins => {
    SkinModel.insertMany(skins).then(r => console.log('Skins inserted into database.'));
});

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use(authRoutes);
app.use(passport.authenticate('jwt', {session: false}), skinRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});