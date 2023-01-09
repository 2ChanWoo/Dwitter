import { config } from '../config.js';
import MongoDB from 'mongodb';

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host)
    .then((client) => client.db());
}