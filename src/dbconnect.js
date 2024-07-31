import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {credentials} from './credentials.js';

dotenv.config();

const connectionString = (process.env.NODE_ENV === 'production') 
    ? credentials.mongo.production.connectionString 
    : credentials.mongo.development.connectionString;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', err => {
    console.error('MongoDB error: ' + err.message);
    process.exit(1);
});
db.once('open', () => console.log('MongoDB connection established at ' + connectionString));
