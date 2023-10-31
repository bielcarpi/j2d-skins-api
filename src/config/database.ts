import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined. Set MONGODB_URI in your environment variables.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB. Exiting application.', error);
        process.exit(1);
    });

mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected! Exiting application.');
    process.exit(1);

});

export default mongoose;