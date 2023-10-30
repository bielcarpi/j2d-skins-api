import express from 'express';
import bodyParser from 'body-parser';
import skinsRoutes from "./routes/skinsRoutes";
import './db';  // Import the database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the skins routes
app.use('/skins', skinsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
