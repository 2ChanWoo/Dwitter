import { config } from '../config.js';
import MongoDB from 'mongodb';

let db;

export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host)
    .then((client) => {
        db = client.db('dwitter');
    });
}

export function getUsers() {
    return db.collection('users');
  }

  export function getTweets() {
      return db.collection('tweets');
  }