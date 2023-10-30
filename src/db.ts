import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected!');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});

export default mongoose;